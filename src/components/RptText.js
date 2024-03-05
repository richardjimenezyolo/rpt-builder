import Element from './RptElement.js'

class RptText extends Element {

    #intitialized = false
    connectedCallback() {
        this.render()
        this.#intitialized = true

    }

    render() {
        if (!this.#intitialized) {
            this.innerHTML = `
            <div class="cube" draggable="true">
                <input
                    value="${this.element.value || ''}"
                    style="
                    background: 0;
                    height: 100%;
                    border: 0;
                    color: black;
                    text-align: center;
                    "
                >
            </div>
        `
        }

        const div = this.querySelector('div');

        div.style.top = `${this.element.y}px`
        div.style.left = `${this.element.x}px`
        div.style.width = `${this.element.value ? this.element.value.length + 4 : 16}ch`

        const inputElement = this.querySelector('input');

        inputElement.value = this.element.value
    }
}

window.customElements.define('rpt-text', RptText, {extends: 'div'})
