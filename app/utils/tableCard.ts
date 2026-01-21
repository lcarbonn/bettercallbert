/**
 * ICard interface
 * @public
 */
export interface ICard {
    id?:number,
    title: string,
    theme: string,
    link?: string,
    src?: string,
    color?:string,
    image?:string,
    imageName?:string,
    toRaw() :any
}

/**
 * Card class
 * @public
 */
export class Card implements ICard {
    id?:number
    title: string
    theme: string
    src?: string
    link?: string
    color?:string
    image?:string
    imageName?:string

    /**
     * Card constructor
     * @param raw data
     */
    constructor(raw?:any) {
        this.title = "New Card"
        this.theme = "No Theme"
        if(!raw) return
        this.id = raw.id
        this.title = raw["Title"]
        this.src = raw["Src"]
        this.link = raw["Link"]
        const theme = raw["Theme"][0]
        this.theme= theme?theme.value:undefined
        const color = raw["Color"][0]
        this.color = color?color.value:"primary"
        const image = raw["Image"][0]
        // console.log("image:", image)
        this.image = image?image.url:undefined
        this.imageName = image?image.visible_name:undefined
    }
    toRaw() :any {
      const raw =
        {
        id:this.id,
        ["Title"]: this.title,
        ["Src"]: this.src,
        ["Link"]: this.link,
        ["Theme"]: [this.theme],
        }
      return raw
    }


}
