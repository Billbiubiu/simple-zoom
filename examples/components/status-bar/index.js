Vue.component('status-bar', {
  template: `
  <div class="status-bar">
    <div style="cursor: pointer;" v-if="!show" @click="show=true">· · ·</div>
    <block v-else>
      <div class="header">
        <span class="title">state</span>
      </div>
      <div class="content">
        <span>zoomable: <span class="orange">{{state.zoomable}}</span></span></span><br>
        <span>dragable: <span class="orange">{{state.dragable}}</span></span><br>
        <span>isMouseMoving: <span class="orange">{{state.isMouseMoving}}</span></span><br>
        <span>isTouchMoving: <span class="orange">{{state.isTouchMoving}}</span></span><br>
        <span>isTouchZoom: <span class="orange">{{state.isTouchZoom}}</span></span><br>
        <span>zoom: <span class="orange">{{state.zoom}}</span></span><br>
        <span>transformOrigin: <span class="orange">( {{state.transformOrigin.x}}, {{state.transformOrigin.y}})</span></span><br>
        <span>translate: <span class="orange">( {{state.translate.x}}, {{state.translate.y}} )</span></span><br>
        <span>moveStart: <span class="orange">( {{state.moveStart.x}}, {{state.moveStart.y}} )</span></span><br>
        <span>movingTranslate: <span class="orange">( {{state.movingTranslate.x}}, {{state.movingTranslate.y}} )</span></span><br>
        <span>touchStart: <span class="orange">( {{state.touchStart.x}}, {{state.touchStart.y}} )</span></span><br>
        <span>touchDistance: <span class="orange">{{state.touchDistance}}</span></span>
      </div>
      <div class="footer">
        <button @click="show=false">关闭</button>
      </div>
    </block>
  </div>
  `,
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    }
  },
})