class RptTableProperties extends HTMLElement {

    constructor() {
        super()
        this.element = Alpine.store('properties')
        this.isHeaderDetailsOpen = false

        this.addEventListener('input', this.whenChange)
        this.addEventListener('click', this.handleClick)
    }

    connectedCallback() {
        this.render()
    }

    /**
     *
     * @param {InputEvent} ev
     */
    whenChange(ev) {
        ev.stopPropagation()
        const [idx, key] = ev.target.name.split('-')
        if (key === 'text') {
            this.querySelector(`#title-${idx}`).textContent = ev.target.value
        }
        this.element.value.headers[idx][key] = ev.target.value
    }

    /**
     *
     * @param {PointerEvent} ev
     */
    handleClick(ev) {
        if (ev.target.id === 'headers') {
            this.isHeaderDetailsOpen = !this.isHeaderDetailsOpen
            return
        }

        if (ev.target.name === 'add') {
            if (!this.element.value?.headers) {
                this.element.value = {headers: []}
            }
            this.element.value.headers.push({text: 'Nueva Columna'})
            this.render()
            return
        }

        if (ev.target.name.split('-')[1] === 'del') {
            const [idx] = ev.target.name.split('-')
            this.element.value.headers.splice(idx, 1)
            this.render()
            return
        }
    }

    render() {
        this.innerHTML = `
                <p>${this.element.type}</p>
                <details ${this.isHeaderDetailsOpen ? 'open' : ''}>
                    <summary id="headers">Cabeceras</summary>
                    ${this.element.value?.headers?.map((el, idx) => `
                    <details>
                        <summary id="title-${idx}">${el.text}</summary>
                        <div>
                            <p>Titulo:</p>
                            <input name="${idx}-text" type="text" value="${el.text}" />
                        </div>
                        <div>
                            <p>Valor</p>
                            <input name="${idx}-value" type="text" value="${el.value}" />
                        </div>
                        <div>
                            <button name="${idx}-del" >del</button>
                        </div>
                    </details>`).join('')}
                    <button name="add">Agregar Columna</button>
                </details>
        `
    }

}

window.customElements.define('rpt-table-properties', RptTableProperties)
