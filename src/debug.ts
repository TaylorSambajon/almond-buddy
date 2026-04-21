import { Graphics } from 'pixi.js'

/*
 * Creates the region map that blocks out different sections of active areas
 */
export class RegionMap extends Graphics {
    constructor() { //basic constructor
        super();
    }

    //draws a slice in the region map and fills it in
    public drawSlice(x: number, y: number, sDeg: number, eDeg: number, color: number){
        this.clear();
        let degree1 = sDeg * (Math.PI / 180);
        let degree2 = eDeg * (Math.PI / 180);
        console.log("Da degrees in question, start:", degree1, ", end: ", degree2);

        //begin the slice and place it at the center of the screen
        this.beginPath();
        this.moveTo(x,y);

        //create an arc according to origin, map lines for each of this length, from
        //start position to end position
        this.arc(
            x, y, 600, 
            degree1, degree2,
            true
        );

        //fill in lines and region
        this.lineTo(x, y);
        this.fill({color, alpha: 0.3});
        this.stroke({
            width: 2,
            color,
            alpha: 0.8
        });

    }

    public drawGrid(startX: number, startY: number, endX: number, endY: number, color: number){
        this.clear();

        this.beginPath();

        //DRAW BOX
        this.moveTo(startX,startY);
        this.lineTo(startX, endY);
        this.lineTo(endX, endY);
        this.lineTo(endX,startY);

        this.fill({color, alpha: 0.4});
        this.stroke({width: 2, color, alpha: 0.8});
    }

}