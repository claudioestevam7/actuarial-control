const balanco = require('./data.json')

const reg = ['Previdenciário', 'Mantidos pelo Tesouro']

const index = 'Resultado Atuarial'

console.log(balanco[0][reg[0]][index])
console.log(balanco[0][reg[1]][index])

var anos = []
    for (let i = 0; i < reg.length; i++) {
        const p = Object.keys(balanco[0][reg[i]][index])
        anos = anos.concat(p)
    }
var anos = anos.filter((a, i) => anos.indexOf(a) === i);

console.log(anos)

    // retornar matriz com os dados do corpo
var out = []
  for (let a = 0; a < anos.length; a++) {
      var sum = 0
      for (let r = 0; r < reg.length; r++) {
          if (balanco[0][reg[r]][index][anos[a]] !== undefined) {
              sum += balanco[0][reg[r]][index][anos[a]]
          }
      }
      out.push({'x':anos[a], 'y': sum})
  }


data = [
  {
    "id": "Déficit",
    "data": out
  }
]

console.log(data[0])
