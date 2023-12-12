const r = require('./est.json')

// console.log(r[0])


// acessar os anos
const anos = Object.keys(r[0])
console.log(typeof(anos.at(-1)))


// acessar os planos dado um ano especifico
const ano = '2017'
const planos = Object.keys(r[0][ano])
// console.log(ano,'-',planos)


const valores = r[0][ano][planos[0]]
// console.log(valores)


// var ano = '2020'


// var planos = []

// if (p.indexOf('Previdenciário')!==-1){
//   planos.push({valor:"prevSelected", funcao:"prev", titulo: "Previdenciário"})
// }
// if (p.indexOf('Financeiro')!==-1){
//   planos.push({valor:"finSelected", funcao:"fin", titulo: "Financeiro"})
// }
// if (p.indexOf('Mantidos pelo Tesouro')!==-1){
//   planos.push({valor:"tesSelected", funcao:"tes", titulo: "Mantidos pelo Tesouro"})
// }

// console.log(p.indexOf('Previdenciário'))

// console.log(planos)

// planos.map((plan)=>{
//   console.log(plan['valor'])
// })