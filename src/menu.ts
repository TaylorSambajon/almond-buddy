/**
 * BUDDY PLANNING STUFF FOR MENU
 * Ring Menu:
 *  - have menu pop out in a circle
 *  - slight hovering but no overt movements
 *  - ABOUT, WORK EXPERIENCE, PROJECTS, PORTFOLIO, EXTRAS
 **/
import { Container, Sprite, Spritesheet } from 'pixi.js'

export class MenuBar extends Sprite{
    private sprite: Sprite;
    private sheet: Spritesheet;

    constructor(sheet: Spritesheet){
        super();

        this.sprite = new Sprite(sheet.textures['menu.png']);
        this.sheet = sheet;
        this.addChild(this.sprite);
    }

    //need to be able to draw the bar

    //need to be able to place menu icons
}