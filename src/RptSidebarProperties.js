class RptSidebarProperties extends HTMLElement {
    connectedCallback() {
        this.style.flexGrow = 1
        this.style.paddingLeft = '10px'

        this.innerHTML = `
        <div class="container-sidebar" style="height: 100%">
            <div class="pico side-bar">
                <p x-text="type"></p>
                <details :open="showTextAccordion" x-show="type === 'rpt-text'">
                    <summary class="accordion-rpt">Texto</summary>
                    <div class="container-input-color-rpt">
                        <input x-mode="textColor" type="color" @input="updateProperties">
                    </div>
                </details>
            </div>
        </div>
`
    }
}
window.customElements.define('rpt-sidebar-properties', RptSidebarProperties)
