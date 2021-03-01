<template>
    <form novalidate
          class="md-layout md-alignment-top-center"
          @submit.stop.prevent>
        <md-card class="md-layout-item md-size-30 md-small-size-100">
            <md-card-header>
                <div>Let's go for password reset !</div>
            </md-card-header>

            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field md-clearable>
                            <label>Email</label>
                            <md-input v-model="email"
                                      @keyup.enter="sendPasswordResetEmail()"></md-input>
                        </md-field>

                        <md-button class="md-raised md-primary"
                                   @click="sendPasswordResetEmail()">Send me an email</md-button>

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

export default {
    mixins: [notAuthenticated],
    head: {
        title: 'Forgoten password'
    },
    data() {
        return {
            email: '',
            error: '',
            showSnackbar: false
        };
    },
    methods: {
        sendPasswordResetEmail() {
            if (!this.email) {
                this.error = "This email is required";
                this.showSnackbar = true;
            } else {
                auth.sendPasswordResetEmail(this.email)
                    .then(() => {
                        this.error = "Email sent !"
                        this.showSnackbar = true;
                    })
                    .catch(e => {
                        this.error = e.message;
                        this.showSnackbar = true;
                    });
            }
        }
    }
};
</script>
