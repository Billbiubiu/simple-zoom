/**
 * 判断是否为 HTMLElement
 * @param {*} obj 
 */
function isHTMLElement(element) {
  if (typeof HTMLElement === 'object') {
    return (element instanceof HTMLElement);
  } else {
    return (element && typeof element === 'object' && element.nodeType === 1 && typeof element.nodeName === 'string');
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
    return (a === b)
  } else {
    for (let key in a) {
      let type = typeof a[key];
      if (type !== 'object') {
        if (a[key] !== b[key]) {
          return false;
        }
      } else {
        deepCompare(a[key], b[key])
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
    offsetY: d.clientY - clientLeft,
  }))
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
    top: translate.y - (transformOrigin.y * (zoom - 1)),
    right: ((clientWidth - transformOrigin.x) * (1 - zoom)) - translate.x,
    bottom: ((clientHeight - transformOrigin.y) * (1 - zoom)) - translate.y,
    left: translate.x - (transformOrigin.x * (zoom - 1)),
  }
}
function getOffset(event, element) {
  let {target, offsetX, offsetY} = event;
  if(target instanceof SVGElement || element instanceof SVGElement) {
    return {
      offsetX,
      offsetY,
    }
  }else {
    while(target !== element) {
      offsetX += target.offsetLeft;
      offsetY += target.offsetTop;
      target = target.offsetParent;
    }
    return {
      offsetX,
      offsetY
    }
  }
}

export {
  isHTMLElement,
  preventDefault,
  cancelBubble,
  deepCompare,
  parseTouches,
  getBounds,
  getOffset,
}