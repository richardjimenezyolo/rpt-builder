import Element from './RptElement.js'

class RptImage extends Element {
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

    /**
     *
     * @param {File} file
     * @return {Promise<String>}
     */
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    render() {
        super.render()

        this.innerHTML = ''

        // this.innerHTML = `<img src="${this.element.value}" width="auto" height="auto" draggable="false"/>`

        const img = new Image()
        img.src = this.element.value
        img.draggable = false
        this.appendChild(img)


        this.style.minWidth = '10px'
        this.style.minHeight = '10px'
        this.style.width = 'fit-content'
        this.style.height = 'fit-content'
    }
}

window.customElements.define('rpt-img', RptImage, {extends: 'div'})
