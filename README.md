# simple-zoom

 ## Start

 run scripts blow then view the examples.

 ```
 $ npm install
 $ npm start
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
let simpleZoom = new SimpleZoom('#simple-zoom',{
  initZoom: 1,
  minZoom: 0.1,
  maxZoom: 10,
  zoomSpeed: 0.2
})
```