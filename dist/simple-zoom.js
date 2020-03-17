(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SimpleZoom"] = factory();
	else
		root["SimpleZoom"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/event-handlers.js":
/*!*******************************!*\
  !*** ./src/event-handlers.js ***!
  \*******************************/
/*! exports provided: MouseWheel, MouseDown, MouseMove, MouseUp, TouchMoveStart, TouchMove, TouchMoveEnd, TouchZoomStart, TouchZoom, TouchZoomEnd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MouseWheel", function() { return MouseWheel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MouseDown", function() { return MouseDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MouseMove", function() { return MouseMove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MouseUp", function() { return MouseUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TouchMoveStart", function() { return TouchMoveStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TouchMove", function() { return TouchMove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TouchMoveEnd", function() { return TouchMoveEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TouchZoomStart", function() { return TouchZoomStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TouchZoom", function() { return TouchZoom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TouchZoomEnd", function() { return TouchZoomEnd; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");

const assign = Object.assign;

/**
 * 鼠标滚轮缩放
 * @param {event} event 
 */
function MouseWheel(event) {
  // 获取配置
  let { minZoom, maxZoom, zoomSpeed } = this.options;
  let { zoomable, dragable, zoom, translate, transformOrigin } = this.state;
  if (!zoomable) return;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["preventDefault"])(event);
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["cancelBubble"])(event);
  // 获取鼠标相对左上角的位置
  let { offsetX, offsetY } = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getOffset"])(event, this.el);
  // 根据缩放幅度和缩放速度计算缩放比例
  let delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail)) * zoomSpeed;
  let newZoom = zoom + delta;
  // 边界情况判断，开启回弹效果
  if (newZoom < minZoom) {
    newZoom = Math.max(minZoom - zoomSpeed, 0);
    setTimeout(() => {
      this.setState(assign({}, this.state, {
        zoom: minZoom
      }));
    }, 200);
  } else if (newZoom > maxZoom) {
    newZoom = maxZoom + zoomSpeed;
    setTimeout(() => {
      this.setState(assign({}, this.state, {
        zoom: maxZoom
      }));
    }, 200);
  } else if (Math.abs(newZoom - 1) < zoomSpeed / 2) {
    newZoom = 1;
  }
  // 小于等于初始缩放比例时不允许拖拽，大于初始缩放比例时需要注意不能出界
  if (newZoom <= 1) {
    dragable = false;
    translate = { x: 0, y: 0 };
    transformOrigin = {
      x: this.el.clientWidth / 2,
      y: this.el.clientHeight / 2
    };
  } else {
    dragable = true;
    // 避免直接修改原对象
    translate = {
      x: translate.x,
      y: translate.y
    };
    transformOrigin = {
      x: offsetX,
      y: offsetY
    };
    // 判断缩放后元素有没有出界
    let bounds = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getBounds"])(this.el, newZoom, translate, transformOrigin);
    for (let side in bounds) {
      if (bounds[side] > 0) {
        switch (side) {
          case 'top':
            translate.y -= bounds.top;
            break;
          case 'right':
            translate.x += bounds.right;
            break;
          case 'bottom':
            translate.y += bounds.bottom;
            break;
          case 'left':
            translate.x -= bounds.left;
            break;
        }
      }
    }
  }
  this.setState(assign({}, this.state, {
    dragable,
    zoom: newZoom,
    translate,
    transformOrigin
  }));
}
/**
 * 鼠标点击进入拖拽模式
 * @param {event} event 
 */
function MouseDown(event) {
  let { dragable, translate } = this.state;
  if (!dragable) return;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["preventDefault"])(event);
  let { clientX, clientY } = event;
  this.setState(assign({}, this.state, {
    isMouseMoving: true,
    moveStart: {
      x: clientX,
      y: clientY
    },
    movingTranslate: assign({}, translate)
  }));
  // 修改cursor样式
  this.el.classList.add('move');
  this.el.addEventListener('mousemove', this._on['mousemove']);
  this.el.addEventListener('mouseup', this._on['mouseup']);
  this.el.addEventListener('mouseout', this._on['mouseout']);
}
/**
 * 移动鼠标进行拖拽
 * @param {event} event 
 */
function MouseMove(event) {
  let { padding } = this.options;
  let { zoom, translate, transformOrigin, moveStart } = this.state;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["preventDefault"])(event);
  let { clientX, clientY } = event;
  // 计算移动后的 translate
  let newMovingTranslate = {
    x: translate.x + (clientX - moveStart.x),
    y: translate.y + (clientY - moveStart.y)
    // 判断拖拽后元素有没有出界
  };let bounds = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getBounds"])(this.el, zoom, newMovingTranslate, transformOrigin);
  for (let side in bounds) {
    if (bounds[side] > padding) {
      switch (side) {
        case 'top':
          newMovingTranslate.y = transformOrigin.y * (zoom - 1) + padding;
          break;
        case 'right':
          newMovingTranslate.x = (this.el.clientWidth - transformOrigin.x) * (1 - zoom) - padding;
          break;
        case 'bottom':
          newMovingTranslate.y = (this.el.clientHeight - transformOrigin.y) * (1 - zoom) - padding;
          break;
        case 'left':
          newMovingTranslate.x = transformOrigin.x * (zoom - 1) + padding;
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
 */
function MouseUp() {
  let { movingTranslate } = this.state;
  this.setState(assign({}, this.state, {
    translate: assign({}, movingTranslate),
    isMouseMoving: false
  }));
  this.el.classList.remove('move');
  this.el.removeEventListener('mousemove', this._on['mousemove']);
  this.el.removeEventListener('mouseup', this._on['mouseup']);
  this.el.removeEventListener('mouseout', this._on['mouseout']);
}
/* 移动端适配 */
/**
 * 单指 touch 进入拖拽模式
 * @param {event} event 
 */
function TouchMoveStart(event) {
  let { dragable, isTouchZoom, translate } = this.state;
  // 如果位置被锁定或已进入拖拽模式，直接返回
  if (!dragable || isTouchZoom) return;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["preventDefault"])(event);
  let touches = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseTouches"])(this.parentNode, event.touches);
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
      this.parentNode.addEventListener('touchmove', this._on['touchmove']);
      this.parentNode.addEventListener('touchend', this._on['touchmoveend']);
    }, 100);
  }
}
/**
 * 移动手指进行拖拽
 * @param {event} event 
 */
function TouchMove(event) {
  let { padding } = this.options;
  let { zoom, translate, touchStart, movingTranslate, transformOrigin } = this.state;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["preventDefault"])(event);
  let touches = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseTouches"])(this.parentNode, event.touches);
  let { clientX, clientY } = touches[0];
  let newMovingTranslate = {
    x: translate.x + (clientX - touchStart.x),
    y: translate.y + (clientY - touchStart.y)
    // 判断拖拽后元素有没有出界
  };let bounds = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getBounds"])(this.el, zoom, newMovingTranslate, transformOrigin);
  for (let side in bounds) {
    if (bounds[side] > padding) {
      switch (side) {
        case 'top':
          newMovingTranslate.y = transformOrigin.y * (zoom - 1) + padding;
          break;
        case 'right':
          newMovingTranslate.x = (this.el.clientWidth - transformOrigin.x) * (1 - zoom) - padding;
          break;
        case 'bottom':
          newMovingTranslate.y = (this.el.clientHeight - transformOrigin.y) * (1 - zoom) - padding;
          break;
        case 'left':
          newMovingTranslate.x = transformOrigin.x * (zoom - 1) + padding;
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
 */
function TouchMoveEnd() {
  let { movingTranslate } = this.state;
  this.setState(assign({}, this.state, {
    translate: assign({}, movingTranslate),
    isTouchMoving: false
  }));
  this.parentNode.removeEventListener('touchmove', this._on['touchmove']);
  this.parentNode.removeEventListener('touchend', this._on['touchmoveend']);
}
/**
 * 双指 touch 进入缩放模式
 * @param {event} event 
 */
function TouchZoomStart(event) {
  let { zoomable, touchTimer, isTouchMoving } = this.state;
  if (!zoomable || isTouchMoving) return;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["preventDefault"])(event);
  let touches = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseTouches"])(this.parentNode, event.touches);
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
      touchDistance: Math.sqrt(Math.pow(a.offsetX - b.offsetX, 2) + Math.pow(a.offsetY - b.offsetY, 2))
    }));
    this.parentNode.addEventListener('touchmove', this._on['touchzoom']);
    this.parentNode.addEventListener('touchend', this._on['touchzoomend']);
  }
}
/**
 * 移动手指进行缩放
 * @param {event} event 
 */
function TouchZoom(event) {
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["preventDefault"])(event);
  let { minZoom, maxZoom, zoomSpeed } = this.options;
  let { dragable, zoom, translate, transformOrigin, touchZoomTimer, touchDistance } = this.state;
  let touches = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseTouches"])(this.parentNode, event.touches);
  let length = touches.length;
  let [a, b] = touches;
  // 必须放在 timer 前
  if (length === 1) {
    this._on.onTouchZoomEnd();
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
  let newTouchDistance = Math.sqrt(Math.pow(a.offsetX - b.offsetX, 2) + Math.pow(a.offsetY - b.offsetY, 2));
  let delta = newTouchDistance / touchDistance;
  let newZoom = zoom * delta;
  // 边界情况判断
  if (newZoom < minZoom) {
    newZoom = minZoom;
  } else if (newZoom > maxZoom) {
    newZoom = maxZoom;
  } else if (Math.abs(newZoom - 1) < zoomSpeed / 2) {
    newZoom = 1;
  }
  // 小于等于 1 时不允许拖拽，大于 1 时需要注意不能出界
  if (newZoom <= 1) {
    dragable = false;
    translate = { x: 0, y: 0 };
    transformOrigin = {
      x: this.el.clientWidth / 2,
      y: this.el.clientHeight / 2
    };
  } else {
    dragable = true;
    // 避免直接修改原对象
    translate = {
      x: translate.x,
      y: translate.y
    };
    transformOrigin = {
      x: (a.offsetX + b.offsetX) / 2,
      y: (a.offsetY + b.offsetY) / 2
    };
    // 判断缩放后元素有没有出界
    let bounds = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getBounds"])(this.el, newZoom, translate, transformOrigin);
    for (let side in bounds) {
      if (bounds[side] > 0) {
        switch (side) {
          case 'top':
            translate.y -= bounds.top;
            break;
          case 'right':
            translate.x += bounds.right;
            break;
          case 'bottom':
            translate.y += bounds.bottom;
            break;
          case 'left':
            translate.x -= bounds.left;
            break;
        }
      }
    }
  }
  this.setState(assign({}, this.state, {
    dragable,
    zoom: newZoom,
    translate,
    transformOrigin,
    touchDistance: newTouchDistance
  }));
}
/**
 * 手指抬起退出缩放模式
 */
function TouchZoomEnd() {
  this.setState(assign({}, this.state, {
    isTouchZoom: false
  }));
  this.parentNode.removeEventListener('touchmove', this._on['touchzoom']);
  this.parentNode.removeEventListener('touchmoveend', this._on['touchzoomend']);
}



/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SimpleZoom; });
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _event_handlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event-handlers */ "./src/event-handlers.js");
/**
 * simple-zoom 1.0.0
 * https://github.com/Billbiubiu/simple-zoom
 * Author: Wuhao 
 */





const assign = Object.assign;

// 默认配置
const DEFAULTOPTIONS = {
  zoomable: true, // 锁定 zoom
  dragable: true, // 锁定 position
  initZoom: 1, // 原始缩放比例
  minZoom: 1, // 最小缩放比例
  maxZoom: 5, // 最大缩放比例
  zoomSpeed: 0.1, // 默认缩放速度
  padding: 0 // 最大内边距
};

class SimpleZoom {
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
      if (_utils__WEBPACK_IMPORTED_MODULE_1__["isHTMLElement"](el)) {
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
      throw new Error('options is supposed to be an object!');
    }
    // 覆盖默认的配置
    this.options = assign({}, DEFAULTOPTIONS, options);
    // 不允许 padding 超过宽高的一半
    this.options.padding = Math.min(this.el.clientWidth / 2, this.el.clientHeight / 2, this.options.padding);
    // 不允许 initZoom 超过范围
    this.options.initZoom = Math.max(Math.max(this.options.minZoom, this.options.initZoom), Math.min(this.options.maxZoom, this.options.initZoom));
    // 根据 options 添加 class
    let classList = this.el.classList;
    classList.add('simple-zoom-el');
    if (!this.options.zoomable) classList.add('zoom-locked');
    if (!this.options.dragable) classList.add('drag-locked');
    // 保存事件处理函数，方便移除时使用
    this._on = {
      // 滚轮事件
      'mousewheel': _event_handlers__WEBPACK_IMPORTED_MODULE_2__["MouseWheel"].bind(this),
      'DOMMouseScroll': _event_handlers__WEBPACK_IMPORTED_MODULE_2__["MouseWheel"].bind(this),
      // 鼠标点击事件
      'mousedown': _event_handlers__WEBPACK_IMPORTED_MODULE_2__["MouseDown"].bind(this),
      'mousemove': _event_handlers__WEBPACK_IMPORTED_MODULE_2__["MouseMove"].bind(this),
      'mouseup': _event_handlers__WEBPACK_IMPORTED_MODULE_2__["MouseUp"].bind(this),
      'mouseout': _event_handlers__WEBPACK_IMPORTED_MODULE_2__["MouseUp"].bind(this),
      // 移动端拖拽事件
      'touchmovestart': _event_handlers__WEBPACK_IMPORTED_MODULE_2__["TouchMoveStart"].bind(this),
      'touchmove': _event_handlers__WEBPACK_IMPORTED_MODULE_2__["TouchMove"].bind(this),
      'touchmoveend': _event_handlers__WEBPACK_IMPORTED_MODULE_2__["TouchMoveEnd"].bind(this),
      // 移动端缩放事件
      'touchzoomstart': _event_handlers__WEBPACK_IMPORTED_MODULE_2__["TouchZoomStart"].bind(this),
      'touchzoom': _event_handlers__WEBPACK_IMPORTED_MODULE_2__["TouchZoom"].bind(this),
      'touchzoomend': _event_handlers__WEBPACK_IMPORTED_MODULE_2__["TouchZoomEnd"].bind(this)
      // 通过 on 添加的事件
    };this._onListeners = Object.create(null);
    // 通过 addEventListener 添加的事件
    this._eventListeners = Object.create(null);
    // 初始化
    this._init();
  }
  /**
   * 初始化 state 和事件监听
   * @memberof SimpleZoom
   * @instance
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
   * @instance
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
   * @instance
   * @param {object} transformOrigin 
   */
  _setTransformOrigin(transformOrigin) {
    let { x, y } = transformOrigin;
    this.el.style.transformOrigin = `${x}px ${y}px`;
  }
  /**
   * 执行已有的事件监听
   * @memberof SimpleZoom
   * @instance
   * @param {string} type 
   * @param {event} event 
   */
  _dispatchEvent(type, data) {
    let event = {
      type,
      data,
      timestamp: Date.now()
    };
    if (this._onListeners[type]) {
      try {
        this._onListeners[type](event);
      } catch (error) {
        console.warn(error);
      }
    }
    if (this._eventListeners[type] && this._eventListeners[type].length) {
      this._eventListeners[type].forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          console.warn(error);
        }
      });
    }
  }
  /**
   * 重置当前 state
   * @memberof SimpleZoom
   * @instance
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
        x: this.el.clientWidth / 2,
        y: this.el.clientHeight / 2
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
      touchDistance: 0
    };
    if (initZoom <= 1) {
      state.dragable = false;
    }
    this.setState(state);
  }
  /**
   * 手动更新实例
   * @memberof SimpleZoom
   * @instance
   */
  update() {
    let { zoom, translate, transformOrigin } = this.state;
    this._setTransform(zoom, translate);
    this._setTransformOrigin(transformOrigin);
  }
  /**
   * 销毁当前实例
   * @memberof SimpleZoom
   * @instance
   */
  destroy() {
    let { zoomable, dragable } = this.options;
    if (zoomable) {
      this.el.removeEventListener('mousewheel', this._on['mousewheel']);
      this.el.removeEventListener('DOMMouseScroll', this._on['DOMMouseScroll']);
      this.parentNode.removeEventListener('touchstart', this._on['touchzoomstart']);
    }
    if (dragable) {
      this.el.removeEventListener('mousedown', this._on['mousedown']);
      this.parentNode.removeEventListener('touchstart', this._on['touchmovestart']);
    }
  }
  /**
   * 设置 state，自动更新 dom 并抛出相应的事件
   * @memberof SimpleZoom
   * @instance
   * @param {object} state 
   */
  setState(state) {
    this.state = this.state || state;
    // 对比前后的 state，根据变动抛出相应的事件
    let isMoved = state.isMouseMoving || state.isTouchMoving;
    let isZoomed = !_utils__WEBPACK_IMPORTED_MODULE_1__["deepCompare"](this.state.zoom, state.zoom);
    let isTranslated = !_utils__WEBPACK_IMPORTED_MODULE_1__["deepCompare"](this.state.translate, state.translate);
    let transformOriginChanged = !_utils__WEBPACK_IMPORTED_MODULE_1__["deepCompare"](this.state.transformOrigin, state.transformOrigin);
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
    if (isMoved || isTranslated) {
      this._dispatchEvent('move', state);
    }
    if (isZoomed || transformOriginChanged) {
      this._dispatchEvent('zoom', state);
    }
    this._dispatchEvent('updated', state);
  }
  /**
   * 绑定事件监听
   * @memberof SimpleZoom
   * @instance
   * @param {string} type 
   * @param {function} callback 
   */
  on(type, callback) {
    if (typeof type !== 'string') {
      throw new Error('event type must be a string');
    }
    if (typeof callback !== 'function') {
      throw new Error('event callback type must be a string');
    }
    this._onListeners[type] = callback;
  }
  /**
   * 关闭事件监听
   * @memberof SimpleZoom
   * @instance
   * @param {string} type 
   */
  off(type) {
    this._onListeners[type] = () => {};
  }
  /**
   * 添加事件监听
   * @memberof SimpleZoom
   * @instance
   * @param {string} type 
   * @param {function} callback 
   */
  addEventListener(type, callback) {
    if (typeof type !== 'string') {
      throw new Error('event type must be a string');
    }
    if (typeof callback !== 'function') {
      throw new Error('event callback type must be a string');
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
   * @instance
   * @param {string} type 
   * @param {function} callback 
   */
  removeEventListener(type, callback) {
    if (this._eventListeners[type] && this._eventListeners[type].length) {
      this._eventListeners[type] = this._eventListeners[type].filter(listener => {
        return listener !== callback;
      });
    }
  }
  /**
   * 订阅已有实例，同步缩放
   * @memberof SimpleZoom
   * @instance
   * @param {*} instance 
   */
  subscribe(instance) {
    if (instance && instance instanceof SimpleZoom) {
      instance.addEventListener('updated', event => {
        this.setState(event.data);
      });
    }
  }
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: isHTMLElement, preventDefault, cancelBubble, deepCompare, parseTouches, getBounds, getOffset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHTMLElement", function() { return isHTMLElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preventDefault", function() { return preventDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelBubble", function() { return cancelBubble; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepCompare", function() { return deepCompare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTouches", function() { return parseTouches; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBounds", function() { return getBounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOffset", function() { return getOffset; });
/**
 * 判断是否为 HTMLElement
 * @param {*} obj 
 */
function isHTMLElement(element) {
  if (typeof HTMLElement === 'object') {
    return element instanceof HTMLElement;
  } else {
    return element && typeof element === 'object' && element.nodeType === 1 && typeof element.nodeName === 'string';
  }
}
/**
 * 取消默认事件
 * @param {event} event 
 */
function preventDefault(event) {
  // 获取事件
  event = event || window.event;
  // 取消默认行为
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  };
}
/**
 * 取消事件冒泡
 * @param {event} event 
 */
function cancelBubble(event) {
  // 获取事件
  event = event || window.event;
  // 取消事件冒泡
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  };
}
/**
 * 判断参数是否相同
 * @param {*} a 
 * @param {*} b 
 */
function deepCompare(a, b) {
  if (typeof a !== typeof b) {
    throw new Error('compare failed, not the same type');
  }
  let type = typeof a;
  if (type !== 'object') {
    return a === b;
  } else {
    for (let key in a) {
      let type = typeof a[key];
      if (type !== 'object') {
        if (a[key] !== b[key]) {
          return false;
        }
      } else {
        deepCompare(a[key], b[key]);
      }
    }
    return true;
  }
}
/**
 * touch 事件属性无法解构赋值，也没有 offsetX 和offsetY ，需要进行格式化
 * @param {HTMLElement} element 
 * @param {array} touches 
 */
function parseTouches(element, touches) {
  let { clientTop, clientLeft } = element;
  return Array.from(touches).map(d => ({
    clientX: d.clientX,
    clientY: d.clientY,
    force: d.force,
    identifier: d.identifier,
    pageX: d.pageX,
    pageY: d.pageY,
    radiusX: d.radiusX,
    radiusY: d.radiusY,
    rotationAngle: d.rotationAngle,
    screenX: d.screenX,
    screenY: d.screenY,
    offsetX: d.clientX - clientTop,
    offsetY: d.clientY - clientLeft
  }));
}
/**
 * 获取元素距离四边的距离
 * @param {HTMLElement} element 
 * @param {number} zoom 
 * @param {object} translate 
 * @param {object} transformOrigin 
 */
function getBounds(element, zoom, translate, transformOrigin) {
  let { clientWidth, clientHeight } = element;
  return {
    top: translate.y - transformOrigin.y * (zoom - 1),
    right: (clientWidth - transformOrigin.x) * (1 - zoom) - translate.x,
    bottom: (clientHeight - transformOrigin.y) * (1 - zoom) - translate.y,
    left: translate.x - transformOrigin.x * (zoom - 1)
  };
}
function getOffset(event, element) {
  let { target, offsetX, offsetY } = event;
  if (target instanceof SVGElement || element instanceof SVGElement) {
    return {
      offsetX,
      offsetY
    };
  } else {
    while (target !== element) {
      offsetX += target.offsetLeft;
      offsetY += target.offsetTop;
      target = target.offsetParent;
    }
    return {
      offsetX,
      offsetY
    };
  }
}



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaW1wbGVab29tL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TaW1wbGVab29tL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NpbXBsZVpvb20vLi9zcmMvZXZlbnQtaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vU2ltcGxlWm9vbS8uL3NyYy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vU2ltcGxlWm9vbS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9TaW1wbGVab29tLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbImFzc2lnbiIsIk9iamVjdCIsIk1vdXNlV2hlZWwiLCJldmVudCIsIm1pblpvb20iLCJtYXhab29tIiwiem9vbVNwZWVkIiwib3B0aW9ucyIsInpvb21hYmxlIiwiZHJhZ2FibGUiLCJ6b29tIiwidHJhbnNsYXRlIiwidHJhbnNmb3JtT3JpZ2luIiwic3RhdGUiLCJwcmV2ZW50RGVmYXVsdCIsImNhbmNlbEJ1YmJsZSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiZ2V0T2Zmc2V0IiwiZWwiLCJkZWx0YSIsIk1hdGgiLCJtYXgiLCJtaW4iLCJ3aGVlbERlbHRhIiwiZGV0YWlsIiwibmV3Wm9vbSIsInNldFRpbWVvdXQiLCJzZXRTdGF0ZSIsImFicyIsIngiLCJ5IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJib3VuZHMiLCJnZXRCb3VuZHMiLCJzaWRlIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwiTW91c2VEb3duIiwiY2xpZW50WCIsImNsaWVudFkiLCJpc01vdXNlTW92aW5nIiwibW92ZVN0YXJ0IiwibW92aW5nVHJhbnNsYXRlIiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9vbiIsIk1vdXNlTW92ZSIsInBhZGRpbmciLCJuZXdNb3ZpbmdUcmFuc2xhdGUiLCJNb3VzZVVwIiwicmVtb3ZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlRvdWNoTW92ZVN0YXJ0IiwiaXNUb3VjaFpvb20iLCJ0b3VjaGVzIiwicGFyc2VUb3VjaGVzIiwicGFyZW50Tm9kZSIsImxlbmd0aCIsInRvdWNoVGltZXIiLCJ0b3VjaCIsImlzVG91Y2hNb3ZpbmciLCJ0b3VjaFN0YXJ0IiwiVG91Y2hNb3ZlIiwiVG91Y2hNb3ZlRW5kIiwiVG91Y2hab29tU3RhcnQiLCJ3aW5kb3ciLCJjbGVhclRpbWVvdXQiLCJhIiwiYiIsInRvdWNoRGlzdGFuY2UiLCJzcXJ0IiwicG93IiwiVG91Y2hab29tIiwidG91Y2hab29tVGltZXIiLCJvblRvdWNoWm9vbUVuZCIsIm5ld1RvdWNoRGlzdGFuY2UiLCJUb3VjaFpvb21FbmQiLCJERUZBVUxUT1BUSU9OUyIsImluaXRab29tIiwiU2ltcGxlWm9vbSIsImNvbnN0cnVjdG9yIiwiRXJyb3IiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ1dGlscyIsInRhZ05hbWUiLCJldmVudEhhbmRsZXJzIiwiYmluZCIsIl9vbkxpc3RlbmVycyIsImNyZWF0ZSIsIl9ldmVudExpc3RlbmVycyIsIl9pbml0IiwicmVzZXQiLCJ1cGRhdGUiLCJfc2V0VHJhbnNmb3JtIiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJfc2V0VHJhbnNmb3JtT3JpZ2luIiwiX2Rpc3BhdGNoRXZlbnQiLCJ0eXBlIiwiZGF0YSIsInRpbWVzdGFtcCIsIkRhdGUiLCJub3ciLCJlcnJvciIsImNvbnNvbGUiLCJ3YXJuIiwiZm9yRWFjaCIsImxpc3RlbmVyIiwiZGVzdHJveSIsImlzTW92ZWQiLCJpc1pvb21lZCIsImlzVHJhbnNsYXRlZCIsInRyYW5zZm9ybU9yaWdpbkNoYW5nZWQiLCJvbiIsImNhbGxiYWNrIiwib2ZmIiwicHVzaCIsImZpbHRlciIsInN1YnNjcmliZSIsImluc3RhbmNlIiwiaXNIVE1MRWxlbWVudCIsImVsZW1lbnQiLCJIVE1MRWxlbWVudCIsIm5vZGVUeXBlIiwibm9kZU5hbWUiLCJyZXR1cm5WYWx1ZSIsInN0b3BQcm9wYWdhdGlvbiIsImRlZXBDb21wYXJlIiwia2V5IiwiY2xpZW50VG9wIiwiY2xpZW50TGVmdCIsIkFycmF5IiwiZnJvbSIsIm1hcCIsImQiLCJmb3JjZSIsImlkZW50aWZpZXIiLCJwYWdlWCIsInBhZ2VZIiwicmFkaXVzWCIsInJhZGl1c1kiLCJyb3RhdGlvbkFuZ2xlIiwic2NyZWVuWCIsInNjcmVlblkiLCJ0YXJnZXQiLCJTVkdFbGVtZW50Iiwib2Zmc2V0TGVmdCIsIm9mZnNldFRvcCIsIm9mZnNldFBhcmVudCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQSxNQUFNQSxTQUFTQyxPQUFPRCxNQUF0Qjs7QUFFQTs7OztBQUlBLFNBQVNF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bUIsQ0FBVixHQUFlbEIsZ0JBQWdCa0IsQ0FBaEIsSUFBcUJwQixPQUFPLENBQTVCO0FBSmhCLEdBQVA7QUFNRDtBQUNELFNBQVNRLFNBQVQsQ0FBbUJmLEtBQW5CLEVBQTBCNEgsT0FBMUIsRUFBbUM7QUFDakMsTUFBSSxFQUFDdUIsTUFBRCxFQUFTdEksT0FBVCxFQUFrQkMsT0FBbEIsS0FBNkJkLEtBQWpDO0FBQ0EsTUFBR21KLGtCQUFrQkMsVUFBbEIsSUFBZ0N4QixtQkFBbUJ3QixVQUF0RCxFQUFrRTtBQUNoRSxXQUFPO0FBQ0x2SSxhQURLO0FBRUxDO0FBRkssS0FBUDtBQUlELEdBTEQsTUFLTTtBQUNKLFdBQU1xSSxXQUFXdkIsT0FBakIsRUFBMEI7QUFDeEIvRyxpQkFBV3NJLE9BQU9FLFVBQWxCO0FBQ0F2SSxpQkFBV3FJLE9BQU9HLFNBQWxCO0FBQ0FILGVBQVNBLE9BQU9JLFlBQWhCO0FBQ0Q7QUFDRCxXQUFPO0FBQ0wxSSxhQURLO0FBRUxDO0FBRkssS0FBUDtBQUlEO0FBQ0YiLCJmaWxlIjoic2ltcGxlLXpvb20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTaW1wbGVab29tXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNpbXBsZVpvb21cIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHtcclxuICBwcmV2ZW50RGVmYXVsdCxcclxuICBjYW5jZWxCdWJibGUsXHJcbiAgcGFyc2VUb3VjaGVzLFxyXG4gIGdldEJvdW5kcyxcclxuICBnZXRPZmZzZXRcclxufSBmcm9tICcuL3V0aWxzJztcclxuY29uc3QgYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcclxuXHJcbi8qKlxyXG4gKiDpvKDmoIfmu5rova7nvKnmlL5cclxuICogQHBhcmFtIHtldmVudH0gZXZlbnQgXHJcbiAqL1xyXG5mdW5jdGlvbiBNb3VzZVdoZWVsKGV2ZW50KSB7XHJcbiAgLy8g6I635Y+W6YWN572uXHJcbiAgbGV0IHsgbWluWm9vbSwgbWF4Wm9vbSwgem9vbVNwZWVkIH0gPSB0aGlzLm9wdGlvbnM7XHJcbiAgbGV0IHsgem9vbWFibGUsIGRyYWdhYmxlLCB6b29tLCB0cmFuc2xhdGUsIHRyYW5zZm9ybU9yaWdpbiB9ID0gdGhpcy5zdGF0ZTtcclxuICBpZiAoIXpvb21hYmxlKSByZXR1cm47XHJcbiAgcHJldmVudERlZmF1bHQoZXZlbnQpO1xyXG4gIGNhbmNlbEJ1YmJsZShldmVudCk7XHJcbiAgLy8g6I635Y+W6byg5qCH55u45a+55bem5LiK6KeS55qE5L2N572uXHJcbiAgbGV0IHtvZmZzZXRYLCBvZmZzZXRZfSA9IGdldE9mZnNldChldmVudCwgdGhpcy5lbCk7XHJcbiAgLy8g5qC55o2u57yp5pS+5bmF5bqm5ZKM57yp5pS+6YCf5bqm6K6h566X57yp5pS+5q+U5L6LXHJcbiAgbGV0IGRlbHRhID0gTWF0aC5tYXgoLTEsIE1hdGgubWluKDEsIChldmVudC53aGVlbERlbHRhIHx8IC1ldmVudC5kZXRhaWwpKSkgKiB6b29tU3BlZWQ7XHJcbiAgbGV0IG5ld1pvb20gPSB6b29tICsgZGVsdGE7XHJcbiAgLy8g6L6555WM5oOF5Ya15Yik5pat77yM5byA5ZCv5Zue5by55pWI5p6cXHJcbiAgaWYgKG5ld1pvb20gPCBtaW5ab29tKSB7XHJcbiAgICBuZXdab29tID0gTWF0aC5tYXgobWluWm9vbSAtem9vbVNwZWVkLCAwKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKGFzc2lnbih7fSwgdGhpcy5zdGF0ZSwge1xyXG4gICAgICAgIHpvb206IG1pblpvb21cclxuICAgICAgfSkpXHJcbiAgICB9LCAyMDApXHJcbiAgfSBlbHNlIGlmIChuZXdab29tID4gbWF4Wm9vbSkge1xyXG4gICAgbmV3Wm9vbSA9IG1heFpvb20gKyB6b29tU3BlZWQ7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZShhc3NpZ24oe30sIHRoaXMuc3RhdGUsIHtcclxuICAgICAgICB6b29tOiBtYXhab29tXHJcbiAgICAgIH0pKVxyXG4gICAgfSwgMjAwKVxyXG4gIH0gZWxzZSBpZiAoTWF0aC5hYnMobmV3Wm9vbSAtIDEpIDwgKHpvb21TcGVlZCAvIDIpKSB7XHJcbiAgICBuZXdab29tID0gMTtcclxuICB9XHJcbiAgLy8g5bCP5LqO562J5LqO5Yid5aeL57yp5pS+5q+U5L6L5pe25LiN5YWB6K645ouW5ou977yM5aSn5LqO5Yid5aeL57yp5pS+5q+U5L6L5pe26ZyA6KaB5rOo5oSP5LiN6IO95Ye655WMXHJcbiAgaWYgKG5ld1pvb20gPD0gMSkge1xyXG4gICAgZHJhZ2FibGUgPSBmYWxzZTtcclxuICAgIHRyYW5zbGF0ZSA9IHsgeDogMCwgeTogMCB9O1xyXG4gICAgdHJhbnNmb3JtT3JpZ2luID0ge1xyXG4gICAgICB4OiAodGhpcy5lbC5jbGllbnRXaWR0aCAvIDIpLFxyXG4gICAgICB5OiAodGhpcy5lbC5jbGllbnRIZWlnaHQgLyAyKSxcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgZHJhZ2FibGUgPSB0cnVlO1xyXG4gICAgLy8g6YG/5YWN55u05o6l5L+u5pS55Y6f5a+56LGhXHJcbiAgICB0cmFuc2xhdGUgPSB7XHJcbiAgICAgIHg6IHRyYW5zbGF0ZS54LFxyXG4gICAgICB5OiB0cmFuc2xhdGUueVxyXG4gICAgfTtcclxuICAgIHRyYW5zZm9ybU9yaWdpbiA9IHtcclxuICAgICAgeDogb2Zmc2V0WCxcclxuICAgICAgeTogb2Zmc2V0WSxcclxuICAgIH07XHJcbiAgICAvLyDliKTmlq3nvKnmlL7lkI7lhYPntKDmnInmsqHmnInlh7rnlYxcclxuICAgIGxldCBib3VuZHMgPSBnZXRCb3VuZHModGhpcy5lbCwgbmV3Wm9vbSwgdHJhbnNsYXRlLCB0cmFuc2Zvcm1PcmlnaW4pO1xyXG4gICAgZm9yIChsZXQgc2lkZSBpbiBib3VuZHMpIHtcclxuICAgICAgaWYgKGJvdW5kc1tzaWRlXSA+IDApIHtcclxuICAgICAgICBzd2l0Y2ggKHNpZGUpIHtcclxuICAgICAgICAgIGNhc2UgJ3RvcCc6XHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZS55IC09IGJvdW5kcy50b3A7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgICB0cmFuc2xhdGUueCArPSBib3VuZHMucmlnaHQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnYm90dG9tJzpcclxuICAgICAgICAgICAgdHJhbnNsYXRlLnkgKz0gYm91bmRzLmJvdHRvbTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICAgICAgdHJhbnNsYXRlLnggLT0gYm91bmRzLmxlZnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICB0aGlzLnNldFN0YXRlKGFzc2lnbih7fSwgdGhpcy5zdGF0ZSwge1xyXG4gICAgZHJhZ2FibGUsXHJcbiAgICB6b29tOiBuZXdab29tLFxyXG4gICAgdHJhbnNsYXRlLFxyXG4gICAgdHJhbnNmb3JtT3JpZ2luLFxyXG4gIH0pKVxyXG59XHJcbi8qKlxyXG4gKiDpvKDmoIfngrnlh7vov5vlhaXmi5bmi73mqKHlvI9cclxuICogQHBhcmFtIHtldmVudH0gZXZlbnQgXHJcbiAqL1xyXG5mdW5jdGlvbiBNb3VzZURvd24oZXZlbnQpIHtcclxuICBsZXQgeyBkcmFnYWJsZSwgdHJhbnNsYXRlIH0gPSB0aGlzLnN0YXRlO1xyXG4gIGlmICghZHJhZ2FibGUpIHJldHVybjtcclxuICBwcmV2ZW50RGVmYXVsdChldmVudCk7XHJcbiAgbGV0IHsgY2xpZW50WCwgY2xpZW50WSB9ID0gZXZlbnQ7XHJcbiAgdGhpcy5zZXRTdGF0ZShhc3NpZ24oe30sIHRoaXMuc3RhdGUsIHtcclxuICAgIGlzTW91c2VNb3Zpbmc6IHRydWUsXHJcbiAgICBtb3ZlU3RhcnQ6IHtcclxuICAgICAgeDogY2xpZW50WCxcclxuICAgICAgeTogY2xpZW50WSxcclxuICAgIH0sXHJcbiAgICBtb3ZpbmdUcmFuc2xhdGU6IGFzc2lnbih7fSwgdHJhbnNsYXRlKSxcclxuICB9KSk7XHJcbiAgLy8g5L+u5pS5Y3Vyc29y5qC35byPXHJcbiAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdtb3ZlJyk7XHJcbiAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vblsnbW91c2Vtb3ZlJ10pO1xyXG4gIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uWydtb3VzZXVwJ10pO1xyXG4gIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLl9vblsnbW91c2VvdXQnXSk7XHJcbn1cclxuLyoqXHJcbiAqIOenu+WKqOm8oOagh+i/m+ihjOaLluaLvVxyXG4gKiBAcGFyYW0ge2V2ZW50fSBldmVudCBcclxuICovXHJcbmZ1bmN0aW9uIE1vdXNlTW92ZShldmVudCkge1xyXG4gIGxldCB7IHBhZGRpbmcgfSA9IHRoaXMub3B0aW9ucztcclxuICBsZXQgeyB6b29tLCB0cmFuc2xhdGUsIHRyYW5zZm9ybU9yaWdpbiwgbW92ZVN0YXJ0IH0gPSB0aGlzLnN0YXRlO1xyXG4gIHByZXZlbnREZWZhdWx0KGV2ZW50KTtcclxuICBsZXQgeyBjbGllbnRYLCBjbGllbnRZIH0gPSBldmVudDtcclxuICAvLyDorqHnrpfnp7vliqjlkI7nmoQgdHJhbnNsYXRlXHJcbiAgbGV0IG5ld01vdmluZ1RyYW5zbGF0ZSA9IHtcclxuICAgIHg6IHRyYW5zbGF0ZS54ICsgKGNsaWVudFggLSBtb3ZlU3RhcnQueCksXHJcbiAgICB5OiB0cmFuc2xhdGUueSArIChjbGllbnRZIC0gbW92ZVN0YXJ0LnkpLFxyXG4gIH1cclxuICAvLyDliKTmlq3mi5bmi73lkI7lhYPntKDmnInmsqHmnInlh7rnlYxcclxuICBsZXQgYm91bmRzID0gZ2V0Qm91bmRzKHRoaXMuZWwsIHpvb20sIG5ld01vdmluZ1RyYW5zbGF0ZSwgdHJhbnNmb3JtT3JpZ2luKTtcclxuICBmb3IgKGxldCBzaWRlIGluIGJvdW5kcykge1xyXG4gICAgaWYgKGJvdW5kc1tzaWRlXSA+IHBhZGRpbmcpIHtcclxuICAgICAgc3dpdGNoIChzaWRlKSB7XHJcbiAgICAgICAgY2FzZSAndG9wJzpcclxuICAgICAgICAgIG5ld01vdmluZ1RyYW5zbGF0ZS55ID0gKHRyYW5zZm9ybU9yaWdpbi55ICogKHpvb20gLSAxKSkgKyBwYWRkaW5nO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgbmV3TW92aW5nVHJhbnNsYXRlLnggPSAoKHRoaXMuZWwuY2xpZW50V2lkdGggLSB0cmFuc2Zvcm1PcmlnaW4ueCkgKiAoMSAtIHpvb20pKSAtIHBhZGRpbmc7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdib3R0b20nOlxyXG4gICAgICAgICAgbmV3TW92aW5nVHJhbnNsYXRlLnkgPSAoKHRoaXMuZWwuY2xpZW50SGVpZ2h0IC0gdHJhbnNmb3JtT3JpZ2luLnkpICogKDEgLSB6b29tKSkgLSBwYWRkaW5nO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgICBuZXdNb3ZpbmdUcmFuc2xhdGUueCA9ICh0cmFuc2Zvcm1PcmlnaW4ueCAqICh6b29tIC0gMSkpICsgcGFkZGluZztcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRoaXMuc2V0U3RhdGUoYXNzaWduKHt9LCB0aGlzLnN0YXRlLCB7XHJcbiAgICBtb3ZpbmdUcmFuc2xhdGU6IG5ld01vdmluZ1RyYW5zbGF0ZVxyXG4gIH0pKTtcclxufVxyXG4vKipcclxuICog6byg5qCH5oqs6LW36YCA5Ye65ouW5ou95qih5byPXHJcbiAqL1xyXG5mdW5jdGlvbiBNb3VzZVVwKCkge1xyXG4gIGxldCB7IG1vdmluZ1RyYW5zbGF0ZSB9ID0gdGhpcy5zdGF0ZTtcclxuICB0aGlzLnNldFN0YXRlKGFzc2lnbih7fSwgdGhpcy5zdGF0ZSwge1xyXG4gICAgdHJhbnNsYXRlOiBhc3NpZ24oe30sIG1vdmluZ1RyYW5zbGF0ZSksXHJcbiAgICBpc01vdXNlTW92aW5nOiBmYWxzZSxcclxuICB9KSk7XHJcbiAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdtb3ZlJyk7XHJcbiAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vblsnbW91c2Vtb3ZlJ10pO1xyXG4gIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uWydtb3VzZXVwJ10pO1xyXG4gIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLl9vblsnbW91c2VvdXQnXSk7XHJcbn1cclxuLyog56e75Yqo56uv6YCC6YWNICovXHJcbi8qKlxyXG4gKiDljZXmjIcgdG91Y2gg6L+b5YWl5ouW5ou95qih5byPXHJcbiAqIEBwYXJhbSB7ZXZlbnR9IGV2ZW50IFxyXG4gKi9cclxuZnVuY3Rpb24gVG91Y2hNb3ZlU3RhcnQoZXZlbnQpIHtcclxuICBsZXQgeyBkcmFnYWJsZSwgaXNUb3VjaFpvb20sIHRyYW5zbGF0ZSB9ID0gdGhpcy5zdGF0ZTtcclxuICAvLyDlpoLmnpzkvY3nva7ooqvplIHlrprmiJblt7Lov5vlhaXmi5bmi73mqKHlvI/vvIznm7TmjqXov5Tlm55cclxuICBpZiAoIWRyYWdhYmxlIHx8IGlzVG91Y2hab29tKSByZXR1cm47XHJcbiAgcHJldmVudERlZmF1bHQoZXZlbnQpO1xyXG4gIGxldCB0b3VjaGVzID0gcGFyc2VUb3VjaGVzKHRoaXMucGFyZW50Tm9kZSwgZXZlbnQudG91Y2hlcyk7XHJcbiAgbGV0IGxlbmd0aCA9IHRvdWNoZXMubGVuZ3RoO1xyXG4gIGlmIChsZW5ndGggIT09IDIpIHtcclxuICAgIC8vIOW7tui/n+aJp+ihjO+8jOWmguaenCAxMDBtcyDlhoXlj5jkuLrlj4zmjIfvvIzliJnliKTlrprkuLrnvKnmlL7mk43kvZxcclxuICAgIHRoaXMuc3RhdGUudG91Y2hUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xyXG4gICAgICBsZXQgeyBjbGllbnRYLCBjbGllbnRZIH0gPSB0b3VjaDtcclxuICAgICAgdGhpcy5zZXRTdGF0ZShhc3NpZ24oe30sIHRoaXMuc3RhdGUsIHtcclxuICAgICAgICB0b3VjaFRpbWVyOiBudWxsLFxyXG4gICAgICAgIGlzVG91Y2hNb3Zpbmc6IHRydWUsXHJcbiAgICAgICAgdG91Y2hTdGFydDoge1xyXG4gICAgICAgICAgeDogY2xpZW50WCxcclxuICAgICAgICAgIHk6IGNsaWVudFlcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdmluZ1RyYW5zbGF0ZTogYXNzaWduKHt9LCB0cmFuc2xhdGUpXHJcbiAgICAgIH0pKTtcclxuICAgICAgdGhpcy5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uWyd0b3VjaG1vdmUnXSk7XHJcbiAgICAgIHRoaXMucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uWyd0b3VjaG1vdmVlbmQnXSk7XHJcbiAgICB9LCAxMDApXHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiDnp7vliqjmiYvmjIfov5vooYzmi5bmi71cclxuICogQHBhcmFtIHtldmVudH0gZXZlbnQgXHJcbiAqL1xyXG5mdW5jdGlvbiBUb3VjaE1vdmUoZXZlbnQpIHtcclxuICBsZXQgeyBwYWRkaW5nIH0gPSB0aGlzLm9wdGlvbnM7XHJcbiAgbGV0IHsgem9vbSwgdHJhbnNsYXRlLCB0b3VjaFN0YXJ0LCBtb3ZpbmdUcmFuc2xhdGUsIHRyYW5zZm9ybU9yaWdpbiB9ID0gdGhpcy5zdGF0ZTtcclxuICBwcmV2ZW50RGVmYXVsdChldmVudCk7XHJcbiAgbGV0IHRvdWNoZXMgPSBwYXJzZVRvdWNoZXModGhpcy5wYXJlbnROb2RlLCBldmVudC50b3VjaGVzKTtcclxuICBsZXQgeyBjbGllbnRYLCBjbGllbnRZIH0gPSB0b3VjaGVzWzBdO1xyXG4gIGxldCBuZXdNb3ZpbmdUcmFuc2xhdGUgPSB7XHJcbiAgICB4OiB0cmFuc2xhdGUueCArIChjbGllbnRYIC0gdG91Y2hTdGFydC54KSxcclxuICAgIHk6IHRyYW5zbGF0ZS55ICsgKGNsaWVudFkgLSB0b3VjaFN0YXJ0LnkpLFxyXG4gIH1cclxuICAvLyDliKTmlq3mi5bmi73lkI7lhYPntKDmnInmsqHmnInlh7rnlYxcclxuICBsZXQgYm91bmRzID0gZ2V0Qm91bmRzKHRoaXMuZWwsIHpvb20sIG5ld01vdmluZ1RyYW5zbGF0ZSwgdHJhbnNmb3JtT3JpZ2luKTtcclxuICBmb3IgKGxldCBzaWRlIGluIGJvdW5kcykge1xyXG4gICAgaWYgKGJvdW5kc1tzaWRlXSA+IHBhZGRpbmcpIHtcclxuICAgICAgc3dpdGNoIChzaWRlKSB7XHJcbiAgICAgICAgY2FzZSAndG9wJzpcclxuICAgICAgICAgIG5ld01vdmluZ1RyYW5zbGF0ZS55ID0gKHRyYW5zZm9ybU9yaWdpbi55ICogKHpvb20gLSAxKSkgKyBwYWRkaW5nO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgbmV3TW92aW5nVHJhbnNsYXRlLnggPSAoKHRoaXMuZWwuY2xpZW50V2lkdGggLSB0cmFuc2Zvcm1PcmlnaW4ueCkgKiAoMSAtIHpvb20pKSAtIHBhZGRpbmc7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdib3R0b20nOlxyXG4gICAgICAgICAgbmV3TW92aW5nVHJhbnNsYXRlLnkgPSAoKHRoaXMuZWwuY2xpZW50SGVpZ2h0IC0gdHJhbnNmb3JtT3JpZ2luLnkpICogKDEgLSB6b29tKSkgLSBwYWRkaW5nO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgICBuZXdNb3ZpbmdUcmFuc2xhdGUueCA9ICh0cmFuc2Zvcm1PcmlnaW4ueCAqICh6b29tIC0gMSkpICsgcGFkZGluZztcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRoaXMuc2V0U3RhdGUoYXNzaWduKHt9LCB0aGlzLnN0YXRlLCB7XHJcbiAgICBtb3ZpbmdUcmFuc2xhdGU6IG5ld01vdmluZ1RyYW5zbGF0ZVxyXG4gIH0pKTtcclxufVxyXG4vKipcclxuICog5omL5oyH5oqs6LW36YCA5Ye65ouW5ou95qih5byPXHJcbiAqL1xyXG5mdW5jdGlvbiBUb3VjaE1vdmVFbmQoKSB7XHJcbiAgbGV0IHsgbW92aW5nVHJhbnNsYXRlIH0gPSB0aGlzLnN0YXRlO1xyXG4gIHRoaXMuc2V0U3RhdGUoYXNzaWduKHt9LCB0aGlzLnN0YXRlLCB7XHJcbiAgICB0cmFuc2xhdGU6IGFzc2lnbih7fSwgbW92aW5nVHJhbnNsYXRlKSxcclxuICAgIGlzVG91Y2hNb3Zpbmc6IGZhbHNlLFxyXG4gIH0pKTtcclxuICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25bJ3RvdWNobW92ZSddKTtcclxuICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9vblsndG91Y2htb3ZlZW5kJ10pO1xyXG59XHJcbi8qKlxyXG4gKiDlj4zmjIcgdG91Y2gg6L+b5YWl57yp5pS+5qih5byPXHJcbiAqIEBwYXJhbSB7ZXZlbnR9IGV2ZW50IFxyXG4gKi9cclxuZnVuY3Rpb24gVG91Y2hab29tU3RhcnQoZXZlbnQpIHtcclxuICBsZXQgeyB6b29tYWJsZSwgdG91Y2hUaW1lciwgaXNUb3VjaE1vdmluZyB9ID0gdGhpcy5zdGF0ZTtcclxuICBpZiAoIXpvb21hYmxlIHx8IGlzVG91Y2hNb3ZpbmcpIHJldHVybjtcclxuICBwcmV2ZW50RGVmYXVsdChldmVudCk7XHJcbiAgbGV0IHRvdWNoZXMgPSBwYXJzZVRvdWNoZXModGhpcy5wYXJlbnROb2RlLCBldmVudC50b3VjaGVzKTtcclxuICBsZXQgbGVuZ3RoID0gdG91Y2hlcy5sZW5ndGg7XHJcbiAgaWYgKGxlbmd0aCA9PT0gMikge1xyXG4gICAgLy8gMTAwbXMg5YaF5Y+Y5Li65Lik5oyH77yM5Y+W5raI5ouW5ou95pON5L2cXHJcbiAgICBpZiAodG91Y2hUaW1lcikge1xyXG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRvdWNoVGltZXIpO1xyXG4gICAgfVxyXG4gICAgbGV0IFthLCBiXSA9IHRvdWNoZXM7XHJcbiAgICB0aGlzLnNldFN0YXRlKGFzc2lnbih7fSwgdGhpcy5zdGF0ZSwge1xyXG4gICAgICB0b3VjaFRpbWVyOiBudWxsLFxyXG4gICAgICBpc1RvdWNoWm9vbTogdHJ1ZSxcclxuICAgICAgdG91Y2hEaXN0YW5jZTogTWF0aC5zcXJ0KE1hdGgucG93KChhLm9mZnNldFggLSBiLm9mZnNldFgpLCAyKSArIE1hdGgucG93KChhLm9mZnNldFkgLSBiLm9mZnNldFkpLCAyKSksXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25bJ3RvdWNoem9vbSddKTtcclxuICAgIHRoaXMucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uWyd0b3VjaHpvb21lbmQnXSk7XHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiDnp7vliqjmiYvmjIfov5vooYznvKnmlL5cclxuICogQHBhcmFtIHtldmVudH0gZXZlbnQgXHJcbiAqL1xyXG5mdW5jdGlvbiBUb3VjaFpvb20oZXZlbnQpIHtcclxuICBwcmV2ZW50RGVmYXVsdChldmVudCk7XHJcbiAgbGV0IHsgbWluWm9vbSwgbWF4Wm9vbSwgem9vbVNwZWVkIH0gPSB0aGlzLm9wdGlvbnM7XHJcbiAgbGV0IHsgZHJhZ2FibGUsIHpvb20sIHRyYW5zbGF0ZSwgdHJhbnNmb3JtT3JpZ2luLCB0b3VjaFpvb21UaW1lciwgdG91Y2hEaXN0YW5jZSB9ID0gdGhpcy5zdGF0ZTtcclxuICBsZXQgdG91Y2hlcyA9IHBhcnNlVG91Y2hlcyh0aGlzLnBhcmVudE5vZGUsIGV2ZW50LnRvdWNoZXMpO1xyXG4gIGxldCBsZW5ndGggPSB0b3VjaGVzLmxlbmd0aDtcclxuICBsZXQgW2EsIGJdID0gdG91Y2hlcztcclxuICAvLyDlv4XpobvmlL7lnKggdGltZXIg5YmNXHJcbiAgaWYgKGxlbmd0aCA9PT0gMSkge1xyXG4gICAgdGhpcy5fb24ub25Ub3VjaFpvb21FbmQoKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgLy8gMTAwbXMg5YaF6YeN5aSN6Kem5Y+R5LiN5YaN5omn6KGMXHJcbiAgaWYgKHRvdWNoWm9vbVRpbWVyKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgIHRoaXMuc3RhdGUudG91Y2hab29tVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZS50b3VjaFpvb21UaW1lciA9IG51bGw7XHJcbiAgICB9LCAxMDApO1xyXG4gIH1cclxuICBsZXQgbmV3VG91Y2hEaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdygoYS5vZmZzZXRYIC0gYi5vZmZzZXRYKSwgMikgKyBNYXRoLnBvdygoYS5vZmZzZXRZIC0gYi5vZmZzZXRZKSwgMikpO1xyXG4gIGxldCBkZWx0YSA9IChuZXdUb3VjaERpc3RhbmNlIC8gdG91Y2hEaXN0YW5jZSk7XHJcbiAgbGV0IG5ld1pvb20gPSB6b29tICogZGVsdGE7XHJcbiAgLy8g6L6555WM5oOF5Ya15Yik5patXHJcbiAgaWYgKG5ld1pvb20gPCBtaW5ab29tKSB7XHJcbiAgICBuZXdab29tID0gbWluWm9vbTtcclxuICB9IGVsc2UgaWYgKG5ld1pvb20gPiBtYXhab29tKSB7XHJcbiAgICBuZXdab29tID0gbWF4Wm9vbTtcclxuICB9IGVsc2UgaWYgKE1hdGguYWJzKG5ld1pvb20gLSAxKSA8ICh6b29tU3BlZWQgLyAyKSkge1xyXG4gICAgbmV3Wm9vbSA9IDE7XHJcbiAgfVxyXG4gIC8vIOWwj+S6juetieS6jiAxIOaXtuS4jeWFgeiuuOaLluaLve+8jOWkp+S6jiAxIOaXtumcgOimgeazqOaEj+S4jeiDveWHuueVjFxyXG4gIGlmIChuZXdab29tIDw9IDEpIHtcclxuICAgIGRyYWdhYmxlID0gZmFsc2U7XHJcbiAgICB0cmFuc2xhdGUgPSB7IHg6IDAsIHk6IDAgfTtcclxuICAgIHRyYW5zZm9ybU9yaWdpbiA9IHtcclxuICAgICAgeDogKHRoaXMuZWwuY2xpZW50V2lkdGggLyAyKSxcclxuICAgICAgeTogKHRoaXMuZWwuY2xpZW50SGVpZ2h0IC8gMiksXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGRyYWdhYmxlID0gdHJ1ZTtcclxuICAgIC8vIOmBv+WFjeebtOaOpeS/ruaUueWOn+WvueixoVxyXG4gICAgdHJhbnNsYXRlID0ge1xyXG4gICAgICB4OiB0cmFuc2xhdGUueCxcclxuICAgICAgeTogdHJhbnNsYXRlLnlcclxuICAgIH07XHJcbiAgICB0cmFuc2Zvcm1PcmlnaW4gPSB7XHJcbiAgICAgIHg6IChhLm9mZnNldFggKyBiLm9mZnNldFgpIC8gMixcclxuICAgICAgeTogKGEub2Zmc2V0WSArIGIub2Zmc2V0WSkgLyAyLFxyXG4gICAgfTtcclxuICAgIC8vIOWIpOaWree8qeaUvuWQjuWFg+e0oOacieayoeacieWHuueVjFxyXG4gICAgbGV0IGJvdW5kcyA9IGdldEJvdW5kcyh0aGlzLmVsLCBuZXdab29tLCB0cmFuc2xhdGUsIHRyYW5zZm9ybU9yaWdpbik7XHJcbiAgICBmb3IgKGxldCBzaWRlIGluIGJvdW5kcykge1xyXG4gICAgICBpZiAoYm91bmRzW3NpZGVdID4gMCkge1xyXG4gICAgICAgIHN3aXRjaCAoc2lkZSkge1xyXG4gICAgICAgICAgY2FzZSAndG9wJzpcclxuICAgICAgICAgICAgdHJhbnNsYXRlLnkgLT0gYm91bmRzLnRvcDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZS54ICs9IGJvdW5kcy5yaWdodDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdib3R0b20nOlxyXG4gICAgICAgICAgICB0cmFuc2xhdGUueSArPSBib3VuZHMuYm90dG9tO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgICAgICB0cmFuc2xhdGUueCAtPSBib3VuZHMubGVmdDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRoaXMuc2V0U3RhdGUoYXNzaWduKHt9LCB0aGlzLnN0YXRlLCB7XHJcbiAgICBkcmFnYWJsZSxcclxuICAgIHpvb206IG5ld1pvb20sXHJcbiAgICB0cmFuc2xhdGUsXHJcbiAgICB0cmFuc2Zvcm1PcmlnaW4sXHJcbiAgICB0b3VjaERpc3RhbmNlOiBuZXdUb3VjaERpc3RhbmNlLFxyXG4gIH0pKVxyXG59XHJcbi8qKlxyXG4gKiDmiYvmjIfmiqzotbfpgIDlh7rnvKnmlL7mqKHlvI9cclxuICovXHJcbmZ1bmN0aW9uIFRvdWNoWm9vbUVuZCgpIHtcclxuICB0aGlzLnNldFN0YXRlKGFzc2lnbih7fSwgdGhpcy5zdGF0ZSwge1xyXG4gICAgaXNUb3VjaFpvb206IGZhbHNlXHJcbiAgfSkpXHJcbiAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uWyd0b3VjaHpvb20nXSk7XHJcbiAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZWVuZCcsIHRoaXMuX29uWyd0b3VjaHpvb21lbmQnXSlcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBNb3VzZVdoZWVsLFxyXG4gIE1vdXNlRG93bixcclxuICBNb3VzZU1vdmUsXHJcbiAgTW91c2VVcCxcclxuICBUb3VjaE1vdmVTdGFydCxcclxuICBUb3VjaE1vdmUsXHJcbiAgVG91Y2hNb3ZlRW5kLFxyXG4gIFRvdWNoWm9vbVN0YXJ0LFxyXG4gIFRvdWNoWm9vbSxcclxuICBUb3VjaFpvb21FbmQsXHJcbn0iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsIi8qKlxyXG4gKiBzaW1wbGUtem9vbSAxLjAuMFxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vQmlsbGJpdWJpdS9zaW1wbGUtem9vbVxyXG4gKiBBdXRob3I6IFd1aGFvIFxyXG4gKi9cclxuXHJcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0ICogYXMgZXZlbnRIYW5kbGVycyBmcm9tICcuL2V2ZW50LWhhbmRsZXJzJztcclxuXHJcbmNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XHJcblxyXG4vLyDpu5jorqTphY3nva5cclxuY29uc3QgREVGQVVMVE9QVElPTlMgPSB7XHJcbiAgem9vbWFibGU6IHRydWUsIC8vIOmUgeWumiB6b29tXHJcbiAgZHJhZ2FibGU6IHRydWUsIC8vIOmUgeWumiBwb3NpdGlvblxyXG4gIGluaXRab29tOiAxLCAgICAvLyDljp/lp4vnvKnmlL7mr5TkvotcclxuICBtaW5ab29tOiAxLCAgIC8vIOacgOWwj+e8qeaUvuavlOS+i1xyXG4gIG1heFpvb206IDUsICAgIC8vIOacgOWkp+e8qeaUvuavlOS+i1xyXG4gIHpvb21TcGVlZDogMC4xLCAvLyDpu5jorqTnvKnmlL7pgJ/luqZcclxuICBwYWRkaW5nOiAwLCAgICAgLy8g5pyA5aSn5YaF6L656LedXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGVab29tIHtcclxuICAvKipcclxuICAgKiBAY2xhc3MgU2ltcGxlWm9vbVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gZWwgXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZWwsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgLy8g5qC55o2u5Lyg5YWl55qE5Y+C5pWw6I635Y+W5a6e5L6L5YWD57SgXHJcbiAgICBpZiAoIWVsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcigncGxlYXNlIHByb3ZpZGUgYSB0YXJnZXQgZWxlbWVudCEnKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsID09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcclxuICAgICAgaWYgKCF0aGlzLmVsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0YXJnZXQgaXMgbm90IGZvdW5kIScpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbCA9PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAodXRpbHMuaXNIVE1MRWxlbWVudChlbCkpIHtcclxuICAgICAgICB0aGlzLmVsID0gZWw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0YXJnZXQgaXMgbm90IEhUTUxFbGVtZW50IScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyDorr7nva7niLblhYPntKDmoLflvI9cclxuICAgIGlmICh0aGlzLmVsLnBhcmVudE5vZGUgJiYgdGhpcy5lbC5wYXJlbnROb2RlLnRhZ05hbWUpIHtcclxuICAgICAgdGhpcy5wYXJlbnROb2RlID0gdGhpcy5lbC5wYXJlbnROb2RlO1xyXG4gICAgICB0aGlzLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnc2ltcGxlLXpvb20tY29udGFpbmVyJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RhcmdldCBjYW4gbm90IGJlIHJvb3QtZWxlbWVudCEnKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zIGlzIHN1cHBvc2VkIHRvIGJlIGFuIG9iamVjdCEnKVxyXG4gICAgfVxyXG4gICAgLy8g6KaG55uW6buY6K6k55qE6YWN572uXHJcbiAgICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oe30sIERFRkFVTFRPUFRJT05TLCBvcHRpb25zKTtcclxuICAgIC8vIOS4jeWFgeiuuCBwYWRkaW5nIOi2hei/h+WuvemrmOeahOS4gOWNilxyXG4gICAgdGhpcy5vcHRpb25zLnBhZGRpbmcgPSBNYXRoLm1pbigodGhpcy5lbC5jbGllbnRXaWR0aCAvIDIpLCAodGhpcy5lbC5jbGllbnRIZWlnaHQgLyAyKSwgdGhpcy5vcHRpb25zLnBhZGRpbmcpO1xyXG4gICAgLy8g5LiN5YWB6K64IGluaXRab29tIOi2hei/h+iMg+WbtFxyXG4gICAgdGhpcy5vcHRpb25zLmluaXRab29tID0gTWF0aC5tYXgoTWF0aC5tYXgodGhpcy5vcHRpb25zLm1pblpvb20sIHRoaXMub3B0aW9ucy5pbml0Wm9vbSksIE1hdGgubWluKHRoaXMub3B0aW9ucy5tYXhab29tLCB0aGlzLm9wdGlvbnMuaW5pdFpvb20pKTtcclxuICAgIC8vIOagueaNriBvcHRpb25zIOa3u+WKoCBjbGFzc1xyXG4gICAgbGV0IGNsYXNzTGlzdCA9IHRoaXMuZWwuY2xhc3NMaXN0O1xyXG4gICAgY2xhc3NMaXN0LmFkZCgnc2ltcGxlLXpvb20tZWwnKTtcclxuICAgIGlmKCF0aGlzLm9wdGlvbnMuem9vbWFibGUpIGNsYXNzTGlzdC5hZGQoJ3pvb20tbG9ja2VkJyk7XHJcbiAgICBpZighdGhpcy5vcHRpb25zLmRyYWdhYmxlKSBjbGFzc0xpc3QuYWRkKCdkcmFnLWxvY2tlZCcpO1xyXG4gICAgLy8g5L+d5a2Y5LqL5Lu25aSE55CG5Ye95pWw77yM5pa55L6/56e76Zmk5pe25L2/55SoXHJcbiAgICB0aGlzLl9vbiA9IHtcclxuICAgICAgLy8g5rua6L2u5LqL5Lu2XHJcbiAgICAgICdtb3VzZXdoZWVsJzogZXZlbnRIYW5kbGVycy5Nb3VzZVdoZWVsLmJpbmQodGhpcyksXHJcbiAgICAgICdET01Nb3VzZVNjcm9sbCc6IGV2ZW50SGFuZGxlcnMuTW91c2VXaGVlbC5iaW5kKHRoaXMpLFxyXG4gICAgICAvLyDpvKDmoIfngrnlh7vkuovku7ZcclxuICAgICAgJ21vdXNlZG93bic6IGV2ZW50SGFuZGxlcnMuTW91c2VEb3duLmJpbmQodGhpcyksXHJcbiAgICAgICdtb3VzZW1vdmUnOiBldmVudEhhbmRsZXJzLk1vdXNlTW92ZS5iaW5kKHRoaXMpLFxyXG4gICAgICAnbW91c2V1cCc6IGV2ZW50SGFuZGxlcnMuTW91c2VVcC5iaW5kKHRoaXMpLFxyXG4gICAgICAnbW91c2VvdXQnOiBldmVudEhhbmRsZXJzLk1vdXNlVXAuYmluZCh0aGlzKSxcclxuICAgICAgLy8g56e75Yqo56uv5ouW5ou95LqL5Lu2XHJcbiAgICAgICd0b3VjaG1vdmVzdGFydCc6IGV2ZW50SGFuZGxlcnMuVG91Y2hNb3ZlU3RhcnQuYmluZCh0aGlzKSxcclxuICAgICAgJ3RvdWNobW92ZSc6IGV2ZW50SGFuZGxlcnMuVG91Y2hNb3ZlLmJpbmQodGhpcyksXHJcbiAgICAgICd0b3VjaG1vdmVlbmQnOiBldmVudEhhbmRsZXJzLlRvdWNoTW92ZUVuZC5iaW5kKHRoaXMpLFxyXG4gICAgICAvLyDnp7vliqjnq6/nvKnmlL7kuovku7ZcclxuICAgICAgJ3RvdWNoem9vbXN0YXJ0JzogZXZlbnRIYW5kbGVycy5Ub3VjaFpvb21TdGFydC5iaW5kKHRoaXMpLFxyXG4gICAgICAndG91Y2h6b29tJzogZXZlbnRIYW5kbGVycy5Ub3VjaFpvb20uYmluZCh0aGlzKSxcclxuICAgICAgJ3RvdWNoem9vbWVuZCc6IGV2ZW50SGFuZGxlcnMuVG91Y2hab29tRW5kLmJpbmQodGhpcyksXHJcbiAgICB9XHJcbiAgICAvLyDpgJrov4cgb24g5re75Yqg55qE5LqL5Lu2XHJcbiAgICB0aGlzLl9vbkxpc3RlbmVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgICAvLyDpgJrov4cgYWRkRXZlbnRMaXN0ZW5lciDmt7vliqDnmoTkuovku7ZcclxuICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIC8vIOWIneWni+WMllxyXG4gICAgdGhpcy5faW5pdCgpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiDliJ3lp4vljJYgc3RhdGUg5ZKM5LqL5Lu255uR5ZCsXHJcbiAgICogQG1lbWJlcm9mIFNpbXBsZVpvb21cclxuICAgKiBAaW5zdGFuY2VcclxuICAgKi9cclxuICBfaW5pdCgpIHtcclxuICAgIC8vIOWIneWni+eKtuaAgVxyXG4gICAgdGhpcy5yZXNldCgpO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICAgIC8vIOagueaNrumFjee9ruehruWumuaYr+WQpuWQr+eUqOe8qeaUvuWSjOaLluaLvVxyXG4gICAgbGV0IHsgem9vbWFibGUsIGRyYWdhYmxlIH0gPSB0aGlzLm9wdGlvbnM7XHJcbiAgICBpZiAoem9vbWFibGUpIHtcclxuICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgdGhpcy5fb25bJ21vdXNld2hlZWwnXSk7XHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCB0aGlzLl9vblsnRE9NTW91c2VTY3JvbGwnXSk7XHJcbiAgICAgIHRoaXMucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fb25bJ3RvdWNoem9vbXN0YXJ0J10pO1xyXG4gICAgfVxyXG4gICAgaWYgKGRyYWdhYmxlKSB7XHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25bJ21vdXNlZG93biddKTtcclxuICAgICAgdGhpcy5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblsndG91Y2htb3Zlc3RhcnQnXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOiuvue9riB0cmFuc2Zvcm0g5bGe5oCnXHJcbiAgICogQG1lbWJlcm9mIFNpbXBsZVpvb21cclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAcGFyYW0ge251bWJlcn0gem9vbSBcclxuICAgKiBAcGFyYW0ge29iamVjdH0gdHJhbnNsYXRlIFxyXG4gICAqL1xyXG4gIF9zZXRUcmFuc2Zvcm0oem9vbSwgdHJhbnNsYXRlKSB7XHJcbiAgICBsZXQgeyB4LCB5IH0gPSB0cmFuc2xhdGU7XHJcbiAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgke3pvb219KSB0cmFuc2xhdGUoJHt4IC8gem9vbX1weCwke3kgLyB6b29tfXB4KWA7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOiuvue9riB0cmFuc2Zvcm1PcmlnaW4g5bGe5oCnXHJcbiAgICogQG1lbWJlcm9mIFNpbXBsZVpvb21cclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAcGFyYW0ge29iamVjdH0gdHJhbnNmb3JtT3JpZ2luIFxyXG4gICAqL1xyXG4gIF9zZXRUcmFuc2Zvcm1PcmlnaW4odHJhbnNmb3JtT3JpZ2luKSB7XHJcbiAgICBsZXQgeyB4LCB5IH0gPSB0cmFuc2Zvcm1PcmlnaW47XHJcbiAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IGAke3h9cHggJHt5fXB4YDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICog5omn6KGM5bey5pyJ55qE5LqL5Lu255uR5ZCsXHJcbiAgICogQG1lbWJlcm9mIFNpbXBsZVpvb21cclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBcclxuICAgKiBAcGFyYW0ge2V2ZW50fSBldmVudCBcclxuICAgKi9cclxuICBfZGlzcGF0Y2hFdmVudCh0eXBlLCBkYXRhKSB7XHJcbiAgICBsZXQgZXZlbnQgPSB7XHJcbiAgICAgIHR5cGUsXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLl9vbkxpc3RlbmVyc1t0eXBlXSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMuX29uTGlzdGVuZXJzW3R5cGVdKGV2ZW50KTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9ldmVudExpc3RlbmVyc1t0eXBlXSAmJiB0aGlzLl9ldmVudExpc3RlbmVyc1t0eXBlXS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5fZXZlbnRMaXN0ZW5lcnNbdHlwZV0uZm9yRWFjaChsaXN0ZW5lciA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGxpc3RlbmVyKGV2ZW50KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKGVycm9yKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICog6YeN572u5b2T5YmNIHN0YXRlXHJcbiAgICogQG1lbWJlcm9mIFNpbXBsZVpvb21cclxuICAgKiBAaW5zdGFuY2VcclxuICAgKi9cclxuICByZXNldCgpIHtcclxuICAgIGxldCB7IHpvb21hYmxlLCBkcmFnYWJsZSwgaW5pdFpvb20gfSA9IHRoaXMub3B0aW9ucztcclxuICAgIGxldCBzdGF0ZSA9IHtcclxuICAgICAgLy8g57yp5pS+6ZSBXHJcbiAgICAgIHpvb21hYmxlOiB6b29tYWJsZSxcclxuICAgICAgLy8g5L2N572u6ZSBXHJcbiAgICAgIGRyYWdhYmxlOiBkcmFnYWJsZSxcclxuICAgICAgLy8g57yp5pS+5q+U5L6LXHJcbiAgICAgIHpvb206IGluaXRab29tLFxyXG4gICAgICAvLyDlgY/np7vkvY3nva5cclxuICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgLy8g5pqC5pe25L+d5a2Y5ouW5ou95pe255qE5YGP56e75L2N572uXHJcbiAgICAgIG1vdmluZ1RyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgIC8vIOe8qeaUvuS4reW/g1xyXG4gICAgICB0cmFuc2Zvcm1PcmlnaW46IHsgXHJcbiAgICAgICAgeDogKHRoaXMuZWwuY2xpZW50V2lkdGggLyAyKSxcclxuICAgICAgICB5OiAodGhpcy5lbC5jbGllbnRIZWlnaHQgLyAyKVxyXG4gICAgICB9LFxyXG4gICAgICAvKiogUEPnq6/kuJPnlKggKiovXHJcbiAgICAgIC8vIOaYr+WQpuato+WcqOaLluaLvVxyXG4gICAgICBpc01vdXNlTW92aW5nOiBmYWxzZSxcclxuICAgICAgLy8g5ouW5ou96LW354K5XHJcbiAgICAgIG1vdmVTdGFydDogeyB4OiAwLCB5OiAwIH0sXHJcbiAgICAgIC8qKiDnp7vliqjnq6/kuJPnlKggKiovXHJcbiAgICAgIC8vIOW7tuaXtuaJp+ihjO+8jOeUqOS6juWIpOaWreaYr+WQpuS4uuaLluaLveaTjeS9nFxyXG4gICAgICB0b3VjaFRpbWVyOiBudWxsLFxyXG4gICAgICAvLyDlt7LliKTlrprkuLrmi5bmi73mk43kvZzlkI7kuI3lj6/lj5bmtohcclxuICAgICAgaXNUb3VjaE1vdmluZzogZmFsc2UsXHJcbiAgICAgIC8vIOW3suWIpOWumuS4uue8qeaUvuaTjeS9nOWQjuS4jeWPr+WPlua2iFxyXG4gICAgICBpc1RvdWNoWm9vbTogZmFsc2UsXHJcbiAgICAgIC8vIOaLluaLvei1t+eCuVxyXG4gICAgICB0b3VjaFN0YXJ0OiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgLy8g6YG/5YWN6aKR57mB6Kem5Y+R57yp5pS+XHJcbiAgICAgIHRvdWNoWm9vbVRpbWVyOiBudWxsLFxyXG4gICAgICAvLyDkuKTmjIfpl7TnmoTot53nprtcclxuICAgICAgdG91Y2hEaXN0YW5jZTogMCxcclxuICAgIH1cclxuICAgIGlmIChpbml0Wm9vbSA8PSAxKSB7XHJcbiAgICAgIHN0YXRlLmRyYWdhYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICog5omL5Yqo5pu05paw5a6e5L6LXHJcbiAgICogQG1lbWJlcm9mIFNpbXBsZVpvb21cclxuICAgKiBAaW5zdGFuY2VcclxuICAgKi9cclxuICB1cGRhdGUoKSB7XHJcbiAgICBsZXQgeyB6b29tLCB0cmFuc2xhdGUsIHRyYW5zZm9ybU9yaWdpbiB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIHRoaXMuX3NldFRyYW5zZm9ybSh6b29tLCB0cmFuc2xhdGUpO1xyXG4gICAgdGhpcy5fc2V0VHJhbnNmb3JtT3JpZ2luKHRyYW5zZm9ybU9yaWdpbilcclxuICB9XHJcbiAgLyoqXHJcbiAgICog6ZSA5q+B5b2T5YmN5a6e5L6LXHJcbiAgICogQG1lbWJlcm9mIFNpbXBsZVpvb21cclxuICAgKiBAaW5zdGFuY2VcclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgbGV0IHsgem9vbWFibGUsIGRyYWdhYmxlIH0gPSB0aGlzLm9wdGlvbnM7XHJcbiAgICBpZiAoem9vbWFibGUpIHtcclxuICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgdGhpcy5fb25bJ21vdXNld2hlZWwnXSk7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCB0aGlzLl9vblsnRE9NTW91c2VTY3JvbGwnXSk7XHJcbiAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fb25bJ3RvdWNoem9vbXN0YXJ0J10pO1xyXG4gICAgfVxyXG4gICAgaWYgKGRyYWdhYmxlKSB7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25bJ21vdXNlZG93biddKTtcclxuICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblsndG91Y2htb3Zlc3RhcnQnXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOiuvue9riBzdGF0Ze+8jOiHquWKqOabtOaWsCBkb20g5bm25oqb5Ye655u45bqU55qE5LqL5Lu2XHJcbiAgICogQG1lbWJlcm9mIFNpbXBsZVpvb21cclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGUgXHJcbiAgICovXHJcbiAgc2V0U3RhdGUoc3RhdGUpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlIHx8IHN0YXRlO1xyXG4gICAgLy8g5a+55q+U5YmN5ZCO55qEIHN0YXRl77yM5qC55o2u5Y+Y5Yqo5oqb5Ye655u45bqU55qE5LqL5Lu2XHJcbiAgICBsZXQgaXNNb3ZlZCA9IChzdGF0ZS5pc01vdXNlTW92aW5nIHx8IHN0YXRlLmlzVG91Y2hNb3ZpbmcpO1xyXG4gICAgbGV0IGlzWm9vbWVkID0gIXV0aWxzLmRlZXBDb21wYXJlKHRoaXMuc3RhdGUuem9vbSwgc3RhdGUuem9vbSk7XHJcbiAgICBsZXQgaXNUcmFuc2xhdGVkID0gIXV0aWxzLmRlZXBDb21wYXJlKHRoaXMuc3RhdGUudHJhbnNsYXRlLCBzdGF0ZS50cmFuc2xhdGUpO1xyXG4gICAgbGV0IHRyYW5zZm9ybU9yaWdpbkNoYW5nZWQgPSAhdXRpbHMuZGVlcENvbXBhcmUodGhpcy5zdGF0ZS50cmFuc2Zvcm1PcmlnaW4sIHN0YXRlLnRyYW5zZm9ybU9yaWdpbik7XHJcbiAgICB0aGlzLnN0YXRlID0gYXNzaWduKHt9LCB0aGlzLnN0YXRlLCBzdGF0ZSk7XHJcbiAgICAvLyDnp7vliqjov4fnqIvkuK3ku6Xlj4ogem9vbSDlkowgdHJhbnNsYXRlIOWPmOabtOaXtu+8jOmcgOimgeabtOaWsCBzdHlsZS50cmFuc2Zvcm1cclxuICAgIGlmIChpc01vdmVkKSB7XHJcbiAgICAgIHRoaXMuX3NldFRyYW5zZm9ybShzdGF0ZS56b29tLCBzdGF0ZS5tb3ZpbmdUcmFuc2xhdGUpO1xyXG4gICAgfSBlbHNlIGlmIChpc1pvb21lZCB8fCBpc1RyYW5zbGF0ZWQpIHtcclxuICAgICAgdGhpcy5fc2V0VHJhbnNmb3JtKHN0YXRlLnpvb20sIHN0YXRlLnRyYW5zbGF0ZSk7XHJcbiAgICB9XHJcbiAgICAvLyB0cmFuc2Zvcm1PcmlnaW4g5Y+Y5pu06ZyA6KaB5pu05pawIHN0eWxlLnRyYW5zZm9ybU9yaWdpblxyXG4gICAgaWYgKHRyYW5zZm9ybU9yaWdpbkNoYW5nZWQpIHtcclxuICAgICAgdGhpcy5fc2V0VHJhbnNmb3JtT3JpZ2luKHN0YXRlLnRyYW5zZm9ybU9yaWdpbik7XHJcbiAgICB9XHJcbiAgICAvLyDop6blj5Hnm7jlupTnmoTkuovku7ZcclxuICAgIGlmIChpc01vdmVkIHx8IGlzVHJhbnNsYXRlZCkge1xyXG4gICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdtb3ZlJywgc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzWm9vbWVkIHx8IHRyYW5zZm9ybU9yaWdpbkNoYW5nZWQpIHtcclxuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnem9vbScsIHN0YXRlKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ3VwZGF0ZWQnLCBzdGF0ZSlcclxuICB9XHJcbiAgLyoqXHJcbiAgICog57uR5a6a5LqL5Lu255uR5ZCsXHJcbiAgICogQG1lbWJlcm9mIFNpbXBsZVpvb21cclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBcclxuICAgKi9cclxuICBvbih0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgaWYgKHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V2ZW50IHR5cGUgbXVzdCBiZSBhIHN0cmluZycpXHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignZXZlbnQgY2FsbGJhY2sgdHlwZSBtdXN0IGJlIGEgc3RyaW5nJylcclxuICAgIH1cclxuICAgIHRoaXMuX29uTGlzdGVuZXJzW3R5cGVdID0gY2FsbGJhY2s7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOWFs+mXreS6i+S7tuebkeWQrFxyXG4gICAqIEBtZW1iZXJvZiBTaW1wbGVab29tXHJcbiAgICogQGluc3RhbmNlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgXHJcbiAgICovXHJcbiAgb2ZmKHR5cGUpIHtcclxuICAgIHRoaXMuX29uTGlzdGVuZXJzW3R5cGVdID0gKCkgPT4geyB9O1xyXG4gIH1cclxuICAvKipcclxuICAgKiDmt7vliqDkuovku7bnm5HlkKxcclxuICAgKiBAbWVtYmVyb2YgU2ltcGxlWm9vbVxyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIFxyXG4gICAqL1xyXG4gIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2spIHtcclxuICAgIGlmICh0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdldmVudCB0eXBlIG11c3QgYmUgYSBzdHJpbmcnKVxyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V2ZW50IGNhbGxiYWNrIHR5cGUgbXVzdCBiZSBhIHN0cmluZycpXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fZXZlbnRMaXN0ZW5lcnNbdHlwZV0pIHtcclxuICAgICAgdGhpcy5fZXZlbnRMaXN0ZW5lcnNbdHlwZV0ucHVzaChjYWxsYmFjayk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9ldmVudExpc3RlbmVyc1t0eXBlXSA9IFtjYWxsYmFja107XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOenu+mZpOS6i+S7tuebkeWQrFxyXG4gICAqIEBtZW1iZXJvZiBTaW1wbGVab29tXHJcbiAgICogQGluc3RhbmNlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgXHJcbiAgICovXHJcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgaWYgKHRoaXMuX2V2ZW50TGlzdGVuZXJzW3R5cGVdICYmIHRoaXMuX2V2ZW50TGlzdGVuZXJzW3R5cGVdLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLl9ldmVudExpc3RlbmVyc1t0eXBlXSA9IHRoaXMuX2V2ZW50TGlzdGVuZXJzW3R5cGVdLmZpbHRlcigobGlzdGVuZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gbGlzdGVuZXIgIT09IGNhbGxiYWNrO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiDorqLpmIXlt7LmnInlrp7kvovvvIzlkIzmraXnvKnmlL5cclxuICAgKiBAbWVtYmVyb2YgU2ltcGxlWm9vbVxyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqIEBwYXJhbSB7Kn0gaW5zdGFuY2UgXHJcbiAgICovXHJcbiAgc3Vic2NyaWJlKGluc3RhbmNlKSB7XHJcbiAgICBpZihpbnN0YW5jZSAmJiBpbnN0YW5jZSBpbnN0YW5jZW9mIFNpbXBsZVpvb20pIHtcclxuICAgICAgaW5zdGFuY2UuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlZCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZXZlbnQuZGF0YSlcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn0iLCIvKipcclxuICog5Yik5pat5piv5ZCm5Li6IEhUTUxFbGVtZW50XHJcbiAqIEBwYXJhbSB7Kn0gb2JqIFxyXG4gKi9cclxuZnVuY3Rpb24gaXNIVE1MRWxlbWVudChlbGVtZW50KSB7XHJcbiAgaWYgKHR5cGVvZiBIVE1MRWxlbWVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgIHJldHVybiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIChlbGVtZW50ICYmIHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0JyAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxICYmIHR5cGVvZiBlbGVtZW50Lm5vZGVOYW1lID09PSAnc3RyaW5nJyk7XHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiDlj5bmtojpu5jorqTkuovku7ZcclxuICogQHBhcmFtIHtldmVudH0gZXZlbnQgXHJcbiAqL1xyXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChldmVudCkge1xyXG4gIC8vIOiOt+WPluS6i+S7tlxyXG4gIGV2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xyXG4gIC8vIOWPlua2iOm7mOiupOihjOS4ulxyXG4gIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICB9O1xyXG59XHJcbi8qKlxyXG4gKiDlj5bmtojkuovku7blhpLms6FcclxuICogQHBhcmFtIHtldmVudH0gZXZlbnQgXHJcbiAqL1xyXG5mdW5jdGlvbiBjYW5jZWxCdWJibGUoZXZlbnQpIHtcclxuICAvLyDojrflj5bkuovku7ZcclxuICBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcclxuICAvLyDlj5bmtojkuovku7blhpLms6FcclxuICBpZiAoZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICB9O1xyXG59XHJcbi8qKlxyXG4gKiDliKTmlq3lj4LmlbDmmK/lkKbnm7jlkIxcclxuICogQHBhcmFtIHsqfSBhIFxyXG4gKiBAcGFyYW0geyp9IGIgXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWVwQ29tcGFyZShhLCBiKSB7XHJcbiAgaWYgKHR5cGVvZiBhICE9PSB0eXBlb2YgYikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdjb21wYXJlIGZhaWxlZCwgbm90IHRoZSBzYW1lIHR5cGUnKTtcclxuICB9XHJcbiAgbGV0IHR5cGUgPSB0eXBlb2YgYTtcclxuICBpZiAodHlwZSAhPT0gJ29iamVjdCcpIHtcclxuICAgIHJldHVybiAoYSA9PT0gYilcclxuICB9IGVsc2Uge1xyXG4gICAgZm9yIChsZXQga2V5IGluIGEpIHtcclxuICAgICAgbGV0IHR5cGUgPSB0eXBlb2YgYVtrZXldO1xyXG4gICAgICBpZiAodHlwZSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBpZiAoYVtrZXldICE9PSBiW2tleV0pIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVlcENvbXBhcmUoYVtrZXldLCBiW2tleV0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4vKipcclxuICogdG91Y2gg5LqL5Lu25bGe5oCn5peg5rOV6Kej5p6E6LWL5YC877yM5Lmf5rKh5pyJIG9mZnNldFgg5ZKMb2Zmc2V0WSDvvIzpnIDopoHov5vooYzmoLzlvI/ljJZcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBcclxuICogQHBhcmFtIHthcnJheX0gdG91Y2hlcyBcclxuICovXHJcbmZ1bmN0aW9uIHBhcnNlVG91Y2hlcyhlbGVtZW50LCB0b3VjaGVzKSB7XHJcbiAgbGV0IHsgY2xpZW50VG9wLCBjbGllbnRMZWZ0IH0gPSBlbGVtZW50O1xyXG4gIHJldHVybiBBcnJheS5mcm9tKHRvdWNoZXMpLm1hcChkID0+ICh7XHJcbiAgICBjbGllbnRYOiBkLmNsaWVudFgsXHJcbiAgICBjbGllbnRZOiBkLmNsaWVudFksXHJcbiAgICBmb3JjZTogZC5mb3JjZSxcclxuICAgIGlkZW50aWZpZXI6IGQuaWRlbnRpZmllcixcclxuICAgIHBhZ2VYOiBkLnBhZ2VYLFxyXG4gICAgcGFnZVk6IGQucGFnZVksXHJcbiAgICByYWRpdXNYOiBkLnJhZGl1c1gsXHJcbiAgICByYWRpdXNZOiBkLnJhZGl1c1ksXHJcbiAgICByb3RhdGlvbkFuZ2xlOiBkLnJvdGF0aW9uQW5nbGUsXHJcbiAgICBzY3JlZW5YOiBkLnNjcmVlblgsXHJcbiAgICBzY3JlZW5ZOiBkLnNjcmVlblksXHJcbiAgICBvZmZzZXRYOiBkLmNsaWVudFggLSBjbGllbnRUb3AsXHJcbiAgICBvZmZzZXRZOiBkLmNsaWVudFkgLSBjbGllbnRMZWZ0LFxyXG4gIH0pKVxyXG59XHJcbi8qKlxyXG4gKiDojrflj5blhYPntKDot53nprvlm5vovrnnmoTot53nprtcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBcclxuICogQHBhcmFtIHtudW1iZXJ9IHpvb20gXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB0cmFuc2xhdGUgXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB0cmFuc2Zvcm1PcmlnaW4gXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCb3VuZHMoZWxlbWVudCwgem9vbSwgdHJhbnNsYXRlLCB0cmFuc2Zvcm1PcmlnaW4pIHtcclxuICBsZXQgeyBjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0IH0gPSBlbGVtZW50O1xyXG4gIHJldHVybiB7XHJcbiAgICB0b3A6IHRyYW5zbGF0ZS55IC0gKHRyYW5zZm9ybU9yaWdpbi55ICogKHpvb20gLSAxKSksXHJcbiAgICByaWdodDogKChjbGllbnRXaWR0aCAtIHRyYW5zZm9ybU9yaWdpbi54KSAqICgxIC0gem9vbSkpIC0gdHJhbnNsYXRlLngsXHJcbiAgICBib3R0b206ICgoY2xpZW50SGVpZ2h0IC0gdHJhbnNmb3JtT3JpZ2luLnkpICogKDEgLSB6b29tKSkgLSB0cmFuc2xhdGUueSxcclxuICAgIGxlZnQ6IHRyYW5zbGF0ZS54IC0gKHRyYW5zZm9ybU9yaWdpbi54ICogKHpvb20gLSAxKSksXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldE9mZnNldChldmVudCwgZWxlbWVudCkge1xyXG4gIGxldCB7dGFyZ2V0LCBvZmZzZXRYLCBvZmZzZXRZfSA9IGV2ZW50O1xyXG4gIGlmKHRhcmdldCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQgfHwgZWxlbWVudCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG9mZnNldFgsXHJcbiAgICAgIG9mZnNldFksXHJcbiAgICB9XHJcbiAgfWVsc2Uge1xyXG4gICAgd2hpbGUodGFyZ2V0ICE9PSBlbGVtZW50KSB7XHJcbiAgICAgIG9mZnNldFggKz0gdGFyZ2V0Lm9mZnNldExlZnQ7XHJcbiAgICAgIG9mZnNldFkgKz0gdGFyZ2V0Lm9mZnNldFRvcDtcclxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lm9mZnNldFBhcmVudDtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG9mZnNldFgsXHJcbiAgICAgIG9mZnNldFlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgaXNIVE1MRWxlbWVudCxcclxuICBwcmV2ZW50RGVmYXVsdCxcclxuICBjYW5jZWxCdWJibGUsXHJcbiAgZGVlcENvbXBhcmUsXHJcbiAgcGFyc2VUb3VjaGVzLFxyXG4gIGdldEJvdW5kcyxcclxuICBnZXRPZmZzZXQsXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9