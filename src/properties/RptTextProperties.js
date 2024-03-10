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
            <table>
                <tr>
                    <td>Font Color</td>
                    <td><input name="color" value="${this.element.properties.color}" type="color" /></td>
                </tr>
                <tr>
                    <td>Font Size</td>
                    <td><input name="size" value="${this.element.properties.size || 16}" type="number" /></td>
                </tr>
            </table>

        `

    }

}

window.customElements.define('rpt-text-properties', RptTextProperties)
