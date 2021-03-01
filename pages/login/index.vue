<template>
    <form novalidate
          class="md-layout md-alignment-top-center"
          @submit.prevent="validateLogin">
        <md-card class="md-layout-item md-size-30 md-small-size-100">
            <md-card-header>
                <div>Let's go !</div>
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
                        <md-field :class="getValidationClass('password')">
                            <label for="password">Password</label>
                            <md-input name="password"
                                      id="
                                      password"
                                      v-model="form.password"
                                      type="password"></md-input>
                            <span class="md-error"
                                  v-if="!$v.form.password.required">The password is required</span>
                        </md-field>
                        <md-button class="md-raised md-primary"
                                   type="submit">Connexion</md-button>

                    </div>
                </div>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <n-link class="n-link"
                                to="/login/reset-password">I think I've forgot my password :'(</n-link>
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

import notAuthenticated from '~/mixins/notAuthenticated.js';
import { getNextPath } from '~/mixins/authenticated.js';

import { validationMixin } from 'vuelidate'
import {
    required,
    email
} from 'vuelidate/lib/validators'

export default {
    name: "Login",
    mixins: [notAuthenticated, validationMixin],
    data: () => ({
        form: {
            email: null,
            password: null,
        },
        error: '',
        showSnackbar: false
    }),
    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
                required
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
            this.form.password = null
        },
        emailLogin() {

            this.$store
                .dispatch('auth/signInWithEmailAndPassword', {
                    email: this.form.email,
                    password: this.form.password
                })
                .then(res => {
                    this.$router.push(getNextPath());
                })
                .catch(e => {
                    this.error = e.message;
                    this.showSnackbar = true;
                });

        },
        validateLogin() {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.emailLogin()
            }
        }
    }
};
</script>
