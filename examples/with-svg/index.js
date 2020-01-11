let app = new Vue({
    el: '#app',
    data: {
        simpleZoom: null,
        state: null,
    },
    methods: {
        init() {
            this.initSvg();
            this.initSimpleZoom();
        },
        initSvg() {
            let svg = document.querySelector('#svg');
            let { clientWidth, clientHeight } = svg;
            let d3svg = d3.select(svg);
            let g = d3svg.append('g')
                .attr('width', clientWidth)
                .attr('height', clientHeight)
                .attr('transform', `translate(${clientWidth / 2} ${clientHeight / 2})`)
            let maxRadius = Math.min(clientWidth / 2, clientHeight / 2);
            let initRadius = 1;
            while (initRadius < maxRadius) {
                let radius = initRadius;
                let color = radius % 360;
                let circle = g.append('circle')
                    .attr('cx', 0)
                    .attr('cy', 0)
                    .attr('r', radius)
                    .attr("stroke", d3.hsl(color, 1, .5))
                    .attr("stroke-width", "1")
                    .style("fill", "transparent")
                setInterval(() => {
                    color = color % 360;
                    circle.style('stroke', d3.hsl(color, 1, .5));
                    color -= 10;
                }, 50);
                initRadius += Math.sqrt(initRadius);
            }
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
        }
    },
    mounted() {
        this.init();
    }
})