import './properties/RptTextProperties'

class RptSidebarProperties extends HTMLElement {

  constructor() {
    super()
    this.element = {}
  }

  static oldIdx = 0

  connectedCallback() {

    this.render()
  }

  render() {
    this.style.maxWidth = '20%'
    if (this.oldIdx == this.idx) {
      this.oldIdx = this.idx
      return
    }

    this.style.flexGrow = 1
    this.style.paddingLeft = '10px'

    console.log(this.element.type)
    this.innerHTML = `
            <div class="pico side-bar">
                <${this.element.type}-properties />
            </div>
          `
    this.oldIdx = this.idx
  }

  static observedAttributes = ['element', 'idx']

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = JSON.parse(newVal)
    this.render()
  }

}
window.customElements.define('rpt-sidebar-properties', RptSidebarProperties)
