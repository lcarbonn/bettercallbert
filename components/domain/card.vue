<template>
    <nuxt-link :to="'/cards/'+card.id">
        <b-card 
            :img-src="card.img"
            :img-alt="card.title"
            class="h-100"
            bg-variant="secondary"
            text-variant="white"
            header-bg-variant="primary"
            overlay
        >
            <template #header>
                <small>{{card.title}}</small>
            </template>
        </b-card>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        card: {
            type: Object,
            default: null
        },
    }
}
</script>
