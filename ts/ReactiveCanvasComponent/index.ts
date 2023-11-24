import {
  childComponent,
  componentRenderFunction,
  renderEventSingalInterface,
} from '../common/interface.js';

import {
  setHandlerParameter,
  userInputObject,
} from '../common/type.js';

/**
 * 반응형 컴포넌트
 */
export class ReactiveCanvasComponent {
  private children: childComponent[];
  private renderFunction: componentRenderFunction;
  private props: userInputObject;
  private renderEventSingal: renderEventSingalInterface;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private isNeedRender: boolean;

  /**
   * ReactiveCanvasComponent 생성자
   * @param {userInputObject} props
   * @param {childComponent[]} children
   * @param {componentRenderFunction} renderFunction
   */
  constructor(
      props: userInputObject,
      children: childComponent[],
      renderFunction: componentRenderFunction,
  ) {
    this.props = {};
    this.renderFunction = renderFunction;
    this.children = children;
    this.renderEventSingal = ()=>{};

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    const handler = {
      set: (...args:setHandlerParameter) => {
        args[0][args[1]] = args[2];
        this.bubbling();
        return true;
      },
    };

    this.props = new Proxy(props, handler as ProxyHandler<object>);

    for (const child of children) {
      child.element.setBubbling(this.bubbling.bind(this));
    }

    this.isNeedRender = true;
    this.render()
  }

  /**
   * 프록시로 랩필된 프로퍼티를 리턴
   * @return {ProxyHandler<object>}
   */
  getProps() {
    return this.props;
  }

  /**
   * 랜더
   */
  render() {
    this.isNeedRender = true;

    setTimeout(() => {
      if (!this.isNeedRender) {
        return;
      }
      this.isNeedRender = false;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.renderFunction(this.canvas, this.ctx, this.props, this.children);

      for (const child of this.children) {
        if (!child.hidden) {
          this.ctx.drawImage(child.element.getCanvas(), child.x, child.y);
        }
      }
    }, 0);
  }

  /**
   * 자식 컴포넌트 추가
   * @param {childComponent} child
   */
  addChild(child: childComponent) {
    this.children.push(child);
    this.bubbling();
  }

  /**
   * 자식 컴포넌트 삭제
   * @param {childComponent} child
   */
  removeChildByValue(child: childComponent) {
    this.children.splice(this.children.indexOf(child), 1);
    this.bubbling();
  }

  /**
   * 자식 컴포넌트 삭제
   * @param {number} index
   */
  removeChildByIndex(index: number) {
    this.children.splice(index, 1);
    this.bubbling();
  }

  /**
   * 이벤트 버블링을 위한 콜백 설정
   * @param {renderEventSingalInterface} renderEventSingal
   */
  setBubbling(renderEventSingal: renderEventSingalInterface) {
    this.renderEventSingal = renderEventSingal;
    this.render();
  }

  /**
   * 이벤트 발생을 상위 객체로 전달함
   */
  bubbling() {
    this.render();
    this.renderEventSingal();
  }

  /**
   * 캔버스 원본 요소 반환
   * @return {HTMLCanvasElement}
   */
  getCanvas() : HTMLCanvasElement {
    return this.canvas;
  }

  /**
   * 캔버스 크기 변경
   * @param {number} width
   * @param {number} height
   */
  setSize(width:number, height:number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
