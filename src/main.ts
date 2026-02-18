import { Application, Graphics } from 'pixi.js'
import './style.css'

const app = new Application();

async function setup() {

  await app.init({ 

    background: '#6d83c0', 
    resizeTo: window,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true

  });

  document.body.appendChild(app.canvas);

  const almond = new Graphics().circle(0, 0, 50).fill('#c0c0c1'); //blue fill, maybe we might have to change this lmao

  almond.x = app.screen.width / 2;
  almond.y = app.screen.height / 2;
  almond.pivot.set(0);

  app.stage.addChild(almond);

  app.ticker.add(() => {
    
    const mouse = app.renderer.events.pointer;
    const speed = 0.1;

    let nextX = almond.x += (mouse.x - almond.x) * speed;
    let nextY = almond.y += (mouse.y - almond.y) * speed;

    const radius = 200;

    almond.x = Math.max(radius, Math.min(nextX, app.screen.width - radius));
    almond.y = Math.max(radius, Math.min(nextY, app.screen.height - radius));

  });
}

setup();