export const getThemeColor = (themeId, themes) => {
    if (!themeId) return null
    let color = ""
    themes.forEach(theme => {
        if (theme.id == themeId) {
            color = theme.color
        }
    });
    return color
}
