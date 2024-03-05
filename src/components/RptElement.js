export default class RptElement extends HTMLDivElement {
    constructor() {
        super();
        this.element = {}

        this.addEventListener('drag', this.handleDrag)
        this.addEventListener('dragend', this.dragEnd)
        this.addEventListener('dragstart', this.getPosition)
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

    render() {}

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
