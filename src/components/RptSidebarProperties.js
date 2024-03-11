export default class RptSidebarProperties extends HTMLElement {

    render(){
        this.style.flexGrow = 1
        this.style.paddingLeft = '10px'

        this.innerHTML = `
        <div class="container-sidebar" style="height: 100%">
            <div class="pico side-bar">
                <p x-text="type"></p>
                <details :open="showTextAccordion" x-show="type">
                    <summary class="accordion-rpt">Posición</summary>
                    <div class="container-properties">
                         <div class="row-properties">
                            <label for="x"  style="color: #f1f5f9; font-size: 16px;">Posición X</label>
                            <input name="x"  style="font-size: 16px; padding: 0; width: 30%; height: 30px" x-model="offsetX" x-bind:value="offsetX" type="number" @input="updateProperties">
                            <label for="y"  style="color: #f1f5f9; padding: 0; font-size: 16px;">Posición Y</label>
                            <input name="y"  style="font-size: 16px; padding: 0; width: 30%; height: 30px" x-model="offsetY" x-bind:value="offsetY"  type="number" @input="updateProperties">
                        </div>
                        <div class="row-properties">
                           <label for="width" class="" style="color: #f1f5f9; font-size: 16px;">Ancho</label>
                            <input name="width" class="" style="font-size: 16px; padding: 0; width: 30%; height: 30px" type="number" @input="updateProperties">
                            <label for="height" class="" style="color: #f1f5f9; padding: 0; font-size: 16px;">Alto</label>
                            <input name="height" class="" style="font-size: 16px; padding: 0; width: 30%; height: 30px" type="number" @input="updateProperties">
                        </div>
                    </div>
                </details>
                <rpt-text-properties></rpt-text-properties>
            </div>
        </div>
`
    }

    connectedCallback() {
       this.render()
    }
}
window.customElements.define('rpt-sidebar-properties', RptSidebarProperties)
