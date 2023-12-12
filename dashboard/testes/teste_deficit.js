const balanco = require('./balanco_atuarial.json')

// console.log(Object.keys(d[0]))

const regimes = ['Previdenciário', 'Mantidos pelo Tesouro']

const ano = '2021'

var anos = []
for (let i = 0; i < regimes.length; i++) {
  // console.log(Object.keys(balanco[0][regimes[i]]['(-) Valor Presente dos Benefícios Futuros (Aposentados)']))
  const p = Object.keys(balanco[0][regimes[i]]['(-) Valor Presente dos Benefícios Futuros (Aposentados)'])
  anos = anos.concat(p)
}
var anos = anos.filter((a, i) => anos.indexOf(a) === i);
console.log(anos)


data = []
for (let a = 0; a < anos.length; a++) {
  var sum = 0
  for (let r = 0; r < regimes.length; r++) {
    if (balanco[0][regimes[r]]['Resultado Atuarial'][anos[a]] != undefined){
      sum += balanco[0][regimes[r]]['Resultado Atuarial'][anos[a]]
    }
  }
  data.push({'x':anos[a], 'y': sum})
}

console.log(data)

out = [
  {
    "id": "Déficit",
    "data":data
  }
]
console.log(out[0])

// console.log(d[0][reg[0]]['Resultado Atuarial'])





