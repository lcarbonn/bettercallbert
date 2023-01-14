<template>
    <b-modal id="modal-card"
             :title="title"
             centered
             body-bg-variant="secondary"
             header-text-variant="white"
             :header-bg-variant="theme"
             size="xl"
             ok-only>
        <p class="text-center">
            <img v-if="img"
                 :title="title"
                 :alt="title"
                 :src="img">
        </p>
    </b-modal>
</template>

<script>
export default {
    name: "CardDialog",
    props: {
        title: {
            type: String,
            default: null
        },
        img: {
            type: String,
            default: null
        },
        theme: {
            type: String,
            default: null
        }
    },
}

</script>

<style scoped>
img {
    height: 72vh;
    max-width: 100%;
}
</style>
