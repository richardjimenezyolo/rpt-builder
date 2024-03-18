class RptTableProperties extends HTMLElement {

    constructor() {
        super()
        this.element = Alpine.store('properties')
        this.isHeaderDetailsOpen = false
        this.targetObjetive = null

        this.addEventListener('input', this.whenChange)
        this.addEventListener('click', this.handleClick)
        this.addEventListener('dragstart', this.dragstart)
        this.addEventListener('dragover', this.dragover)
        this.addEventListener('drop', this.dragend)
        this.addEventListener('keydown', this.handleDelete)
    }

    connectedCallback() {
        this.render()
    }

    handleDelete(ev) {
        if (ev.key === 'Delete') {
            const idx = +ev.target.id.split('-')[1]
            this.element.value.headers.splice(idx, 1)
            this.render()
        }

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

        if (ev.target?.name === 'add') {
            if (!this.element.value?.headers) {
                this.element.value = {headers: []}
            }
            this.element.value.headers.push({text: 'Nueva Columna'})
            this.render()
            return
        }
    }

    /**
     *
     * @param { DragEvent } event
     */
    dragstart(event) {
        const [idx] = event.target.id.split('-')
        event.dataTransfer.setData("text", event.target.id);
    }

    /**
     *
     * @param {DragEvent} event
     */
    dragover(event) {
        const target = event.target;
        this.targetObjetive = target
        const [idx, detail] = target.id.split('-')

        if (detail === 'detail') {
            this.clearColorsTargetDiv()

            const topElement = target.previousElementSibling
            const bottomElement = target.nextElementSibling

            bottomElement.style.backgroundColor = 'lightblue'
            topElement.style.backgroundColor = 'lightblue'
        }

        if (detail === 'targetDrop') {
            this.clearColorsTargetDiv()

            const second = target?.nextElementSibling?.nextElementSibling
            target.style.backgroundColor = 'lightblue'
            if (second) {
                second.style.backgroundColor = 'lightblue'
            }
        }
    }

    /**
     *
     * @param {DragEvent} event
     */

    dragend(event) {
        this.clearColorsTargetDiv()
        const [idx, detail] = event.dataTransfer.getData("text").split('-');
        const [idxTarget, targetDrop] = this.targetObjetive.id.split('-')
        if (targetDrop === 'targetDrop') {

            if (this.targetObjetive.previousElementSibling.id === "headers") {
                const elem = this.element.value.headers[parseInt(idx)]
                this.element.value.headers.splice(parseInt(idx), 1)
                this.element.value.headers.unshift(elem)
                this.render()
                return
            }

            const [previousIdx, previousDetail] = this.targetObjetive.previousElementSibling.id.split('-')
            //Todo hacer que se haga el drag and drop en el ultimo div
            if (previousDetail === "detail") {
                const elem = this.element.value.headers[parseInt(idx)]
                this.element.value.headers.splice(parseInt(idx), 1)

                if (parseInt(previousIdx) < parseInt(idx)) {
                    this.element.value.headers.splice(parseInt(previousIdx) + 1, 0, elem)
                } else {
                    this.element.value.headers.splice(parseInt(previousIdx), 0, elem)
                }

                this.render()
                return;
            }
        }
        this.render()
    }

    clearColorsTargetDiv() {
        const divTargets = this.querySelectorAll('.targetDiv')
        divTargets.forEach((elem) => {
            elem.style.backgroundColor = ''
        })
    }

    render() {
        this.innerHTML = `
                <p>${this.element.type}</p>
                <details ${this.isHeaderDetailsOpen ? 'open' : ''} class="headers">
                    <summary id="headers">Cabeceras</summary>
                    ${this.element.value?.headers?.map((el, idx) => `
                    <div style="width: 100%; height: 20px;" id="${idx}-targetDrop" class="targetDiv"></div>
                    <details draggable="true" id="${idx}-detail">
                        <summary id="title-${idx}">${el.text}</summary>
                        <div>
                            <p>Titulo:</p>
                            <input name="${idx}-text" type="text" class="title-header" value="${el.text}" />
                        </div>
                        <div>
                            <p>Valor</p>
                            <input name="${idx}-value" type="text" class="value-header" value="${el.value}" />
                        </div>
                    </details>`).join('')}
                    <div style="width: 100%; height: 20px;" class="targetDiv"></div>

                    <button name="add">Agregar Columna</button>
                </details>
        `

        this.querySelectorAll('div.targetDiv').forEach(el => {
            el.ondragover = (ev) => ev.preventDefault()
        })
    }

}

window.customElements.define('rpt-table-properties', RptTableProperties)
