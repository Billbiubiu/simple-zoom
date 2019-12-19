import {
  preventDefault,
  cancelBubble,
  parseTouches,
  getBounds,
} from './utils';
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
  preventDefault(event);
  cancelBubble(event);
  // 获取鼠标位置
  let { clientX, clientY } = event;
  let offsetX = clientX - this.el.clientLeft;
  let offsetY = clientY - this.el.clientTop;
  // 根据缩放幅度和缩放速度计算缩放比例
  let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) * zoomSpeed;
  let newZoom = zoom + delta;
  // 边界情况判断，开启回弹效果
  if (newZoom < minZoom) {
    newZoom = Math.max(minZoom -zoomSpeed, 0);
    setTimeout(() => {
      this.setState(assign({}, this.state, {
        zoom: minZoom
      }))
    }, 200)
  } else if (newZoom > maxZoom) {
    newZoom = maxZoom + zoomSpeed;
    setTimeout(() => {
      this.setState(assign({}, this.state, {
        zoom: maxZoom
      }))
    }, 200)
  } else if (Math.abs(newZoom - 1) < (zoomSpeed / 2)) {
    newZoom = 1;
  }
  // 小于等于初始缩放比例时不允许拖拽，大于初始缩放比例时需要注意不能出界
  if (newZoom <= 1) {
    dragable = false;
    translate = { x: 0, y: 0 };
    transformOrigin = {
      x: (this.el.offsetWidth / 2),
      y: (this.el.offsetHeight / 2),
    }
  } else {
    dragable = true;
    // 避免直接修改原对象
    translate = {
      x: translate.x,
      y: translate.y
    };
    transformOrigin = {
      x: offsetX,
      y: offsetY,
    };
    // 判断缩放后元素有没有出界
    let bounds = getBounds(this.el, newZoom, translate, transformOrigin);
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
  }))
}
/**
 * 鼠标点击进入拖拽模式
 * @param {event} event 
 */
function MouseDown(event) {
  let { dragable, translate } = this.state;
  if (!dragable) return;
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
  preventDefault(event);
  let { clientX, clientY } = event;
  // 计算移动后的 translate
  let newMovingTranslate = {
    x: translate.x + (clientX - moveStart.x),
    y: translate.y + (clientY - moveStart.y),
  }
  // 判断拖拽后元素有没有出界
  let bounds = getBounds(this.el, zoom, newMovingTranslate, transformOrigin);
  for (let side in bounds) {
    if (bounds[side] > padding) {
      switch (side) {
        case 'top':
          newMovingTranslate.y = (transformOrigin.y * (zoom - 1)) + padding;
          break;
        case 'right':
          newMovingTranslate.x = ((this.el.clientWidth - transformOrigin.x) * (1 - zoom)) - padding;
          break;
        case 'bottom':
          newMovingTranslate.y = ((this.el.clientHeight - transformOrigin.y) * (1 - zoom)) - padding;
          break;
        case 'left':
          newMovingTranslate.x = (transformOrigin.x * (zoom - 1)) + padding;
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
    isMouseMoving: false,
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
      this.parentNode.addEventListener('touchmove', this._on['touchmove']);
      this.parentNode.addEventListener('touchend', this._on['touchmoveend']);
    }, 100)
  }
}
/**
 * 移动手指进行拖拽
 * @param {event} event 
 */
function TouchMove(event) {
  let { padding } = this.options;
  let { zoom, translate, touchStart, movingTranslate, transformOrigin } = this.state;
  preventDefault(event);
  let touches = parseTouches(this.parentNode, event.touches);
  let { clientX, clientY } = touches[0];
  let newMovingTranslate = {
    x: translate.x + (clientX - touchStart.x),
    y: translate.y + (clientY - touchStart.y),
  }
  // 判断拖拽后元素有没有出界
  let bounds = getBounds(this.el, zoom, newMovingTranslate, transformOrigin);
  for (let side in bounds) {
    if (bounds[side] > padding) {
      switch (side) {
        case 'top':
          newMovingTranslate.y = (transformOrigin.y * (zoom - 1)) + padding;
          break;
        case 'right':
          newMovingTranslate.x = ((this.el.offsetWidth - transformOrigin.x) * (1 - zoom)) - padding;
          break;
        case 'bottom':
          newMovingTranslate.y = ((this.el.offsetHeight - transformOrigin.y) * (1 - zoom)) - padding;
          break;
        case 'left':
          newMovingTranslate.x = (transformOrigin.x * (zoom - 1)) + padding;
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
    isTouchMoving: false,
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
    this.parentNode.addEventListener('touchmove', this._on['touchzoom']);
    this.parentNode.addEventListener('touchend', this._on['touchzoomend']);
  }
}
/**
 * 移动手指进行缩放
 * @param {event} event 
 */
function TouchZoom(event) {
  preventDefault(event);
  let { minZoom, maxZoom, zoomSpeed } = this.options;
  let { dragable, zoom, translate, transformOrigin, touchZoomTimer, touchDistance } = this.state;
  let touches = parseTouches(this.parentNode, event.touches);
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
  // 小于等于 1 时不允许拖拽，大于 1 时需要注意不能出界
  if (newZoom <= 1) {
    dragable = false;
    translate = { x: 0, y: 0 };
    transformOrigin = {
      x: (this.el.offsetWidth / 2),
      y: (this.el.offsetHeight / 2),
    }
  } else {
    dragable = true;
    // 避免直接修改原对象
    translate = {
      x: translate.x,
      y: translate.y
    };
    transformOrigin = {
      x: (a.offsetX + b.offsetX) / 2,
      y: (a.offsetY + b.offsetY) / 2,
    };
    // 判断缩放后元素有没有出界
    let bounds = getBounds(this.el, newZoom, translate, transformOrigin);
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
    touchDistance: newTouchDistance,
  }))
}
/**
 * 手指抬起退出缩放模式
 */
function TouchZoomEnd() {
  this.setState(assign({}, this.state, {
    isTouchZoom: false
  }))
  this.parentNode.removeEventListener('touchmove', this._on['touchzoom']);
  this.parentNode.removeEventListener('touchmoveend', this._on['touchzoomend'])
}

export {
  MouseWheel,
  MouseDown,
  MouseMove,
  MouseUp,
  TouchMoveStart,
  TouchMove,
  TouchMoveEnd,
  TouchZoomStart,
  TouchZoom,
  TouchZoomEnd,
}