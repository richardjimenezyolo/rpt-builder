import initialTemplate from "../testTemplate.json";

document.addEventListener('alpine:init', () => {
    Alpine.store('storeProperties', {
        type: '',
        report: initialTemplate,
        fontSize:  16,
        textColor: '',
        fontFamily: '',
        position:'',

        onFocus2(idx, report){
            Alpine.store('storeProperties').type = report.elements[idx].type
            if (report.elements[idx].type === 'rpt-text'){
                Alpine.store('storeProperties').fontSize =  report.elements[idx].properties.fontSize
                Alpine.store('storeProperties').color =  report.elements[idx].properties.color
                Alpine.store('storeProperties').fontFamily =  report.elements[idx].properties.fontFamily
            }
        }
    })
})
