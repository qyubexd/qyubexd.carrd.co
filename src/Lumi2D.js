import { Application, extensions } from 'pixi.js';
import { Live2DModel, Live2DPlugin, configureCubismSDK } from 'untitled-pixi-live2d-engine/cubism';

configureCubismSDK({ memorySizeMB: 64 });

extensions.add(Live2DPlugin);

// Then initialize your application as usual
const app = new Application();
await app.init({
    // view: window.canvas,
    resizeTo: window,
    antialias: false,
    backgroundAlpha: 0,
    resolution: 1,
});

window.app = app

const canvas = app.canvas;
canvas.style.position = 'fixed';
canvas.style.right = '0px';
canvas.style.bottom = '0px';
canvas.style.zIndex = '0';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

// 2. Load the model WITH Texture LOD enabled
const model = await Live2DModel.from('/lumine/lumine.model3.json', {
    textureOptions: { lod: 'single-auto' }
});

window.model = model

// 3. Add to stage and position (same as before)
app.stage.addChild(model);
model.anchor.set(0.5);

let scale = Math.min(
    app.screen.width / model.width,
    app.screen.height / model.height
) * 1;

function setModelTransform(x, y, scale) {
    model.x = x;
    model.y = y;
    model.scale.set(scale);
}

setModelTransform(
    app.screen.width / 1.3,
    app.screen.height / 3,
    scale
)