import {SecondHand} from './SecondHand.js';
import {MintueHand} from './MintueHand.js';
import {HourHand} from './HourHand.js';
import { ReactiveCanvasComponent } from '../build/ReactiveCanvasComponent/index.js';

export class Clock {
  constructor() {
    this.secondHand = new SecondHand();
    this.mintueHand = new MintueHand();
    this.hourHand = new HourHand();

    this.setTime();
    setInterval(this.setTime.bind(this), 1000);

    this.component = new ReactiveCanvasComponent(
      {},
      [
        {
          x: 0,
          y: 0,
          element: this.secondHand.getComponent(),
        },
        {
          x: 0,
          y: 0,
          element: this.mintueHand.getComponent(),
        },
        {
          x: 0,
          y: 0,
          element: this.hourHand.getComponent(),
        }
      ],
      (canvas, ctx)=>{
        console.log('change clock');
        ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, 0, Math.PI*2, true);
        ctx.stroke();
      }
    );
    this.component.setSize(200, 200);
  }

  setTime() {
    const date = new Date();
    this.secondHand.setSecond(date.getSeconds());
    this.mintueHand.setMinute(date.getMinutes());
    this.hourHand.setHour(date.getHours());
  }

  getComponent() {
    return this.component
  }
}