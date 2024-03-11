class RptTextProperties extends HTMLElement {

    constructor() {
        super()

        this.element = Alpine.store('properties')

        this.addEventListener('input', this.whenChange)
    }

    whenChange(ev) {
        this.element.properties[ev.target.name] = ev.target.value
        Alpine.store('properties', this.element)
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
                <p>${this.element.type}</p>
                <details>
                    <summary>Texto</summary>
                    <div>
                        <label>Color</label>
                        <input name="color" type="color" value="${this.element.properties.color}">
                    </div>
                    <div>
                        <label>Tamaño de Fuente</label>
                        <input name="size" value="${this.element.properties.size}" type="number">
                    </div>

                    <div>
                        <label>Tipo de Fuente</label>
                        <input name="fontFamily" value="${this.element.properties.fontFamily}" type="text">
                    </div>
                </details>
        `
    }

}

window.customElements.define('rpt-text-properties', RptTextProperties)
