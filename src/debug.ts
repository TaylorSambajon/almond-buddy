import { Application, Container, Graphics } from 'pixi.js'

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

};

export function makePieGrid(app: Application) {
    const pie_box = new Container();
    pie_box.label = "Debug Grid";

    const x = app.screen.width / 2;
    const y = app.screen.height / 2;
    
    const right_slice = new RegionMap();
    const left_slice = new RegionMap();
    const up_right_slice = new RegionMap();
    const top_right_slice = new RegionMap();
    const top_left_slice = new RegionMap();
    const up_left_slice = new RegionMap();
    pie_box.addChild(right_slice);
    pie_box.addChild(up_right_slice);
    pie_box.addChild(top_right_slice);
    pie_box.addChild(top_left_slice);
    pie_box.addChild(up_left_slice);
    pie_box.addChild(left_slice);

    //DRAW DA DEBUGGER
    right_slice.drawSlice(x, y, 15, -12, 0xdef0cc);
    up_right_slice.drawSlice(x, y, -12, -35, 0x333333);
    top_right_slice.drawSlice(x, y, -35, -90, 0x34dd55);
    top_left_slice.drawSlice(x, y, -90, -145, 0x772efa);
    up_left_slice.drawSlice(x, y, -145, -168, 0xee20d3);
    left_slice.drawSlice(x, y, -168, -195, 0x22f84d);

    return pie_box;
}