let app = {
    data: {
        state: null,
        events: [],
        contentType: 'state',
        // dom
        stateBar: document.querySelector('#state-bar'),
        stateBarContent: document.querySelector('#state-bar .content'),
        openStateBar: document.querySelector('#open-state-bar'),
        closeStateBar: document.querySelector('#close-state-bar'),
        showState: document.querySelector('#show-state'),
        showEvents: document.querySelector('#show-events'),
        resetState: document.querySelector('#reset-state'),
    },
    init() {
        for (let key in app) {
            if (typeof app[key] === 'function') {
                app[key] = app[key].bind(this)
            }
        };
        this.initSimpleZoom();
        this.initEventListeners();
    },
    initSimpleZoom() {
        this.data.simpleZoom = new SimpleZoom('#zoom-item', {
            initZoom: 1,
            minZoom: 0.1,
            maxZoom: 10,
            zoomSpeed: 0.2,
        });
        this.data.state = this.data.simpleZoom.state;
        this.updateContent();
    },
    initEventListeners() {
        let { eventLogger, toggleStateBar, changeContentType } = this;
        let { openStateBar, closeStateBar, showState, showEvents, resetState, simpleZoom } = this.data;

        openStateBar.addEventListener('click', toggleStateBar);
        closeStateBar.addEventListener('click', toggleStateBar);

        showState.addEventListener('click', changeContentType);
        showEvents.addEventListener('click', changeContentType);
        resetState.addEventListener('click', () => {
            simpleZoom.reset();
            this.data.state = simpleZoom.state;
            updateContent();
        })
        simpleZoom.addEventListener('move', eventLogger);
        simpleZoom.addEventListener('zoom', eventLogger);
        simpleZoom.addEventListener('origin-change', eventLogger);

    },
    toggleStateBar() {
        let { openStateBar, stateBar } = this.data;
        openStateBar.classList.toggle('hidden');
        stateBar.classList.toggle('hidden');
    },
    updateContent() {
        let { state, events, stateBarContent, contentType } = this.data;
        if (contentType === 'state') {
            let content = Object.keys(state).map(key => {
                if (typeof state[key] == 'object') {
                    if (state[key] && state[key].hasOwnProperty('x') && state[key].hasOwnProperty('y')) {
                        return `${key}: ( ${state[key].x}, ${state[key].y} )`;
                    } else {
                        return `${key}: ${JSON.stringify(state[key], null, 1).replace(/[\'|\"]/g, '')}`;
                    }
                } else {
                    return `${key}: ${state[key]}`;
                }
            }).join('<br>');
            stateBarContent.innerHTML = content;
        } else {
            let content = events.map(event => {
                return `${event.time}：${event.type}`
            }).join('<br>')
            stateBarContent.innerHTML = content || 'nothing happened...';
            stateBarContent.scrollTop = stateBarContent.scrollHeight;
        }
    },
    changeContentType() {
        let { contentType, showState, showEvents } = this.data;
        showState.classList.toggle('hidden');
        showEvents.classList.toggle('hidden');
        this.data.contentType = (contentType === 'state') ? 'events' : 'state';
        this.updateContent();
    },
    eventLogger(event) {
        this.data.state = event.data;
        let length = this.data.events.push({
            time: event.timestamp,
            type: event.type,
        })
        // 最多显示20条
        if (length > 20) {
            this.data.events = this.data.events.slice(length - 20);
        }
        this.updateContent();
    }
}
app.init();