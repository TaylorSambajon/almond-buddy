import { 
          Assets, 
          Application,
        } from 'pixi.js'
import { Character } from './buddy.ts'
import { makePieGrid } from './debug.ts'
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

  //create buddy
  const almond = new Character(daSheet);
  const center_x = app.screen.width / 2;
  const center_y = app.screen.height / 2;

  //Buddy positioning
  almond.scale.set(0.5);
  almond.x = center_x;
  almond.y = center_y;

  /*DEBUGGING SECTION */
  //Make region grid. This grid draws a semi transparent, pie shaped "grid" that shows
  //the regions that the mouse must be in for Almond Buddy to look in that direction.
  const pie_grid = makePieGrid(app);

  //Buddy interaction area
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;

  //Staging Elements
  app.stage.addChild(almond);
  app.stage.addChild(pie_grid);
  
  app.stage.on('globalpointermove', (event) => {
    almond.buddyLookSquare(app, event.global);

  });
}

setup();