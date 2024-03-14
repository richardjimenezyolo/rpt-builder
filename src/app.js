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
        scale: 100,

        updateElement(ev) {
            this.report.elements[this.currentElementIdx] = ev.element
        },

        updateElementPosition(ev) {
            const element = this.report.elements[ev.idx]
            element.x = ev.x
            element.y = ev.y
            console.clear()
            console.table(this.report.elements.map((el, idx) => ({idx, type: el.type, x: el.x, y: el.y})))
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
    }))
})


