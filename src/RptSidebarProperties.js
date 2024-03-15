import './properties/RptTextProperties.js'
import './properties/RptTableProperties.js'

class RptSidebarProperties extends HTMLElement {

    static oldIdx = 0

    constructor() {
        super()
        this.element = {}
        this.addEventListener('input', this.whenPositionChange)
    }

    connectedCallback() {
        this.render()
    }

    /**
     *
     * @param {InputEvent} ev
     */
    whenPositionChange(ev) {
        this.element[ev.target.name] = +ev.target.value
        const event = new Event('update')
        event.element = this.element
        this.dispatchEvent(event)
    }

    render() {
        this.style.maxWidth = '20%'
        if (this.oldIdx == this.idx) {
            this.oldIdx = this.idx
            return
        }

        this.style.flexGrow = 1
        this.style.paddingLeft = '10px'
        this.innerHTML = `
            <div class="pico side-bar properties-container">
                <div>
                    <div>
                        <label for="x">Posición X</label>
                        <input name="x" value="${this.element.x}" type="number"  style="font-size: 16px; padding: 0; width: 30%; height: 30px" >
                    </div>
                    <div>
                        <label for="y">Posición Y</label>
                        <input name="y" value="${this.element.y}" type="number"  style="font-size: 16px; padding: 0; width: 30%; height: 30px" >
                    </div>
                </div>

                <${this.element.type}-properties />
            </div>
          `
        this.oldIdx = this.idx
    }

    static observedAttributes = ['element', 'idx']

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = JSON.parse(newVal)
        setTimeout(() => {
            this.render()
        })
    }

}

window.customElements.define('rpt-sidebar-properties', RptSidebarProperties)
