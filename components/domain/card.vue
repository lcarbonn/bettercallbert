<template>
    <b-card :img-src="card.img"
            :img-alt="card.title"
            class="h-100"
            bg-variant="secondary"
            text-variant="white"
            :header-bg-variant="theme"
            overlay>
        <template #header>
            <small>{{ card.title }}</small>
        </template>
    </b-card>
</template>

<script>
export default {
    name: "DomainCardComp",

    props: {
        card: {
            type: Object,
            default: null
        },
        theme: {
            type: String,
            default: "primary"
        },
    }
}
</script>
