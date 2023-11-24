import {ReactiveCanvas} from '../build/ReactiveCanvas/index.js';
import {ReactiveCanvasComponent}
  from '../build/ReactiveCanvasComponent/index.js';
import {Layer} from '../build/ReactiveCanvas/Layer.js';

import {Clock} from './Clock.js';

CanvasRenderingContext2D.prototype.drawLine = function (x1, y1, x2, y2) {
  this.beginPath();
  this.moveTo(x1, y1);
  this.lineTo(x2, y2);
  this.stroke();
};

window.addEventListener('load', ()=>{
  const canvas = document.querySelector('canvas');
  canvas.width = 500;
  canvas.height = 500;
  canvas.getContext('2d').drawLine(0, 100, 100, 0);
  const reactiveCanvas = new ReactiveCanvas(canvas);
  const layer1 = new Layer();
  const uiLayer = new Layer();

  const layers = [layer1, uiLayer];
  const clock = new Clock();
  const uiSplite = new ReactiveCanvasComponent(
    {}, 
    [
      {
        x:0,
        y:0,
        hidden: false,
        element: clock.getComponent(),
      }
    ], 
    (canvas, ctx, props, children)=>{}
  );
  uiSplite.setSize(500, 500);
  uiLayer.addComponent(uiSplite);

  for (const layer of layers) {
    reactiveCanvas.addLayer(layer);
  }
  reactiveCanvas.render();
});
