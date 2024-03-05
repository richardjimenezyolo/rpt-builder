document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        offsetX: 0,
        offsetY: 0,
        elements: [{
            "type": "image",
            "value": "data:image/png;base64,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"
        }, { "type": "text", "value": "Reporte de asistencia", "x": 214, "y": 6.453125 }],
        showModal: false,
        currentElement: 0,

        addItem(type) {
            this.elements.push({
                type,
                x: 0,
                y: 0,
                value: ''
            })
            this.showModal = false
        },

        onDbClick(idx) {
            if (this.elements[idx].type !== 'image') return
            this.currentElement = idx;
            this.$refs.fileInp.click()
        },

        /**
         *
         * @param {InputEvent} ev
         */
        async onFileUploaded(ev) {
            const [img] = ev.target.files
            if (!img) return;

            this.elements[this.currentElement].value = await this.getBase64(img)
        },

        allowDrop(ev) {
            ev.preventDefault()
        },
        /**
         * @param {DragEvent} ev
         **/
        onDrop(ev) {
            const target = this.elements[+ev.dataTransfer.getData('text')]

            const y = ev.y - ev.target.offsetTop;
            const x = ev.x - ev.target.offsetLeft
            target.x = x - this.offsetX
            target.y = y - this.offsetY
        },
        handleDrag(ev) {
            ev.target.style.display = 'none'
        },
        dragEnd(ev) {
            ev.target.style.display = 'block'
        },
        /**
         *
         * @param {DragEvent} ev
         * @param {Number} idx
         */
        getPosition(ev, idx) {
            ev.dataTransfer.setData('text', idx)
            const clientRect = ev.target.getBoundingClientRect()
            this.offsetX = ev.clientX - clientRect.left
            this.offsetY = ev.clientY - clientRect.top
        },
        getElementStyles(el) {
            if (el.type === 'image') {
                return `
                    top: ${el.y}px;
                    left: ${el.x}px;
                    min-width: 10px;
                    min-height: 10px;
                    width: fit-content;
                    height: fit-content;
                `
            }
            return `
                    top: ${el.y}px;
                    left: ${el.x}px;
                    width: ${el.value && el.type === 'text' ? el.value.length : 16}rem
                `;
        },

        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }
    }))
})

const changeTheme = () => {
    const theme = document.querySelector('html').getAttribute('data-theme') === 'light' ? 'dark' : 'light'
    document.querySelector('html').setAttribute('data-theme', theme)
}


