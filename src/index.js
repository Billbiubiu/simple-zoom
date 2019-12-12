/**
 * simple-zoom 1.0.0
 * 
 * Author: Wuhao 
 * https://github.com/Billbiubiu
 */
import './index.css';
import {
  isHTMLElement,
  preventDefault,
  cancelBubble,
  deepCompare,
  parseTouches,
  getMargins,
} from './utils';

const assign = Object.assign;
const DEFAULTOPTIONS = {
  initZoom: 1,    // 原始缩放比例
  minZoom: 0.1,   // 最小缩放比例
  maxZoom: 10,    // 最大缩放比例
  zoomSpeed: 0.2,  // 默认缩放速度
};

export default class SimpleZoom {
  /**
   * @class SimpleZoom
   * @param {string|object} el 
   * @param {object} options 
   */
  constructor(el, options = {}) {
    // 根据传入的参数获取实例元素
    if (!el) {
      throw new Error('please provide a target element!');
    } else if (typeof el == 'string') {
      this.el = document.querySelector(el);
      if (!this.el) {
        throw new Error('element not found!');
      }
    } else if (typeof el == 'object') {
      if (isHTMLElement(el)) {
        this.el = el;
      } else {
        throw new Error('element is not HTMLElement!');
      }
    }
    // 设置父元素样式
    if (this.el.parentNode && this.el.parentNode.tagName) {
      this.parentNode = this.el.parentNode;
      this.el.classList.add('simple-zoom-el');
      this.parentNode.classList.add('simple-zoom-container');
    } else {
      throw new Error('element can not be root-element!');
    }
    if (typeof options !== 'object') {
      throw new Error('options is supposed to be an object!')
    }
    // 覆盖默认的配置
    this.options = assign({}, DEFAULTOPTIONS, options);
    // 保存事件处理函数，方便移除时使用
    this._internalListeners = {
      // 滚轮事件
      'mousewheel': this._onMouseWheel.bind(this),
      'DOMMouseScroll': this._onMouseWheel.bind(this),
      // 鼠标点击事件
      'mousedown': this._onMouseDown.bind(this),
      'mousemove': this._onMouseMove.bind(this),
      'mouseup': this._onMouseUp.bind(this),
      'mouseout': this._onMouseUp.bind(this),
      // 移动端拖拽事件
      'touchmovestart': this._onTouchMoveStart.bind(this),
      'touchmove': this._onTouchMove.bind(this),
      'touchmoveend': this._onTouchMoveEnd.bind(this),
      // 移动端缩放事件
      'touchzoomstart': this._onTouchZoomStart.bind(this),
      'touchzoom': this._onTouchZoom.bind(this),
      'touchzoomend': this._onTouchZoomEnd.bind(this),
    }
    // 通过 this.on 添加的事件
    this._onListeners = Object.create(null);
    // 通过 this.addEventListener 添加的事件
    this._eventListeners = Object.create(null);
    // 初始化
    this._init();
  }
  /**
   * 初始化 state 和事件监听
   * @memberof SimpleZoom
   */
  _init() {
    // 初始状态
    this.reset();
    this.update();
    // 添加事件监听
    this.el.addEventListener('mousewheel', this._internalListeners['mousewheel'])
    this.el.addEventListener('DOMMouseScroll', this._internalListeners['DOMMouseScroll'])
    this.el.addEventListener('mousedown', this._internalListeners['mousedown']);
    this.parentNode.addEventListener('touchstart', this._internalListeners['touchmovestart']);
    this.parentNode.addEventListener('touchstart', this._internalListeners['touchzoomstart']);
  }
  /**
   * 设置 transform 属性
   * @memberof SimpleZoom
   * @param {number} zoom 
   * @param {object} translate 
   */
  _setTransform(zoom, translate) {
    let { x, y } = translate;
    this.el.style.transform = `scale(${zoom}) translate(${x / zoom}px,${y / zoom}px)`;
  }
  /**
   * 设置 transformOrigin 属性
   * @memberof SimpleZoom
   * @param {object} transformOrigin 
   */
  _setTransformOrigin(transformOrigin) {
    let { x, y } = transformOrigin;
    this.el.style.transformOrigin = `${x}px ${y}px`;
  }
  /**
   * 执行已有的事件监听
   * @memberof SimpleZoom
   * @param {string} type 
   * @param {event} event 
   */
  _excuteListeners(type, event) {
    if (this._onListeners[type]) {
      try {
        this._onListeners[type](event);
      } catch (error) {
        console.warn(error)
      }
    }
    if (this._eventListeners[type] && this._eventListeners[type].length) {
      this._eventListeners[type].forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          console.warn(error)
        }
      })
    }
  }
  /**
   * 鼠标滚轮缩放
   * @memberof SimpleZoom
   * @param {event} event 
   */
  _onMouseWheel(event) {
    // 获取配置
    let { minZoom, maxZoom, zoomSpeed } = this.options;
    let { zoomLock, positionLock, zoom, translate, transformOrigin } = this.state;
    if (zoomLock) return;
    preventDefault(event);
    cancelBubble(event);
    // 获取鼠标位置
    let { offsetX, offsetY } = event;
    // 根据缩放幅度和缩放速度计算缩放比例
    let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) * zoomSpeed;
    let newZoom = zoom + delta;
    // 边界情况判断，开启回弹效果
    if (newZoom < minZoom) {
      newZoom = Math.max(minZoom - zoomSpeed, 0);
      setTimeout(() => {
        this.setState(assign({}, this.state, {
          zoom: minZoom
        }))
      }, 300)
    } else if (newZoom > maxZoom) {
      newZoom = maxZoom + zoomSpeed;
      setTimeout(() => {
        this.setState(assign({}, this.state, {
          zoom: maxZoom
        }))
      }, 300)
    } else if (Math.abs(newZoom - 1) < (zoomSpeed / 2)) {
      newZoom = 1;
    }
    // 小于等于初始缩放比例时不允许拖拽，大于初始缩放比例时需要注意不能出界
    if (newZoom <= 1) {
      positionLock = true;
      translate = { x: 0, y: 0 };
      transformOrigin = {
        x: (this.el.offsetWidth / 2),
        y: (this.el.offsetHeight / 2),
      }
    } else {
      positionLock = false;
      transformOrigin = {
        x: offsetX,
        y: offsetY,
      }
      // 判断缩放后元素有没有出界
      let margins = getMargins(this.el, newZoom, translate, transformOrigin);
      for (let side in margins) {
        if (margins[side] > 0) {
          switch (side) {
            case 'top':
              translate.y -= margins.top;
              break;
            case 'right':
              translate.x += margins.right;
              break;
            case 'bottom':
              translate.y += margins.bottom;
              break;
            case 'left':
              translate.x -= margins.left;
              break;
          }
        }
      }
    }
    this.setState(assign({}, this.state, {
      positionLock,
      zoom: newZoom,
      translate,
      transformOrigin,
    }))
  }
  /**
   * 鼠标点击进入拖拽模式
   * @memberof SimpleZoom
   * @param {event} event 
   */
  _onMouseDown(event) {
    let { positionLock, translate } = this.state;
    if (positionLock) return;
    preventDefault(event);
    let { clientX, clientY } = event;
    this.setState(assign({}, this.state, {
      isMouseMoving: true,
      moveStart: {
        x: clientX,
        y: clientY,
      },
      movingTranslate: assign({}, translate),
    }));
    // 修改cursor样式
    this.el.classList.add('move');
    this.el.addEventListener('mousemove', this._internalListeners['mousemove']);
    this.el.addEventListener('mouseup', this._internalListeners['mouseup']);
    this.el.addEventListener('mouseout', this._internalListeners['mouseout']);
  }
  /**
   * 移动鼠标进行拖拽
   * @memberof SimpleZoom
   * @param {event} event 
   */
  _onMouseMove(event) {
    let { zoom, translate, movingTranslate, transformOrigin, moveStart } = this.state;
    preventDefault(event);
    let { clientX, clientY } = event;
    // 计算移动后的 translate
    let newMovingTranslate = {
      x: translate.x + (clientX - moveStart.x),
      y: translate.y + (clientY - moveStart.y),
    }
    // 判断拖拽后元素有没有出界
    let margins = getMargins(this.el, zoom, newMovingTranslate, transformOrigin);
    for (let side in margins) {
      if (margins[side] > 0) {
        switch (side) {
          case 'top':
            newMovingTranslate.y = (transformOrigin.y * (zoom - 1));
            break;
          case 'right':
            newMovingTranslate.x = ((this.el.offsetWidth - transformOrigin.x) * (1 - zoom));
            break;
          case 'bottom':
            newMovingTranslate.y = ((this.el.offsetHeight- transformOrigin.y) * (1 - zoom));
            break;
          case 'left':
            newMovingTranslate.x = (transformOrigin.x * (zoom - 1));
            break;
        }
      }
    }
    this.setState(assign({}, this.state, {
      movingTranslate: newMovingTranslate
    }));
  }
  /**
   * 鼠标抬起退出拖拽模式
   * @memberof SimpleZoom
   */
  _onMouseUp() {
    let { movingTranslate } = this.state;
    this.setState(assign({}, this.state, {
      translate: assign({}, movingTranslate),
      isMouseMoving: false,
    }));
    this.el.classList.remove('move');
    this.el.removeEventListener('mousemove', this._internalListeners['mousemove']);
    this.el.removeEventListener('mouseup', this._internalListeners['mouseup']);
    this.el.removeEventListener('mouseout', this._internalListeners['mouseout']);
  }
  /* 移动端适配 */
  /**
   * 单指 touch 进入拖拽模式
   * @memberof SimpleZoom
   * @param {event} event 
   */
  _onTouchMoveStart(event) {
    let { positionLock, isTouchZoom, translate } = this.state;
    // 如果位置被锁定或已进入拖拽模式，直接返回
    if (positionLock || isTouchZoom) return;
    preventDefault(event);
    let touches = parseTouches(this.parentNode, event.touches);
    let length = touches.length;
    if (length !== 2) {
      // 延迟执行，如果 100ms 内变为双指，则判定为缩放操作
      this.state.touchTimer = setTimeout(() => {
        let touch = event.touches[0];
        let { clientX, clientY } = touch;
        this.setState(assign({}, this.state, {
          touchTimer: null,
          isTouchMoving: true,
          touchStart: {
            x: clientX,
            y: clientY
          },
          movingTranslate: assign({}, translate)
        }));
        this.parentNode.addEventListener('touchmove', this._internalListeners['touchmove']);
        this.parentNode.addEventListener('touchend', this._internalListeners['touchmoveend']);
      }, 100)
    }
  }
  /**
   * 移动手指进行拖拽
   * @memberof SimpleZoom
   * @param {event} event 
   */
  _onTouchMove(event) {
    let { zoom, translate, touchStart, movingTranslate, transformOrigin } = this.state;
    preventDefault(event);
    let touches = parseTouches(this.parentNode, event.touches);
    let { clientX, clientY } = touches[0];
    let newMovingTranslate = {
      x: translate.x + (clientX - touchStart.x),
      y: translate.y + (clientY - touchStart.y),
    }
    // 判断拖拽后元素有没有出界
    let margins = getMargins(this.el, zoom, newMovingTranslate, transformOrigin);
    for (let side in margins) {
      if (margins[side] > 0) {
        switch (side) {
          case 'top':
            newMovingTranslate.y = (transformOrigin.y * (zoom - 1));
            break;
          case 'right':
            newMovingTranslate.x = ((this.el.offsetWidth - transformOrigin.x) * (1 - zoom));
            break;
          case 'bottom':
            newMovingTranslate.y = ((this.el.offsetHeight- transformOrigin.y) * (1 - zoom));
            break;
          case 'left':
            newMovingTranslate.x = (transformOrigin.x * (zoom - 1));
            break;
        }
      }
    }
    this.setState(assign({}, this.state, {
      movingTranslate: newMovingTranslate
    }));
  }
  /**
   * 手指抬起退出拖拽模式
   * @memberof SimpleZoom
   */
  _onTouchMoveEnd() {
    let { movingTranslate } = this.state;
    this.setState(assign({}, this.state, {
      translate: assign({}, movingTranslate),
      isTouchMoving: false,
    }));
    this.parentNode.removeEventListener('touchmove', this._internalListeners['touchmove']);
    this.parentNode.removeEventListener('touchend', this._internalListeners['touchmoveend']);
  }
  /**
   * 双指 touch 进入缩放模式
   * @memberof SimpleZoom
   * @param {event} event 
   */
  _onTouchZoomStart(event) {
    let { zoomLock, touchTimer, isTouchMoving } = this.state;
    if (zoomLock || isTouchMoving) return;
    preventDefault(event);
    let touches = parseTouches(this.parentNode, event.touches);
    let length = touches.length;
    if (length === 2) {
      // 100ms 内变为两指，取消拖拽操作
      if (touchTimer) {
        window.clearTimeout(touchTimer);
      }
      let [a, b] = touches;
      this.setState(assign({}, this.state, {
        touchTimer: null,
        isTouchZoom: true,
        touchDistance: Math.sqrt(Math.pow((a.offsetX - b.offsetX), 2) + Math.pow((a.offsetY - b.offsetY), 2)),
      }));
      this.parentNode.addEventListener('touchmove', this._internalListeners['touchzoom']);
      this.parentNode.addEventListener('touchend', this._internalListeners['touchzoomend']);
    }
  }
  /**
   * 移动手指进行缩放
   * @memberof SimpleZoom
   * @param {event} event 
   */
  _onTouchZoom(event) {
    preventDefault(event);
    let { minZoom, maxZoom, zoomSpeed } = this.options;
    let { positionLock, zoom, translate, transformOrigin, touchZoomTimer, touchDistance } = this.state;
    let touches = parseTouches(this.parentNode, event.touches);
    let length = touches.length;
    let [a, b] = touches;
    // 必须放在 timer 前
    if (length === 1) {
      this._onTouchZoomEnd();
      return;
    }
    // 100ms 内重复触发不再执行
    if (touchZoomTimer) {
      return;
    } else {
      this.state.touchZoomTimer = setTimeout(() => {
        this.state.touchZoomTimer = null;
      }, 100);
    }
    let newTouchDistance = Math.sqrt(Math.pow((a.offsetX - b.offsetX), 2) + Math.pow((a.offsetY - b.offsetY), 2));
    let delta = (newTouchDistance / touchDistance);
    let newZoom = zoom * delta;
    // 边界情况判断
    if (newZoom < minZoom) {
      newZoom = minZoom;
    } else if (newZoom > maxZoom) {
      newZoom = maxZoom;
    } else if (Math.abs(newZoom - 1) < (zoomSpeed / 2)) {
      newZoom = 1;
    }
    // 小于等于初始缩放比例时不允许拖拽，大于初始缩放比例时需要注意不能出界
    if (newZoom <= 1) {
      positionLock = true;
      translate = { x: 0, y: 0 };
      transformOrigin = {
        x: (this.el.offsetWidth / 2),
        y: (this.el.offsetHeight / 2),
      }
    } else {
      positionLock = false;
      transformOrigin = {
        x: (a.offsetX + b.offsetX) / 2,
        y: (a.offsetY + b.offsetY) / 2,
        // 相对 el 的位置
        // x: (((a.offsetX + b.offsetX) / 2) - translate.x) / zoom,
        // x: (((a.offsetY + b.offsetY) / 2) - translate.y) / zoom,
      }
      // 判断缩放后元素有没有出界
      let margins = getMargins(this.el, newZoom, translate, transformOrigin);
      for (let side in margins) {
        if (margins[side] > 0) {
          switch (side) {
            case 'top':
              translate.y -= margins.top;
              break;
            case 'right':
              translate.x += margins.right;
              break;
            case 'bottom':
              translate.y += margins.bottom;
              break;
            case 'left':
              translate.x -= margins.left;
              break;
          }
        }
      }
    }
    this.setState(assign({}, this.state, {
      positionLock,
      zoom: newZoom,
      translate,
      transformOrigin,
      touchDistance: newTouchDistance,
    }))
  }
  /**
   * 手指抬起退出缩放模式
   * @memberof SimpleZoom
   */
  _onTouchZoomEnd() {
    this.setState(assign({}, this.state, {
      isTouchZoom: false
    }))
    this.parentNode.removeEventListener('touchmove', this._internalListeners['touchzoom']);
    this.parentNode.removeEventListener('touchmoveend', this._internalListeners['touchzoomend'])
  }
  /* 外部操作方法 */
  /**
   * 重置当前 state
   * @memberof SimpleZoom
   */
  reset() {
    let { initZoom } = this.options;
    let state = {
      // 缩放锁
      zoomLock: false,
      // 位置锁
      positionLock: true,
      // 缩放比例
      zoom: initZoom,
      // 偏移位置
      translate: { x: 0, y: 0 },
      // 暂时保存拖拽时的偏移位置
      movingTranslate: { x: 0, y: 0 },
      // 缩放中心
      transformOrigin: { x: 0, y: 0 },
      /** PC端专用 **/
      // 是否正在拖拽
      isMouseMoving: false,
      // 拖拽起点
      moveStart: { x: 0, y: 0 },
      /** 移动端专用 **/
      // 延时执行，用于判断是否为拖拽操作
      touchTimer: null,
      // 已判定为拖拽操作后不可取消
      isTouchMoving: false,
      // 已判定为缩放操作后不可取消
      isTouchZoom: false,
      // 拖拽起点
      touchStart: { x: 0, y: 0 },
      // 避免频繁触发缩放
      touchZoomTimer: null,
      // 两指间的距离
      touchDistance: 0,
    }
    if (initZoom !== 1) {
      state.transformOrigin = {
        x: (this.el.offsetWidth / 2),
        y: (this.offsetHeight / 2)
      }
    }
    this.setState(state);
  }
  /**
   * 手动更新
   * @memberof SimpleZoom
   */
  update() {
    let { zoom, translate, transformOrigin } = this.state;
    this._setTransform(zoom, translate);
    this._setTransformOrigin(transformOrigin)
  }
  /**
   * 设置 state，自动更新 dom 并抛出相应的事件
   * @memberof SimpleZoom
   * @param {object} state 
   */
  setState(state) {
    this.state = this.state || state;
    // 对比前后的 state，根据变动抛出相应的事件
    let isMoving = (state.isMouseMoving || state.isTouchMoving);
    let isZoomed = !deepCompare(this.state.zoom, state.zoom);
    let isTranslated = !deepCompare(this.state.translate, state.translate);
    let transformOriginChanged = !deepCompare(this.state.transformOrigin, state.transformOrigin);
    this.state = assign({}, this.state, state);
    // 移动过程中以及 zoom 和 translate 变更时，需要更新 style.transform
    if (isMoving) {
      this._setTransform(state.zoom, state.movingTranslate);
    } else if (isZoomed || isTranslated) {
      this._setTransform(state.zoom, state.translate);
    }
    // transformOrigin 变更需要更新 style.transformOrigin
    if (transformOriginChanged) {
      this._setTransformOrigin(state.transformOrigin);
    }
    // 触发相应的事件
    let timestamp = Date.now();
    if (isMoving || isTranslated) {
      this._excuteListeners('move', {
        type: 'move',
        data: state,
        timestamp,
      });
    }
    if (isZoomed) {
      this._excuteListeners('zoom', {
        type: 'zoom',
        data: state,
        timestamp,
      });
    }
    if (transformOriginChanged) {
      this._excuteListeners('origin-change', {
        type: 'origin-change',
        data: state,
        timestamp,
      });
    }
  }
  /* 事件监听相关方法 */
  /**
   * 绑定事件监听
   * @memberof SimpleZoom
   * @param {string} type 
   * @param {function} callback 
   */
  on(type, callback) {
    if (typeof type !== 'string') {
      throw new Error('event type must be a string')
    }
    if (typeof callback !== 'function') {
      throw new Error('event callback type must be a string')
    }
    this._onListeners[type] = callback;
  }
  /**
   * 关闭事件监听
   * @memberof SimpleZoom
   * @param {string} type 
   */
  off(type) {
    this._onListeners[type] = () => { };
  }
  /**
   * 添加事件监听
   * @memberof SimpleZoom
   * @param {string} type 
   * @param {function} callback 
   */
  addEventListener(type, callback) {
    if (typeof type !== 'string') {
      throw new Error('event type must be a string')
    }
    if (typeof callback !== 'function') {
      throw new Error('event callback type must be a string')
    }
    if (this._eventListeners[type]) {
      this._eventListeners[type].push(callback);
    } else {
      this._eventListeners[type] = [callback];
    }
  }
  /**
   * 移除事件监听
   * @memberof SimpleZoom
   * @param {string} type 
   * @param {function} callback 
   */
  removeEventListener(type, callback) {
    if (this._eventListeners[type] && this._eventListeners[type].length) {
      this._eventListeners[type] = this._eventListeners[type].filter((listener) => {
        return listener !== callback;
      })
    }
  }
}