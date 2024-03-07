import './components/RptImage.js'
import './components/RptText.js'
import './components/RptDataTable.js'
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
            console.log(ev.target)
            this.Sidebar()
        },

        updateProperties(event) {
            const idx = +this.currentElement.idx
            this.report.elements[idx].properties.color = event.target.value
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


