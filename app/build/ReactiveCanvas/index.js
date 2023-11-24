var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                yield this.controlRender(100);
            }
        });
    }
    /**
     * 동기적으로 렌더를 하기 위한 함수
     * @param {number} time
     * @return {Promise<void>}
     */
    controlRender(time) {
        return new Promise((res) => {
            setTimeout(() => {
                if (this.isNeedRender) {
                    this.render();
                    this.isNeedRender = false;
                }
                res();
            }, time);
        });
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
        console.log(this);
    }
    /**
     * 캔버스 렌더
     */
    render() {
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
