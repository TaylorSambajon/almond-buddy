import { Graphics } from 'pixi.js'

export class newAlmond extends Graphics {
    constructor() { //create the first buddy
        super();
        this.makeBuddy(0xc0c0c1);
    }

    private makeBuddy(color: number){ //draw the buddy
        this.clear();
        this.circle(0, 0, 50)
            .fill(color);
    }

    public changeColor(newColor: number){ //change the buddy color
        this.makeBuddy(newColor);
    }
}