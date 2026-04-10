import { 
          Assets, 
          Application,
          FederatedPointerEvent
        } from 'pixi.js'
import { Character } from './buddy.ts'
import { RegionMap } from './debug.ts'
import './style.css'

const app = new Application();

async function setup() {

  await app.init({ 

    background: '#345021', 
    resizeTo: window,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true

  });

  document.body.appendChild(app.canvas);

  //load almond buddy json and atlas map
  const daSheet = await Assets.load('/assets/buddy-sheet.json');
  console.log("LOADED: ", daSheet);

  //establish central limits
  const x_axis = app.screen.width / 2;
  const y_axis = app.screen.height /2;
  const center = 70;
  const near = 200;

  //create buddy
  const almond = new Character(daSheet);

  //Buddy positioning
  almond.scale.set(0.5);
  almond.x = x_axis;
  almond.y = y_axis;

  //Buddy interaction area
  app.stage.addChild(almond);
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;

  //place overlay on top of buddy
  const region_overlay = new RegionMap();
  app.stage.addChild(region_overlay);

  //Buddy looking math
  app.stage.on('globalpointermove', (event: FederatedPointerEvent) => {
    const { x, y } = event.global;
    
    //DRAW DA DEBUGGER
    region_overlay.drawSlice(almond.x, almond.y, 0, -20, 0xd3f0cc);

    if (x > x_axis) { //greater x values mean right of the screen
      
      if (y > y_axis + center){ //bottom half of screen, upper limit to looking straight right

        almond.buddyLook('right_down.png');

      } else if (y > y_axis - center ){ //bottom limit to looking direct right

        if (x < x_axis + center){
          almond.buddyLook('right0.png');
        } else if (x < x_axis + (near*1.5)){
          almond.buddyLook('right1.png');
        } else {
          almond.buddyLook('right2.png');
        }

      } else if (y > y_axis - near){ //bottom limit to almond buddy up right1 range

        almond.buddyLook('right_up.png');

      } else { //if y is smaller than any of those values, almond buddy looks up all the way

        almond.buddyLook('right_up2.png');

      }

    }

    if (x < x_axis) { //smaller x values mean left of the screen

      if (y > y_axis + center){ //bottom limit to look down

        almond.buddyLook('left_down.png');

      } else if (y > y_axis - center){ //bottom limit to look straight left

        if (x > x_axis - center){ //center limit for left
          almond.buddyLook('left0.png');
        } else if (x > x_axis - (near*1.5)){ //"near" limit for left
          almond.buddyLook('left1.png');
        } else { //everything else, may limit this point to create a "box" for AB
          almond.buddyLook('left2.png');
        }

      } else if (y > y_axis - near){ //bottom limit to look up left1

        almond.buddyLook('left_up.png');

      } else { //if y is smaller than y_axis - near bounds then look up2

        almond.buddyLook('left_up2.png');

      }

    }

  });
}

setup();