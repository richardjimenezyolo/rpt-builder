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
                    <div class="container-properties">
                         <div class="row-properties">
                            <label for="color" class="element-property" style="color: #f1f5f9; font-size: 16px;">Color</label>
                            <input name="color" class="element-property" style="padding: 0; width: 40%; height: 30px"  x-model="$store.storeProperties.color" type="color" @input="updateProperties">
                        </div>
                        <div class="row-properties">
                            <label for="fontSize" class="element-property" style="color: #f1f5f9; font-size: 16px;">Tamaño de Fuente</label>
                            <input name="fontSize" style="height: 10px; padding-left: 0; width: 40%; font-size: 17px;" class="element-property" x-model="$store.storeProperties.fontSize" type="number" @input="updateProperties">
                        </div>

                         <div class="row-properties">
                            <label for="fontFamily" class="element-property" style="color: #f1f5f9; font-size: 16px;">Tipo de Fuente</label>
                            <input name="fontFamily" style="height: 10px; padding-left: 0; width: 40%; font-size: 17px" class="element-property" x-model="$store.storeProperties.fontFamily" type="text" @input="updateProperties">
                        </div>
                    </div>
                </details>
            </div>
        </div>
`
    }



}
window.customElements.define('rpt-sidebar-properties', RptSidebarProperties)
