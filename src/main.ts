import { 
          Assets, 
          Application,
        } from 'pixi.js'
import { Character } from './buddy.ts'
import { MenuBar } from './menu.ts'
import { makePieGrid, makeBuddySpace } from './debug.ts'

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

  //Get canvas positioning info
  const center_x = app.screen.width / 2;
  const center_y = app.screen.height / 2;

  //Load textures
  const daSheet = await Assets.load('/assets/buddy-sheet.json');
  console.log("LOADED: ", daSheet);
  //const daMenu = await Assets.load('/assets/menu-sheet.json');
  //console.log("LOADED: ", daMenu);

  
  //create buddy
  const almond = new Character(daSheet);


  //Buddy positioning
  almond.scale.set(0.5);
  almond.x = center_x;
  almond.y = center_y;

  //Buddy interaction area
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;

  //Create the menu
  //const menu = makeMenu(center_x, center_y, 0xfff7a3);
  //menu.eventMode = 'static';

  //Staging Elements
  app.stage.addChild(almond);
  //app.stage.addChild(menu);

  /*DEBUGGING SECTION 
  *
  //Make region grid. This grid draws a semi transparent, pie shaped "grid" that shows
  //the regions that the mouse must be in for Almond Buddy to look in that direction.
  const pie_grid = makePieGrid(app);
  pie_grid.eventMode = 'none';

  //Make hitbox. Helps to determine where buddy is clickable.
  const buddyBox = makeBuddySpace(center_x + 10, center_y + 15, 120, 65);
  buddyBox.eventMode = 'none';
  
  app.stage.addChild(buddyBox);
  app.stage.addChild(pie_grid);
  *
  *END DEBUGGING SECTION*/
  
  app.stage.on('globalpointermove', (event) => {
    almond.buddyLookPie(app, event.global);
    //place menu using summonMenu

  });
    //INCLUDE TEXT BOX GREETING VIEWER
}

setup();