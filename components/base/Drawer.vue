<template>
    <div>
        <md-toolbar class="md-transparent"
                    md-elevation="0">Navigation</md-toolbar>
        <md-list>
            <md-list-item @click="setMenuVisible()">
                <md-icon>home</md-icon>
                <n-link to="/"
                        class="md-list-item-text n-link">Home</n-link>
            </md-list-item>

            <md-list-item @click="setMenuVisible()">
                <md-icon>settings</md-icon>
                <span class="md-list-item-text">Settings</span>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
export default {
    name: "Drawer",

    methods: {
        setMenuVisible() {
            this.$emit('setMenuVisible')
        }
    },
}
</script>

