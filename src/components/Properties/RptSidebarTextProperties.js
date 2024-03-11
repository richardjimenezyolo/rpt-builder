import RptSidebarProperties from "../RptSidebarProperties.js";

class RptSidebarTextProperties extends HTMLElement{
    render(){
        this.innerHTML = `
            <div>
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
        `
    }

    connectedCallback(){
        this.render()
    }

}
window.customElements.define('rpt-text-properties', RptSidebarTextProperties)
