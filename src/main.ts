import { 
          Assets, 
          Application,
          FederatedPointerEvent } from 'pixi.js'
import { Character } from './buddy.ts'
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

  const daSheet = await Assets.load('/assets/buddy-sheet.json');
  console.log("LOADED: ", daSheet);

  const x_axis = app.screen.width / 2;
  const y_axis = app.screen.height /2;
  const center = 70;
  const near = 200;
  
  const almond = new Character(daSheet);

  almond.scale.set(0.5);
  almond.x = x_axis;
  almond.y = y_axis;

  app.stage.addChild(almond);
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;

  app.stage.on('globalpointermove', (event: FederatedPointerEvent) => {
    const { x, y } = event.global;
    
    if (x > x_axis) {

      if (y < y_axis + center){

        if (x < x_axis + center){
          almond.buddyLook('right0.png');
        } else if (x < x_axis + near){
          almond.buddyLook('right1.png');
        } else {
          almond.buddyLook('right2.png');
        }

      } else {
        almond.buddyLook('right_down.png');
      }

    }

    if (x < x_axis) {

      if (y < y_axis + center){

        if (x > x_axis - center){
          almond.buddyLook('left0.png');
        } else if (x > x_axis - near){
          almond.buddyLook('left1.png');
        } else {
          almond.buddyLook('left2.png');
        }

      } else {
        almond.buddyLook('left_down.png');
      }
    }

  });
}

setup();