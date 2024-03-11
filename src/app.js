import './components/RptImage.js'
import './components/RptText.js'
import './components/RptDataTable.js'
import './components/RptSidebarProperties.js'
import './properties/RptPropertiesText.js'
import './components/Properties/RptSidebarTextProperties.js'
import initialTemplate from './testTemplate.json'

document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        offsetX: 0,
        offsetY: 0,
        showModal: false,
        currentElement: 0,
        showSidebar: false,
        type: '',
        report: initialTemplate,
        selectedElement: null,
        showTextAccordion: false,
        textColor: '',

        addItem(type) {
            this.report.elements.push({
                type,
                x: 0,
                y: 0,
                value: ''
            })
            this.showModal = false
        },

        destroy(ev) {
            this.report.elements.splice(ev.elementIdx,1)
        },

        allowDrop(ev) {
            ev.preventDefault()
        },

        onFocus(ev) {
            this.showSidebar = true
            this.currentElement = ev.target
            const idx = parseInt( this.currentElement.idx)
            this.type = this.report.elements[idx].type

            //set properties sidebar with values of json
            this.offsetX = this.report.elements[idx].x
            this.offsetY = this.report.elements[idx].y
            Alpine.store('storeProperties').onFocus2(idx, this.report)
            this.Sidebar()

        },

        //Todo refactor this method
        updateProperties(event) {
            const idx = +this.currentElement.idx

            if (event.target.name === 'x' || event.target.name === 'y'){
                this.report.elements[idx][event.target.name] = parseInt(event.target.value)
                return;
            }

            if (event.target.name === 'fontSize'){
                this.report.elements[idx].properties[event.target.name] = `${event.target.value}px`
                return
            }
            this.report.elements[idx].properties[event.target.name] = event.target.value
        },

        Sidebar(){
          const idx = parseInt( this.currentElement.idx)
          this.type =  this.report.elements[idx].type
        },

        /**
         * @param {DragEvent} ev
         **/
        onDrop(ev) {
            const data = JSON.parse(ev.dataTransfer.getData('text'))
            const target = this.report.elements[data.idx]

            const clientRect = ev.target.getBoundingClientRect()
            target.x =  ev.clientX - clientRect.left - data.offsetX
            target.y =  ev.clientY - clientRect.top - data.offsetY
        },
    }))
})


