import RptElement from "./RptElement.js";

class RptDataTable extends RptElement {
    constructor() {
        super();
    }

    render() {
        super.render()

        if (!this.element.value) {
            this.innerHTML = '<p>No data</p>'
            return
        }

        this.style.fontSize = '9px'
        const headers = this.element.value.headers.map(el => el.text)

        this.innerHTML = `
                <table data-theme="light">
                    <tr>
                        ${headers.map(el => `<th><strong>${el}</strong></th>`).join(' ')}
                    </tr>
                </table>
        `
    }
}

window.customElements.define('rpt-table', RptDataTable, {extends: 'div'})
