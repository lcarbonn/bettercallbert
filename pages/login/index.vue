<template>
    <div slot="form">

        <form>
            <p>C'est parti pour me connecter !</p>

            <p v-if="error"
               class="message error">{{ error }}</p>

            <input v-model="email"
                   @keyup.enter="emailLogin()"
                   type="text"
                   placeholder="Email" />

            <input v-model="password"
                   @keyup.enter="emailLogin()"
                   type="password"
                   placeholder="Mot de passe" />

            <button @click="emailLogin()"
                    class="button primary">Connexion</button>

            <p class="message__password">
                <nuxt-link to="/login/reset-password">J'ai oublié mon mot de passe :'(</nuxt-link>
            </p>

        </form>
    </div>
</template>

<script>

import notAuthenticated from '~/mixins/notAuthenticated.js';

export default {
    mixins: [notAuthenticated],
    head: {
        title: 'Connexion'
    },
    data() {
        return {
            email: '',
            password: '',
            error: ''
        };
    },
    methods: {
        emailLogin() {
            if (!this.email) {
                this.error = "L'email est obligatoire";
            } else if (!this.password) {
                this.error = 'Le mot de passe est obligatoire';
            } else {
                this.error = '';
                this.$store
                    .dispatch('auth/signInWithEmailAndPassword', {
                        email: this.email,
                        password: this.password
                    })
                    .then(res => {
                        this.$router.push('/');
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
