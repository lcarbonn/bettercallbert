<template>
    <div id="login">

        <form @submit.stop.prevent
              id="form">
            <p>C'est parti pour me connecter !</p>

            <p v-if="error"
               class="message error">{{ error }}</p>

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

            <p class="n-link">
                <n-link to="/login/reset-password">J'ai oublié mon mot de passe :'(</n-link>
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
#login {
    display: flex;
    justify-content: space-around;
}
#form {
    width: 30vw;
    max-width: calc(100vw - 130px);
}
</style>