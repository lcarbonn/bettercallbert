export default ({ app }) => {
    app.store.dispatch("themes/getThemes")
}
