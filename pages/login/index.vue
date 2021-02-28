<template>
    <form novalidate
          class="md-layout md-alignment-top-center"
          @submit.stop.prevent>
        <md-card class="md-layout-item md-size-30 md-small-size-100">
            <md-card-header>
                <div>C'est parti pour me connecter !</div>
            </md-card-header>

            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field md-clearable>
                            <label>Email</label>
                            <md-input v-model="email"
                                      @keyup.enter="emailLogin()"></md-input>
                        </md-field>
                        <md-field>
                            <label>Password</label>
                            <md-input v-model="password"
                                      @keyup.enter="emailLogin()"
                                      type="password"></md-input>
                        </md-field>
                        <md-button class="md-raised md-primary"
                                   @click="emailLogin()">Connexion</md-button>

                    </div>
                </div>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <n-link class="n-link"
                                to="/login/reset-password">J'ai oublié mon mot de passe :'(</n-link>
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

export default {
    mixins: [notAuthenticated],

    head: {
        title: 'Connexion'
    },
    data() {
        return {
            email: '',
            password: '',
            error: '',
            showSnackbar: false
        };
    },
    methods: {
        emailLogin() {
            if (!this.email) {
                this.error = "L'email est obligatoire";
                this.showSnackbar = true;
            } else if (!this.password) {
                this.error = 'Le mot de passe est obligatoire';
                this.showSnackbar = true;
            } else {
                this.error = '';
                this.$store
                    .dispatch('auth/signInWithEmailAndPassword', {
                        email: this.email,
                        password: this.password
                    })
                    .then(res => {
                        this.$router.push(getNextPath());
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
