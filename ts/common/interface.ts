import {ReactiveCanvasComponent} from '../ReactiveCanvasComponent/index.js';
import {userInputObject} from './type.js';

export interface renderEventSingalInterface {
  (): void;
}

export interface componentRenderFunction {
  (
    canvas:HTMLCanvasElement,
    ctx:CanvasRenderingContext2D,
    prop:userInputObject,
    childComponents:childComponent[],
  ): void;
}

export interface childComponent {
  x: number,
  y: number,
  hidden?: boolean,
  element: ReactiveCanvasComponent,
}
