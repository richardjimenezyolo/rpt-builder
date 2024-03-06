export default class RptElement extends HTMLDivElement {
    constructor() {
        super();
        this.element = {}

        this.draggable = true;
        this.style.position = 'absolute';
        this.style.cursor = 'pointer';
        this.addEventListener('drop', (ev) => {ev.stopPropagation()});
        this.addEventListener('drag', this.handleDrag);
        this.addEventListener('dragend', this.dragEnd);
        this.addEventListener('dragstart', this.getPosition);
    }

    connectedCallback(){
        this.render()
    }

    handleDrag(ev) {
        ev.target.style.display = 'none'
    }
    dragEnd(ev) {
        ev.target.style.display = 'block'
    }

    /**
     *
     * @param {DragEvent} ev
     */
    getPosition(ev) {
        const clientRect = ev.target.getBoundingClientRect()
        const offsetX = ev.clientX - clientRect.left
        const offsetY = ev.clientY - clientRect.top
        ev.dataTransfer.setData('text', JSON.stringify({offsetX, offsetY, idx: +this.idx}))
    }

    render() {
        this.style.left = `${this.element.x}px`
        this.style.top = `${this.element.y}px`
    }

    static get observedAttributes() { return ['element', 'idx', 'value']; }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        if (this.hasAttribute('element')) {
            this.element = JSON.parse(this.getAttribute('element'))
        }
        this.idx = this.getAttribute('idx')
        this.render();
    }
}
