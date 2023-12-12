const r = require('./est.json')

//  nao deixar chegar um vetor com planos que nao exixta no municipio
const regimes = ['Previdenciário', 'Mantidos pelo Tesouro']
const ano = ["2021"]

var servidores = 0
var aposentados = 0
var pensionistas = 0
var servidores_iminentes = 0

console.log(r[0])


for (let index_ano = 0; index_ano < ano.length; index_ano++) {

  for (let index = 0; index < regimes.length; index++) {
    console.log(Object.keys(r[0][regimes[index]][ano[index_ano]]).indexOf('Pensionistas'))
    const i_serv = Object.keys(r[0][regimes[index]][ano[index_ano]]).indexOf('Servidores')
    if (i_serv !== -1) {
      servidores += r[0][regimes[index]][ano[index_ano]]['Servidores']
    }
    const i_apos = Object.keys(r[0][regimes[index]][ano[index_ano]]).indexOf('Aposentados')
    if (i_apos !== -1) {
      aposentados += r[0][regimes[index]][ano[index_ano]]['Aposentados']
    }
    const i_pen = Object.keys(r[0][regimes[index]][ano[index_ano]]).indexOf('Pensionistas')
    if (i_pen !== -1) {
      pensionistas += r[0][regimes[index]][ano[index_ano]]['Pensionistas']
      console.log(r[0][regimes[index]][ano[index_ano]]['Pensionistas'])
      console.log(pensionistas)
    }
    const i_serv_im = Object.keys(r[0][regimes[index]][ano[index_ano]]).indexOf('S. Iminentes')
    if (i_serv_im !== -1) {
      servidores_iminentes += r[0][regimes[index]][ano[index_ano]]['S. Iminentes']
    }

  }
}

var data = []

if (servidores !== 0) {
  data.push({
    "id": "Servidores",
    "label": "Servidores",
    "color": "rgb(40, 219, 198)",
    "value": servidores
  })
}
if (aposentados !== 0) {
  data.push({
    "id": "Aposentados",
    "label": "Aposentados",
    "color": "rgb(217, 104, 17)",
    "value": aposentados
  })
}
if (pensionistas !== 0) {
  data.push({
    "id": "Pensionistas",
    "label": "Pensionistas",
    "color": "rgb(45, 116, 239)",
    "value": pensionistas
  })
}
if (servidores_iminentes !== 0) {
  data.push({
    "id": "Servidores Imi.",
    "label": "Servidores Imi.",
    "color": "rgb(247, 243, 109)",
    "value": servidores_iminentes
  })
}


console.log(data)

