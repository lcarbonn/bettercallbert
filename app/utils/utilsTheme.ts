import type { SelectItem } from "@nuxt/ui";

/**
 * cause UPageCard doesn't manage dynamic class bg color ????
 * @param color 
 * @returns 
 */
export const getBgColor = (color:string|undefined) => {
    switch (color) {
      case "themeone":
        return "bg-themeone"
        break;
      case "themetwo":
        return "bg-themetwo"
        break;
      case "themethree":
        return "bg-themethree"
        break;
      case "themefour":
        return "bg-themefour"
        break;
      case "themefive":
        return "bg-themefive"
        break;
      case "themesix":
        return "bg-themesix"
        break;
    
      default:
        return "bg-primary"
        break;
    }
  }

  /**
 * Build options for input select based on themes list
 * @return options as SelectItem[]
 */
export const getThemeOptions = (themes:ITheme[]) :SelectItem[] => {
    const opts:SelectItem[] = []
    themes.forEach(theme => {
        opts.push(
          {value: theme.title, label: theme.title }
        )
    });
  return opts
}
