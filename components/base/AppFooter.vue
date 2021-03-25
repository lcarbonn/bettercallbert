<template>
    <div>
        <div v-if="isAll"
             class="md-layout md-alignment-bottom-center md-body-1">
            <p>You’ll wont find detail but brain access facilities</p>
            <p>Having cards doesn’t make you a coach.</p>
            <p>Take care of people you help!</p>
            <p>Warning : At this time it uses © materials</p>
        </div>
        <span>Copyright © 2021 - Agilized in Toulouse, France</span>
    </div>
</template>

<script>

export default {
    props: {
        isAll: false
    }
}

</script>
