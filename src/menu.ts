/**
 * BUDDY PLANNING STUFF FOR MENU
 * Ring Menu:
 *  - have menu pop out in a circle
 *  - slight hovering but no overt movements
 *  - ABOUT, WORK EXPERIENCE, PROJECTS, PORTFOLIO, EXTRAS
 **/
import { Container, Graphics } from 'pixi.js'

export class MenuBar extends Graphics{
    constructor(){
        super();
    }

    public drawBar(x: number, y: number, color: number){
        this.clear();
        console.log("Drawing da menu yeaaaaa");


        this.arc(
            x,y,150,
            Math.PI, 0,
            false
        );

        this.lineTo(x,y);
        this.fill(
            {color: color, alpha: 0.3}
        )
        this.strokeStyle = {
            width: 10,
            color: color,
            cap: 'round', join: 'round',
            alpha: 0.8
        }
    }
}

export function makeMenu(x: number, y: number, color: number){
    const menu_container = new Container();
    menu_container.label = 'Menu Bar';
    const menu = new MenuBar();


    menu_container.addChild(menu);
    menu.drawBar(x, y, color)

    return menu_container;
}

/*
    Cleans up current menu graphics for a new menu.
*/
export function cleanMenu(container: Container){
    if (container.parent)
        container.parent.removeChild(container);

    container.destroy({children: true});
}