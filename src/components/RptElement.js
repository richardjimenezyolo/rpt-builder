export default class RptElement extends HTMLDivElement {
    constructor() {
        super();
        this.element = {}

        this.draggable = true;
        this.tabIndex = 0
        this.style.position = 'absolute';
        this.style.cursor = 'pointer';

        this.addEventListener('drop', (ev) => ev.stopPropagation());
        this.addEventListener('drag', this.handleDrag);
        this.addEventListener('dragend', this.dragEnd);
        this.addEventListener('dragstart', this.getPosition);
        this.addEventListener('focus', this.onFocus)
        this.addEventListener('blur', this.onBlur)
        this.addEventListener('keyup', this.onKeyUp)
    }

    onKeyUp(ev) {
        if (ev.key === 'Delete') {
            const event = new Event('delete')
            event.elementIdx = +this.idx
            this.dispatchEvent(event)
        }
    }

    onFocus() {
        this.style.border = '1px dotted black'
    }

    onBlur() {
        this.style.border = ''
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
