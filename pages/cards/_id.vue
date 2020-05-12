<template>
    <section class="wrapper bg-dark">
        <AppHeader />
        <div>
            <nuxt-link :to="'/'"
                       class="menu-item">Home</nuxt-link>
        </div>
        <div>
            <CardDetail :card="card"
                        :nextId="nextId"
                        :previousId="previousId"
                        :src="src"
                        :color="color" />
        </div>
        <AppFooter />
    </section>
</template>

<script>
import AppHeader from '~/components/base/AppHeader';
import AppFooter from '~/components/base/AppFooter';
import Menu from '~/components/menu/menu';
import CardDetail from '~/components/domain/card-detail';

export default {
    components: {
        AppFooter,
        AppHeader,
        Menu,
        CardDetail,
    },

    mounted() {
        this.$store.dispatch("cards/getCard", this.id)
    },

    computed: {
        id() {
            return this.$route.params.id
        },
        card() {
            return this.$store.getters['cards/card']
        },
        nextId() {
            return this.$store.getters['cards/nextId']
        },
        previousId() {
            return this.$store.getters['cards/previousId']
        },
        color() {
            return this.$store.getters['cards/color']
        },
        src() {
            return this.$store.getters['cards/src']
        }
    }

}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    font-weight: bold;
    text-align: center;
    min-height: 100vh;
}

.wrapper > * {
    padding: 5px;
}

.menu-item {
    text-decoration: none !important;
    color: grey;
    border-top: 1px #e94f2b solid;
}

.menu-item:hover {
    color: white;
}
</style>
