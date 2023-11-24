import { ArrayUtil } from '../util/ArrayUtil.js';
/**
 * 반응성 캔버스
 */
export class ReactiveCanvas {
    /**
     * ReactiveCanvas의 생성자
     * @param {HTMLCanvasElement} canvas 캔버스 요소
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.layerList = [];
        this.isNeedRender = false;
        this.freamManager = -1;
        this.init();
    }
    /**
     * ReactiveCanvas 초기 설정
     */
    init() {
        this.startFreamManager();
    }
    /**
     * 프레임 매니저를 작동시킵니다.
     */
    startFreamManager() {
        this.freamManager = setInterval(() => {
            if (this.isNeedRender) {
                this.render();
            }
        }, 100);
    }
    /**
     * 프레임 매니저를 중지 시킵니다.
     */
    stopFreamManager() {
        clearInterval(this.freamManager);
    }
    /**
     * 다음 프레임 재랜더링을 하기 위해 예약합니다.
     */
    reservationRender() {
        this.isNeedRender = true;
    }
    /**
     * 캔버스 렌더
     */
    render() {
        this.isNeedRender = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const component of ArrayUtil
            .unfoldMultidimensionalArray(this.layerList)) {
            this.ctx.drawImage(component.getCanvas(), 0, 0);
        }
    }
    /**
     * 레이어 추가
     * @param {Layer} layer
     */
    addLayer(layer) {
        layer.setBubbling(this.reservationRender.bind(this));
        this.layerList.push(layer);
    }
}
