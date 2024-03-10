import Element from './RptElement.js'

class RptText extends Element {

    #intitialized = false
    connectedCallback() {
        super.connectedCallback()
        this.#intitialized = true

      this.addEventListener('click', (ev) => {

        const event = new Event('focus')
        this.dispatchEvent(event)
      })
    }

    render() {
        super.render()
        this.style.fontSize = `${this.element?.properties?.size || 16}px`


        if (!this.#intitialized) {
            this.innerHTML = `<input value="${this.element.value || ''}" style="
                    background: 0;
                    height: 100%;
                    border: 1px dotted black;
                    text-align: center;
                    ">`
        }

        this.style.width = `${this.element.value ? this.element.value.length + 4 : 16}ch`
        const inputElement = this.querySelector('input');
        inputElement.style.color = this.element?.properties?.color || 'black'
        inputElement.style.fontSize = `${this.element?.properties?.size || 16}px`
        inputElement.value = this.element.value

    }
}

window.customElements.define('rpt-text', RptText, { extends: 'div' })
