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
  zoomable: true, // 锁定 zoom
  dragable: true, // 锁定 position
  initZoom: 1,    // 原始缩放比例
  minZoom: 1,   // 最小缩放比例
  maxZoom: 5,    // 最大缩放比例
  zoomSpeed: 0.1, // 默认缩放速度
  padding: 0,     // 最大内边距
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
        throw new Error('target is not found!');
      }
    } else if (typeof el == 'object') {
      if (utils.isHTMLElement(el)) {
        this.el = el;
      } else {
        throw new Error('target is not HTMLElement!');
      }
    }
    // 设置父元素样式
    if (this.el.parentNode && this.el.parentNode.tagName) {
      this.parentNode = this.el.parentNode;
      this.parentNode.classList.add('simple-zoom-container');
    } else {
      throw new Error('target can not be root-element!');
    }
    if (typeof options !== 'object') {
      throw new Error('options is supposed to be an object!')
    }
    // 覆盖默认的配置
    this.options = assign({}, DEFAULTOPTIONS, options);
    // 不允许 padding 超过宽高的一半
    this.options.padding = Math.min((this.el.clientWidth / 2), (this.el.clientHeight / 2), this.options.padding);
    // 不允许 initZoom 超过范围
    this.options.initZoom = Math.max(Math.max(this.options.minZoom, this.options.initZoom), Math.min(this.options.maxZoom, this.options.initZoom));
    // 根据 options 添加 class
    let classList = this.el.classList;
    classList.add('simple-zoom-el');
    if(!this.options.zoomable) classList.add('zoom-locked');
    if(!this.options.dragable) classList.add('drag-locked');
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
    // 根据配置确定是否启用缩放和拖拽
    let { zoomable, dragable } = this.options;
    if (zoomable) {
      this.el.addEventListener('mousewheel', this._on['mousewheel']);
      this.el.addEventListener('DOMMouseScroll', this._on['DOMMouseScroll']);
      this.parentNode.addEventListener('touchstart', this._on['touchzoomstart']);
    }
    if (dragable) {
      this.el.addEventListener('mousedown', this._on['mousedown']);
      this.parentNode.addEventListener('touchstart', this._on['touchmovestart']);
    }
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
  /**
   * 重置当前 state
   * @memberof SimpleZoom
   */
  reset() {
    let { zoomable, dragable, initZoom } = this.options;
    let state = {
      // 缩放锁
      zoomable: zoomable,
      // 位置锁
      dragable: dragable,
      // 缩放比例
      zoom: initZoom,
      // 偏移位置
      translate: { x: 0, y: 0 },
      // 暂时保存拖拽时的偏移位置
      movingTranslate: { x: 0, y: 0 },
      // 缩放中心
      transformOrigin: { 
        x: (this.el.offsetWidth / 2),
        y: (this.el.offsetHeight / 2)
      },
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
    if (initZoom <= 1) {
      state.dragable = false;
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
    let isMoved = (state.isMouseMoving || state.isTouchMoving);
    let isZoomed = !utils.deepCompare(this.state.zoom, state.zoom);
    let isTranslated = !utils.deepCompare(this.state.translate, state.translate);
    let transformOriginChanged = !utils.deepCompare(this.state.transformOrigin, state.transformOrigin);
    this.state = assign({}, this.state, state);
    // 移动过程中以及 zoom 和 translate 变更时，需要更新 style.transform
    if (isMoved) {
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
    if (isMoved || isTranslated) {
      this._dispatchEvent('move', {
        type: 'move',
        data: state,
        timestamp,
      });
    }
    if (isZoomed || transformOriginChanged) {
      this._dispatchEvent('zoom', {
        type: 'zoom',
        data: state,
        timestamp,
      });
    }
  }
  get state() {
    return this._state;
  }
  set state(state) {
    // 以 option 的配置为标准
    state.zoomable = (state.zoomable && this.options.zoomable);
    state.dragable = (state.dragable && this.options.dragable);
    this._state = state;
  }
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
  subscribe(instance) {
    if(instance && instance instanceof SimpleZoom) {
      instance.addEventListener('move', (event) => {
        this.setState(event.data)
      })
      instance.addEventListener('zoom', (event) => {
        this.setState(event.data)
      })
    }
  }
}