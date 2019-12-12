# simple-zoom
simple-zoom provide a simple way to zoom your dom.
send me a mail: <1607786753@qq.com>

 ## Captures

 - zoom in
  <img src="/captures/zoom-in.gif" style="width: 20em;">
 - zoom out
  <img src="/captures/zoom-out.gif" style="width: 20em;">
 - drag move
  <img src="/captures/drag-move.gif" style="width: 20em;">

 ## Start

 - dev
  run scripts blow then view the examples.
  ```
  $ npm install
  $ npm start
  ```
- build
  ```
  $npm run build
  ```

## Usage
- import
  ```
  import SimpleZoom from 'simple-zoom'
  import 'simple-zoom.css'
  ```
  or
  ```
  <link rel="stylesheet" href="simple-zoom.css">
  <scrpit src="simple-zoom.js"></scrpit>
  ```

- init

  ```
  let simpleZoom = new SimpleZoom('#simple-zoom', {
    zoomable: true,   // 是否允许缩放
    dragable: true,   // 是否允许拖拽
    initZoom: 1,      // 初始缩放比例
    minZoom: 0.1,     // 最小缩放比例
    maxZoom: 10,      // 最大缩放比例
    zoomSpeed: 0.2,   // 滚轮缩放速度
    padding: 0,       // 最大内边距
  })
  ```