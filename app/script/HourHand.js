import { ReactiveCanvasComponent } from "../build/ReactiveCanvasComponent/index.js";

export class HourHand {
  constructor() {
    this.component = new ReactiveCanvasComponent(
      {
        hour: 0,
      },
      [],
      (canvas, ctx, props, children)=>{
        const hour = props.hour;
        ctx.lineWidth = 3;
        ctx.drawLine(
          100, 
          100, 
          Math.cos(((hour-3) * 30) * Math.PI / 180)* 40 + 100, 
          Math.sin(((hour-3) * 30) * Math.PI / 180)* 40 + 100,
        );
      }
    );
    this.component.setSize(200, 200);
    this.props = this.component.getProps();
  }

  getComponent() {
    return this.component
  }

  setHour(hour) {
    this.props.hour = hour;
  }
}