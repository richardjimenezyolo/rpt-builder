import Element from './RptElement.js'

class RptText extends Element {

    #intitialized = false
    connectedCallback() {
        super.connectedCallback()
        this.#intitialized = true

    }

    render() {
        super.render()

        if (!this.#intitialized) {
            this.innerHTML = `<input value="${this.element.value || ''}" style="
                    background: 0;
                    height: 100%;
                    border: 1px dotted black;
                    color: black;
                    text-align: center;
                    ">`
        }

        this.style.width = `${this.element.value ? this.element.value.length + 4 : 16}ch`

        const inputElement = this.querySelector('input');

        inputElement.value = this.element.value
    }
}

window.customElements.define('rpt-text', RptText, {extends: 'div'})
