/**
 * 캔버스의 레이어
 */
export class Layer extends Array {
    /**
     * Layer의 생성자
     */
    constructor() {
        super();
        this.componentList = [];
        this.renderEventSingal = () => { };
    }
    /**
     * 레이어에 컴포넌트를 추가
     * @param {ReactiveCanvasComponent} component
     */
    addComponent(component) {
        component.setBubbling(this.bubbling.bind(this));
        this.componentList.push(component);
        this.bubbling();
    }
    /**
     * 레이어의 컴포넌트 리스트를 설정
     * @param {ReactiveCanvasComponent} componentList
     */
    setComponentList(componentList) {
        this.componentList = componentList;
    }
    /**
     * 레이어를 이터러블로 만들기 위해 실행되는 제너레이터
     */
    *[Symbol.iterator]() {
        for (const component of this.componentList) {
            yield component;
        }
    }
    /**
     * 이벤트 버블링을 위한 콜백 설정
     * @param {renderEventSingalInterface} renderEventSingal
     */
    setBubbling(renderEventSingal) {
        this.renderEventSingal = renderEventSingal;
    }
    /**
     * render
     */
    bubbling() {
        this.renderEventSingal();
    }
}
