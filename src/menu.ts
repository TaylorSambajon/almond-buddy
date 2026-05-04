/**
 * BUDDY PLANNING STUFF FOR MENU
 * Ring Menu:
 *  - have menu pop out in a circle
 *  - slight hovering but no overt movements
 *  - ABOUT, WORK EXPERIENCE, PROJECTS, PORTFOLIO, EXTRAS
 **/
import { Application, Container, Graphics, Sprite, Spritesheet } from 'pixi.js'


export class MenuBar extends Sprite{
    private menuSprite: Sprite;
    private iconSprites: Sprite[] = []
    private sheet: Spritesheet;
    public menuIcons: string[] = [];

    constructor(sheet: Spritesheet){
        super();
        this.sheet = sheet;
        this.menuIcons = ['About', 'Work Experience', 'Portfolio', 'Projects'];

        for (let icon of this.menuIcons){
            const iconSprite = new Sprite(sheet.textures[`${icon.toLowerCase()}.png`]);
            this.iconSprites.push(iconSprite);
        };

        this.menuSprite = new Sprite(sheet.textures['menu.png']);
        this.addChild(this.menuSprite);
        for (let iconSprite of this.iconSprites){
            this.addChild(iconSprite);
        };
    }

    //Draws the menu bar
    public drawMenu(x: number, y: number, menuType: string){
        this.x = x;
        this.y = y;
        this.menuSprite.texture = this.sheet.textures[menuType];
        
    }

    //Draws the menu icons
    public drawIcons(x: number, y: number, menuType: string){
        if (menuType == 'arch'){
            //use radians to determine where to place along the arch
            for (let icon of this.iconSprites){
                
            }
        } else if (menuType == 'bar'){

            //place along the bar
            for (let icon of this.iconSprites){
                icon.x = x;
                icon.y = y;
                y += 75;
            }
        }
    }

    //need to be able to change where the menu is
    public changePos(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    //Reveals menu
    public demask(){
        //make a graphic drawn as a semicircle
        //erases from left to right when arch is in use
        //redraws from right to left when arch is not in use
    }
        
}

