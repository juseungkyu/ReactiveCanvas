import {SecondHand} from './SecondHand.js';
import {MintueHand} from './MintueHand.js';
import {HourHand} from './HourHand.js';
import { ReactiveCanvasComponent } from '../build/ReactiveCanvasComponent/index.js';

export class Clock {
  constructor() {
    const secondHand = new SecondHand();
    const mintueHand = new MintueHand();
    const hourHand = new HourHand();

    // setInterval(()=>{
    //   const date = new Date();
    //   secondHand.setSecond(date.getSeconds());
    //   mintueHand.setMinute(date.getMinutes());
    //   hourHand.setHour(date.getHours());
    // }, 1000)

    this.component = new ReactiveCanvasComponent(
      {},
      [
        {
          x: 0,
          y: 0,
          element: secondHand.getComponent(),
        },
        {
          x: 0,
          y: 0,
          element: mintueHand.getComponent(),
        },
        {
          x: 0,
          y: 0,
          element: hourHand.getComponent(),
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

  getComponent() {
    return this.component
  }
}