import { ReactiveCanvasComponent } from "../build/ReactiveCanvasComponent/index.js";

export class MintueHand {
  constructor() {
    this.component = new ReactiveCanvasComponent(
      {
        mintue: 0,
      },
      [],
      (canvas, ctx, props, children)=>{
        const mintue = props.mintue;
        ctx.lineWidth = 2;
        ctx.drawLine(
          100, 
          100, 
          Math.cos(((mintue-15) * 6) * Math.PI / 180)* 60 + 100, 
          Math.sin(((mintue-15) * 6) * Math.PI / 180)* 60 + 100,
        );
      }
    );
    this.component.setSize(200, 200);
    this.props = this.component.getProps();
  }

  getComponent() {
    return this.component
  }

  setMinute(minute) {
    this.props.minute = minute;
  }
}