import Element from './RptElement.js'

class Image extends Element {
    constructor() {
        super();
        this.addEventListener('dblclick', this.onDbClick)
    }

    onDbClick(ev) {
        const input = document.createElement('input')
        input.type = 'file'
        input.click()
        input.onchange = async (_) => {
            const file = input.files[0]

            const event = new Event('input', {
                bubbles: true
            })

            this.setAttribute('value', await this.getBase64(file))
            this.dispatchEvent(event)

            input.remove()
        }
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    render() {
        this.innerHTML = `
            <div
                class="cube"
                draggable="true"
                @dblclick="onDbClick(idx)"
                style="
                    top: ${this.element.y || 0}px;
                    left: ${this.element.x || 0}px;
                    min-width: 10px;
                    min-height: 10px;
                    width: fit-content;
                    height: fit-content;
                ">
                <img src="${this.element.value}" width="auto" height="auto" draggable="false"/>
            </div>
`
    }
}

window.customElements.define('rpt-img', Image, {extends: 'div'})
