import './components/RptImage.js'
import './components/RptText.js'
import './components/RptDataTable.js'
import './RptSidebarProperties.js'
const fs = require('fs')

document.addEventListener('alpine:init', () => {
    Alpine.store('scale', 25)
    Alpine.data('main', () => ({
        offsetX: 0,
        offsetY: 0,
        showModal: false,
        currentElementIdx: 0,
        showSidebar: false,
        type: '',
        report: null,
        showTextAccordion: false,
        textColor: '',
        scale: 25,
        path: null,

        init() {
            const params = new URLSearchParams(window.location.search)
            this.path = params.get('path')

            if (this.path) {
                fs.readFile(this.path, 'utf-8', (err, data) => {
                    if (err) {
                        alert(err)
                        return
                    }
                    this.report = JSON.parse(data)
                })
            }

            window.onresize = this.onResize
        },

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
        onResize(event){
            const contenedor = document.querySelector('.main')
            console.log(contenedor.offsetWidth)
            if (contenedor.offsetWidth <= 656){
                Alpine.store('scale', 25)
            }

            if (contenedor.offsetWidth > 656 && contenedor.offsetWidth <= 1382){
                Alpine.store('scale', 50)
                this.removeClass()
            }

            if (contenedor.offsetWidth > 1382 && contenedor.offsetWidth < 1540){
                Alpine.store('scale', 75)
                this.removeClass()
            }

            if (contenedor.offsetWidth > 1540){
                Alpine.store('scale', 100)
                this.removeClass()
            }
        },
        openSideLeft(event){
            event.preventDefault()
            const sideLeft = document.querySelector('#side-left')
            if ( sideLeft.classList.contains('open-side-left')){
                sideLeft.classList.remove('open-side-left')
            } else {
                sideLeft.classList.add('open-side-left')
            }
        },
        openSideRight(event){
            event.preventDefault()
            const sideRight = document.querySelector('#side-right')
            if ( sideRight.classList.contains('open-side-right')){
                sideRight.classList.remove('open-side-right')
            } else {
                sideRight.classList.add('open-side-right')
            }
        },

        removeClass(){
            const sideRight = document.querySelector('#side-right')
            const sideLeft = document.querySelector('#side-left')
            if (sideRight.classList.contains('open-side-right')){
                sideRight.classList.remove('open-side-right')
            }
            if (sideLeft.classList.contains('open-side-left')){
                sideLeft.classList.remove('open-side-left')
            }
        }
    }))
})


