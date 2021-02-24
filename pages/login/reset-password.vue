<template>
    <!-- <form-layout> -->
    <div slot="form">

        <div>
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

            <!-- <p>Vous n'avez pas de compte ? Vous pouvez <nuxt-link to="/signup">en créer un</nuxt-link>.</p> -->
        </div>

        <snackbar label="Email envoyé !"
                  ref="resetPasswordSnackbar"></snackbar>
    </div>
    <!-- </form-layout> -->
</template>

<script>
// import FormLayout from '~/components/layout/FormLayout';
import Snackbar from '~/components/base/Snackbar';
import { auth } from '~/plugins/firebase.js';
import notAuthenticated from '~/mixins/notAuthenticated.js';

export default {
    mixins: [notAuthenticated],
    components: {
        // FormLayout,
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
