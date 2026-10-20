import { Application, extensions } from 'pixi.js';
import { Live2DModel, Live2DPlugin, configureCubismSDK } from 'untitled-pixi-live2d-engine/cubism';

configureCubismSDK({ memorySizeMB: 64 });

extensions.add(Live2DPlugin);

const app = new Application();

await app.init({
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
canvas.style.zIndex = '5';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

const model = await Live2DModel.from('/lumine/lumine.model3.json', {
    textureOptions: { lod: 'single-auto' }
});

window.model = model

app.stage.addChild(model);
model.anchor.set(0.5);

let baseModelWidth = model.width;
let baseModelHeight = model.height;

function setModelTransform(x, y, scale) {
    model.x = x;
    model.y = y;
    model.scale.set(scale);
}

function updateLayout() {
    const scale = Math.min(
        app.screen.width / baseModelWidth,
        app.screen.height / baseModelHeight
    ) * 1.2;

    setModelTransform(
        app.screen.width / 1.3,
        app.screen.height / 3,
        scale
    );
}

updateLayout()
setInterval(updateLayout, 100)
model.focus(0, 4000);

window.addEventListener('pointermove', (event) => {
    if (typeof model.focus === 'function') {
        model.focus(event.clientX, event.clientY);
    }
});