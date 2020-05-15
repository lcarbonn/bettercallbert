<template>
    <div>
        <div class="md-toolbar-section-start">
            <md-button class="md-icon-button"
                       @click="setVisible">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">
                <n-link to="/"
                        class="md-title n-link">Better Call Bert</n-link>
            </span>
            <!-- <span v-if="isAll"
                  class="md-toolbar-section-end md-primary">
                Agile Cards for coach memory failure</span> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "Titlebar",

    props: {
        isAll: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        setVisible() {
            this.$emit('setVisible')
        }
    }
}
</script>
