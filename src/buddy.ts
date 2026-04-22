import { Application, Container, Point, Sprite, Spritesheet } from 'pixi.js';

/**
 * Character component that creates this buddy. Includes texture changes, future additions include on-click interactions. 
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

    /* Public to check and change this buddy texture */
    public buddyMove(frameName: string) {
        const newTexture = this.sheet.textures[frameName];

        if (!newTexture) {
            console.error(`${frameName} is not a texture`);
        } else {
            this.sprite.texture = this.sheet.textures[frameName];
        }
        
    }

    /*Changes the direction that Almond Buddy is looking depending on mouse coords in a square grid*/
    public buddyLookSquare(app: Application, mouse: Point) {
        const x_axis = app.screen.width / 2;
        const y_axis = app.screen.height /2;
        const center = 70;
        const near = 200;
        const { x, y } = mouse;

        //Right half of screen
        if (x > x_axis) { 
            
            //If buddy is looking down
            if (y > y_axis + center){
                this.buddyMove('right_down.png');
            
            //else if buddy is looking right
            } else if (y > y_axis - center ){
                
                //how far right is buddy looking?
                if (x < x_axis + center){
                    this.buddyMove('right0.png');
                } else if (x < x_axis + (near*1.5)){
                    this.buddyMove('right1.png');
                } else {
                    this.buddyMove('right2.png');
                };
            
            //buddy is looking up
            } else if (y > y_axis - near){
                this.buddyMove('right_up.png');
            } else {
                this.buddyMove('right_up2.png');
            };
        };

        //Left half of screen
        if (x < x_axis) {

            //Buddy is looking down
            if (y > y_axis + center){
                this.buddyMove('left_down.png');
            
            //Buddy is looking to the left
            } else if (y > y_axis - center){

                //How far left is buddy looking?
                if (x > x_axis - center){
                this.buddyMove('left0.png');
                } else if (x > x_axis - (near*1.5)){
                this.buddyMove('left1.png');
                } else {
                this.buddyMove('left2.png');
                };
            
            //Buddy is looking up
            } else if (y > y_axis - near){
                this.buddyMove('left_up.png');
            } else {
                this.buddyMove('left_up2.png');
            };

        };
    };

    /*Changes the direction that Almond Buddy is looking depending on mouse coords in a circle*/
    public buddyLookPie(app: Application, mouse: Point) {
        const x_axis = app.screen.width / 2;
        const y_axis = app.screen.height /2;
        const center = 70;
        const near = 200;
        const {x,y} = mouse;

        //For calculating angle and degrees
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const angle = Math.atan2(dy, dx);
        let degree = angle * (180 /Math.PI);

        //Buddy looking right
        if (degree >= -12 && degree < 15){
            
            //How far right is buddy looking?
            if (x < x_axis + center){
                    this.buddyMove('right0.png');
                } else if (x < x_axis + (near*1.5)){
                    this.buddyMove('right1.png');
                } else {
                    this.buddyMove('right2.png');
                };
        }

        //Buddy looking up right
        if ( degree >= -35 && degree < -12){
            this.buddyMove('right_up.png');
        }
        if (degree >= -90 && degree < -35){
            this.buddyMove('right_up2.png')
        }

        
    };
};