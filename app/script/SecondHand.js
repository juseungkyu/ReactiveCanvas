import { ReactiveCanvasComponent } from "../build/ReactiveCanvasComponent/index.js";

export class SecondHand {
  constructor() {
    this.component = new ReactiveCanvasComponent(
      {
        second: 0
      },
      [],
      (canvas, ctx, props, children)=>{
        const second = props.second;
        ctx.lineWidth = 1;
        ctx.drawLine(
          100, 
          100, 
          Math.cos(((second-15) * 6) * Math.PI / 180)* 90 + 100, 
          Math.sin(((second-15) * 6) * Math.PI / 180)* 90 + 100,
        );
      }
    );
    this.component.setSize(200, 200);
    this.props = this.component.getProps();
  }

  setSecond(second) {
    console.log('set second');
    this.props.second = second
  }

  getComponent() {
    return this.component
  }
}