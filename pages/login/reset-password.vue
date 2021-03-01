<template>
    <form novalidate
          class="md-layout md-alignment-top-center"
          @submit.prevent="validateLogin">
        <md-card class="md-layout-item md-size-30 md-small-size-100">
            <md-card-header>
                <div>Let's go for password reset !</div>
            </md-card-header>

            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field md-clearable
                                  :class="getValidationClass('email')">
                            <label for="email">Email</label>
                            <md-input name="email"
                                      id="email"
                                      v-model="form.email"></md-input>
                            <span class="md-error"
                                  v-if="!$v.form.email.required">The email is required</span>
                            <span class="md-error"
                                  v-else-if="!$v.form.email.email">Invalid email</span>
                        </md-field>

                        <md-button class="md-raised md-primary"
                                   type="submit">Send me an email</md-button>

                    </div>
                </div>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <n-link class="n-link"
                                to="/login">I remember my password ! :D</n-link>
                    </div>
                </div>
            </md-card-content>
        </md-card>
        <md-snackbar :md-active.sync="showSnackbar">
            <span>{{ error }}</span>
        </md-snackbar>

    </form>
</template>

<script>
import { auth } from '~/plugins/firebase.js';
import notAuthenticated from '~/mixins/notAuthenticated.js';

import { validationMixin } from 'vuelidate'
import {
    required,
    email
} from 'vuelidate/lib/validators'

export default {
    name: "Reset-Password",
    mixins: [notAuthenticated, validationMixin],
    data: () => ({
        form: {
            email: null
        },
        error: '',
        showSnackbar: false
    }),
    validations: {
        form: {
            email: {
                required,
                email
            }
        }
    },
    methods: {
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        clearForm() {
            this.$v.$reset()
            this.form.email = null
        },
        sendPasswordResetEmail() {
            auth.sendPasswordResetEmail(this.form.email)
                .then(() => {
                    this.error = "Email sent !"
                    this.showSnackbar = true;
                })
                .catch(e => {
                    this.error = e.message;
                    this.showSnackbar = true;
                });
        },
        validateLogin() {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.sendPasswordResetEmail()
            }
        }

    }
};
</script>
