<template>
    <div slot="form">

        <form>
            <p>C'est parti pour réinitialiser mon mot de passe !</p>

            <p v-if="error"
               class="message error">{{ error }}</p>

            <input v-model="email"
                   @keyup.enter="sendPasswordResetEmail()"
                   type="text"
                   placeholder="Email" />

            <button @click="sendPasswordResetEmail()"
                    class="button primary">Envoyer un mail</button>

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
.message__password {
    margin-bottom: 3rem !important;
}
</style>
