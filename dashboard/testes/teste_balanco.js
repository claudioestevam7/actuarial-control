const balanco = require('./balanco.json')


const contas = [
  "(-) Valor Presente dos Benefícios Futuros (Aposentados)",  
  "(+) Valor Presente das Contribuições Futuras Participante (Aposentados)",
  "(-) Valor Presente dos Benefícios Futuros (Pensionistas)",
  "(+) Valor Presente das Contribuições Futuras Participante (Pensionistas)",
  "(+) Valor da Compensação Previdenciária (Beneficios Concedidos)",
  "(=) Reserva Matemática de Benefícios Concedidos (RMB - Concedidos)",
  "(-) Valor Presente dos Benefícios Futuros (A Conceder)",
  "(+) Valor Presente das Contribuições Futuras Patrocinador",
  "(+) Valor Presente das Contribuições Futuras Participante",
  "(+) Valor da Compensação Previdenciária (Beneficios a Conceder)",
  "(=) Reserva Matemática de Benefícios a Conceder (RMB a Conceder)",
  "(=) Reserva Matemática (RMBC + RMBaC)",
  "(+) Valor Presente dos Acordos de Parcelamentos",
  "(+) Ativo Líquido do Plano",
  "(=) Ativo Total do Plano",
  "Resultado Atuarial"
]


//  cuidar para que sempre chege um veto com os regimes disponiveis
const regimes = ['Previdenciário']

// console.log(Object.keys(balanco[0][regimes[0]]['(-) Valor Presente dos Benefícios Futuros (Aposentados)']))
// const anos = Object.keys(balanco[0][regimes[0]]['(-) Valor Presente dos Benefícios Futuros (Aposentados)'])


//  retornar os anos que tem algum regime
// console.log(balanco[0])

var anos = []
for (let i = 0; i < regimes.length; i++) {
  console.log(Object.keys(balanco[0][regimes[i]]['(-) Valor Presente dos Benefícios Futuros (Aposentados)']))
  const p = Object.keys(balanco[0][regimes[i]]['(-) Valor Presente dos Benefícios Futuros (Aposentados)'])
  anos = anos.concat(p)
}
var anos = anos.filter((a, i) => anos.indexOf(a) === i);
console.log(anos)


// retornar matriz com os dados do corpo
var data = []
for (let c = 0; c < contas.length; c++) {
  var linha = []
  for (let a = 0; a< anos.length; a++) {
    
    var sum = 0
    for (let r = 0; r < regimes.length; r++) {
      if (balanco[0][regimes[r]][contas[c]][anos[a]] !== undefined){

        sum += balanco[0][regimes[r]][contas[c]][anos[a]]

      }
      // console.log(balanco[0][regimes[r]][contas[c]][anos[a]])
    }
    linha.push(sum)
  }
  data[c] = linha
}

// console.log(data)




// data.map((row)=>{
//   console.log(row)
//   row.map((ano)=>{
//     console.log(ano)
//   })
// })

// const t = [[1,2],[5,8]]

// t.map((i)=>{
//   console.log(i)
// })


// var l = {}

// l.push({'h':1})
// l[7] = 4
// console.log(l)




// for (let index = 0; index < regimes.length; index++) {
//   for (let i = 0; i < anos.length; i++) {


//     conta_1 += balanco[0][regimes[index]]['conta_1'][anos[i]]
    
    
//     // c_a += balanco[0]['Previdenciário']['conta_1']
    
    
//   }     
  
// }

// console.log(conta_1)


