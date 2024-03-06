import './components/RptImage.js'
import './components/RptText.js'
import initialTemplate from './testTemplate.json'

document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        offsetX: 0,
        offsetY: 0,
        showModal: false,
        currentElement: 0,

        report: initialTemplate,

        addItem(type) {
            this.report.elements.push({
                type,
                x: 0,
                y: 0,
                value: ''
            })
            this.showModal = false
        },

        allowDrop(ev) {
            ev.preventDefault()
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


