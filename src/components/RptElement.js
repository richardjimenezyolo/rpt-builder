export default class RptElement extends HTMLDivElement {
    constructor() {
        super();
        this.element = {}
        this.scale = 100

        this.dragOffsetX = 0;
        this.dragOffsetY = 0;

        this.draggable = true;
        this.tabIndex = 0
        this.style.position = 'absolute';
        this.style.cursor = 'pointer';

        // this.addEventListener('drop', (ev) => ev.stopPropagation());
        this.addEventListener('drag', this.handleDrag);
        this.addEventListener('dragend', this.dragEnd);
        this.addEventListener('dragstart', this.getPosition);
        this.addEventListener('focus', this.onFocus)
        this.addEventListener('blur', this.onBlur)
        this.addEventListener('focusout', this.onBlur)
        this.addEventListener('keyup', this.onKeyUp)
        this.onclick = ev => ev.stopPropagation()
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

    connectedCallback() {
        this.render()
    }

    /**
     *
     * @param {DragEvent} ev
     */
    handleDrag(ev) {
        const clientRect = ev.target.parentNode.getBoundingClientRect()
        let x = (ev.clientX - clientRect.left - this.dragOffsetX) / (this.scale / 100)
        let y = (ev.clientY - clientRect.top - this.dragOffsetY) / (this.scale / 100)

        if (x < 0) {
            x = 0
        }

        if (y < 0) {
            y = 0
        }

        this.style.left = `${x}px`
        this.style.top = `${y}px`
    }

    dragEnd(ev) {
        const event = new Event('input')
        event.x = parseFloat(this.style.left)
        event.y = parseFloat(this.style.top)
        event.idx = this.idx
        this.dispatchEvent(event)
    }

    /**
     *
     * @param {DragEvent} ev
     */
    getPosition(ev) {
        ev.dataTransfer.setDragImage(new Image(), 0, 0)
        const clientRect = ev.target.getBoundingClientRect()
        const offsetX = ev.clientX - clientRect.left
        const offsetY = ev.clientY - clientRect.top
        this.dragOffsetX = offsetX;
        this.dragOffsetY = offsetY;
        ev.dataTransfer.setData('text', JSON.stringify({offsetX, offsetY, idx: +this.idx}))
    }

    render() {
        this.style.left = `${this.element.x}px`
        this.style.top = `${this.element.y}px`
    }

    static get observedAttributes() {
        return ['element', 'idx', 'value', 'scale'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        if (this.hasAttribute('element')) {
            this.element = JSON.parse(this.getAttribute('element'))
        }
        this.idx = this.getAttribute('idx')
        this.render();
    }
}
