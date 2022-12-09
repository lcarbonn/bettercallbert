<template>
    <div>
        <md-dialog :md-active.sync="showDialog">
            <img v-if="img"
                 :title="title"
                 :alt="title"
                 :src="img">
        </md-dialog>
    </div>
</template>

<script>
export default {
    name: 'CardDialog',
    props: {
        title: {
            type: String,
            default: null
        },
        img: {
            type: String,
            default: null
        },
        showDialogIn: {
            type: Boolean,
            default: false

        }
    },
    computed: {
        showDialog: {
            // getter
            get() {
                return this.showDialogIn
            },
            // setter
            set(newValue) {
                this.closeDialog()
            }
        }
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialog')
        }
    }
}

</script>

<style scoped>
img {
    height: 80vh;
    max-width: 100vw;
}
</style>
