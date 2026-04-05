import { Container, Sprite, Spritesheet } from 'pixi.js';

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

    public buddyLook(frameName: string) {
        const newTexture = this.sheet.textures[frameName];

        if (!newTexture) {
            console.error(`${frameName} is not a texture`);
        } else {
            this.sprite.texture = this.sheet.textures[frameName];
        }
        
    }
}