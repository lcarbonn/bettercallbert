<template>
    <form novalidate
          class="md-layout md-alignment-top-center"
          @submit.stop.prevent>
        <md-card class="md-layout-item md-size-30 md-small-size-100">
            <md-card-header>
                <div>C'est parti pour réinitialiser mon mot de passe !</div>
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
                                   @click="sendPasswordResetEmail()">Envoyer un mail</md-button>

                    </div>
                </div>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <n-link class="n-link"
                                to="/login">Je me souviens de mon mot de passe ! :D</n-link>
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
        title: 'Mot de passe oublié'
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
                this.error = "L'email est obligatoire";
                this.showSnackbar = true;
            } else {
                auth.sendPasswordResetEmail(this.email)
                    .then(() => {
                        this.error = "Email envoyé !"
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
