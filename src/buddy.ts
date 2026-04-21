import { Container, Sprite, Spritesheet } from 'pixi.js';

/**
 * Character component that creates almond buddy. Includes texture changes, future additions include on-click interactions. 
 **/
export class Character extends Container {
    private sprite: Sprite;
    private sheet: Spritesheet;
    
    constructor(sheet: Spritesheet) {
        super();

        this.sprite = new Sprite(sheet.textures['left0.png']);
        this.sheet = sheet;
        this.addChild(this.sprite);

        console.log("BUDDY SIZE: ", this.sprite.width, "x", this.sprite.height);
    }

    /* Public to check and change almond buddy texture */
    public buddyLook(frameName: string) {
        const newTexture = this.sheet.textures[frameName];

        if (!newTexture) {
            console.error(`${frameName} is not a texture`);
        } else {
            this.sprite.texture = this.sheet.textures[frameName];
        }
        
    }
}