<template>
    <div id="login">

        <form @submit.stop.prevent
              id="form">
            <p>C'est parti pour réinitialiser mon mot de passe !</p>

            <p v-if="error"
               class="message error">{{ error }}</p>

            <md-field md-clearable>
                <label>Email</label>
                <md-input v-model="email"
                          @keyup.enter="sendPasswordResetEmail()"></md-input>
            </md-field>

            <md-button class="md-raised md-primary"
                       @click="sendPasswordResetEmail()">Envoyer un mail</md-button>

            <p class="message__password">
                <nuxt-link to="/login">Je me souviens de mon mot de passe ! :D</nuxt-link>
            </p>

        </form>

        <snackbar label="Email envoyé !"
                  ref="resetPasswordSnackbar"></snackbar>
    </div>
</template>

<script>
import Snackbar from '~/components/base/Snackbar';
import { auth } from '~/plugins/firebase.js';
import notAuthenticated from '~/mixins/notAuthenticated.js';

export default {
    mixins: [notAuthenticated],
    components: {
        Snackbar
    },
    head: {
        title: 'Mot de passe oublié'
    },
    data() {
        return {
            email: '',
            error: ''
        };
    },
    methods: {
        sendPasswordResetEmail() {
            if (!this.email) {
                this.error = "L'email est obligatoire";
            } else {
                this.error = '';
                auth.sendPasswordResetEmail(this.email)
                    .then(() => {
                        this.$refs.resetPasswordSnackbar.show();
                    })
                    .catch(e => {
                        this.error = e.message;
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
#login {
    display: flex;
    justify-content: space-around;
}
#form {
    width: 30vw;
    max-width: calc(100vw - 130px);
}
</style>