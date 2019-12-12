/**
 * simple-zoom 1.0.0
 * https://github.com/Billbiubiu/simple-zoom
 * Author: Wuhao 
 */

import './index.css';
import * as utils from './utils';
import * as eventHandlers from './event-handlers';
const assign = Object.assign;

// 默认配置
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
      if (utils.isHTMLElement(el)) {
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
    this._on = {
      // 滚轮事件
      'mousewheel': eventHandlers.MouseWheel.bind(this),
      'DOMMouseScroll': eventHandlers.MouseWheel.bind(this),
      // 鼠标点击事件
      'mousedown': eventHandlers.MouseDown.bind(this),
      'mousemove': eventHandlers.MouseMove.bind(this),
      'mouseup': eventHandlers.MouseUp.bind(this),
      'mouseout': eventHandlers.MouseUp.bind(this),
      // 移动端拖拽事件
      'touchmovestart': eventHandlers.TouchMoveStart.bind(this),
      'touchmove': eventHandlers.TouchMove.bind(this),
      'touchmoveend': eventHandlers.TouchMoveEnd.bind(this),
      // 移动端缩放事件
      'touchzoomstart': eventHandlers.TouchZoomStart.bind(this),
      'touchzoom': eventHandlers.TouchZoom.bind(this),
      'touchzoomend': eventHandlers.TouchZoomEnd.bind(this),
    }
    // 通过 on 添加的事件
    this._onListeners = Object.create(null);
    // 通过 addEventListener 添加的事件
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
    this.el.addEventListener('mousewheel', this._on['mousewheel'])
    this.el.addEventListener('DOMMouseScroll', this._on['DOMMouseScroll'])
    this.el.addEventListener('mousedown', this._on['mousedown']);
    this.parentNode.addEventListener('touchstart', this._on['touchmovestart']);
    this.parentNode.addEventListener('touchstart', this._on['touchzoomstart']);
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
  _dispatchEvent(type, event) {
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
    let isZoomed = !utils.deepCompare(this.state.zoom, state.zoom);
    let isTranslated = !utils.deepCompare(this.state.translate, state.translate);
    let transformOriginChanged = !utils.deepCompare(this.state.transformOrigin, state.transformOrigin);
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
      this._dispatchEvent('move', {
        type: 'move',
        data: state,
        timestamp,
      });
    }
    if (isZoomed) {
      this._dispatchEvent('zoom', {
        type: 'zoom',
        data: state,
        timestamp,
      });
    }
    if (transformOriginChanged) {
      this._dispatchEvent('origin-change', {
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