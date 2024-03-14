import './components/RptImage.js'
import './components/RptText.js'
import './components/RptDataTable.js'
import './RptSidebarProperties.js'
import initialTemplate from './testTemplate.json'

document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        offsetX: 0,
        offsetY: 0,
        showModal: false,
        currentElementIdx: 0,
        showSidebar: false,
        type: '',
        report: initialTemplate,
        showTextAccordion: false,
        textColor: '',
        scale: 50,

        updateElement(ev) {
            this.report.elements[this.currentElementIdx] = ev.element
        },

        addItem(type) {
            this.report.elements.push({
                type,
                x: 0,
                y: 0,
                value: '',
                properties: {}
            })
            this.showModal = false
        },

        destroy(ev) {
            this.report.elements.splice(ev.elementIdx, 1)
        },

        allowDrop(ev) {
            ev.preventDefault()
        },

        onFocus(ev) {
            this.currentElementIdx = +ev.target.idx
            Alpine.store('properties', this.report.elements[ev.target.idx])
        },

        //Todo convertir estos dos metodos en uno mismo ya que se repite lo mismo
        openSideLeft(event){
            event.preventDefault()
            const sideLeft = document.querySelector('#side-left')
           if ( sideLeft.classList.contains('open-side-left')){
               sideLeft.classList.remove('open-side-left')
               sideLeft.classList.add('close-side-left')
           } else {
               sideLeft.classList.add('open-side-left')
               sideLeft.classList.remove('close-side-left')
           }
        },
        openSideRight(event){
            event.preventDefault()
            console.log(event)
            const sideRight = document.querySelector('#side-right')
            if ( sideRight.classList.contains('open-side-right')){
                sideRight.classList.remove('open-side-right')
                sideRight.classList.add('close-side-right')
            } else {
                sideRight.classList.add('open-side-right')
                sideRight.classList.remove('close-side-right')
            }
        },

        /**
         * @param {DragEvent} ev
         **/
        onDrop(ev) {
            const data = JSON.parse(ev.dataTransfer.getData('text'))
            const target = this.report.elements[data.idx]

            const clientRect = ev.target.getBoundingClientRect()
            target.x = (ev.clientX - clientRect.left - data.offsetX) / (this.scale / 100)
            target.y = (ev.clientY - clientRect.top - data.offsetY) / (this.scale / 100)
        },
    }))
})


