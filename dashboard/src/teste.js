

const prev = require('/home/claudio/Documentos/controle_atuarial/backend/data/MG/01587109000130/balanco_atuarial_Previdenciário.json')
const fin = require('/home/claudio/Documentos/controle_atuarial/backend/data/MG/01587109000130/balanco_atuarial_Financeiro.json')
const tes = require('/home/claudio/Documentos/controle_atuarial/backend/data/MG/01587109000130/balanco_atuarial_Mantidos pelo Tesouro.json')

if (Object.keys(prev[0]).length > 2) {
    console.log('ok')
    var option_prev =  ('<option key = {prev}>Previdenciário</option>')
}else{
    var option_prev =  ('<></>')
}


if (Object.keys(fin[0]).length > 2) {
    console.log('ok')
    var option_fin =  ('<option key = {fin}>Financeiro</option>')
}else{
    var option_fin =  ('<></>')
}



if (Object.keys(tes[0]).length > 2) {
    console.log('ok')
    var option_tes =  ('<option key = {tes}>Tesouro</option>')
}else{
    var option_tes =  ('<></>')
}



console.log(Object.keys(fin[0]).length)
console.log(option_prev)
console.log(option_fin)
console.log(option_tes)


console.log(Object.keys(prev[0]).length)