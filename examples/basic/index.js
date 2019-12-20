let app = new Vue({
    el: '#app',
    data: {
        simpleZoom: null,
        state: null,
    },
    methods: {
        init() {
            this.initSimpleZoom();
        },
        initSimpleZoom() {
            this.simpleZoom = new SimpleZoom('#zoom-item', {
                zoomable: true,   // 是否允许缩放
                dragable: true,   // 是否允许拖拽
                initZoom: 1,      // 初始缩放比例
                minZoom: 1,     // 最小缩放比例
                maxZoom: 5,      // 最大缩放比例
                zoomSpeed: 0.1,   // 滚轮缩放速度
                padding: 0,       // 最大内边距
            });
            this.state = this.simpleZoom.state;
            this.simpleZoom.addEventListener('updated', (event) => {
                this.state = event.data;
            })
        },
    },
    mounted() {
        this.init();
    }
})