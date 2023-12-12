const d = require('./arvore.json')

const reg = ['Previdenciário', 'Mantidos pelo Tesouro']

const anos = ['2021']


// console.log(d[0][reg[0]][anos])

// console.log(Object.keys(d[0][reg[0]][anos]['Feminino'][0]))


// console.log(d[0][reg[0]][anos]['Feminino'].length)


var fServidores = 0
var fAposentados = 0
var fPensionistas = 0
var fServIminentes = 0

var mServidores = 0
var mAposentados = 0
var mPensionistas = 0
var mServIminentes = 0

for (let r = 0; r < reg.length; r++) {
  
  var fTamanho = d[0][reg[r]][anos]['Feminino'].length
  for (let t = 0; t < fTamanho; t++) {
    var valores = d[0][reg[r]][anos]['Feminino'][t]
    if(Object.keys(valores)[0] === 'Servidores'){ fServidores += valores['Servidores'] }
    if(Object.keys(valores)[0] === 'Aposentados'){  fAposentados += valores['Aposentados'] }
    if(Object.keys(valores)[0] === 'Pensionistas'){ fPensionistas += valores['Pensionistas'] }
    if(Object.keys(valores)[0] === 'S. Iminentes'){ fServIminentes += valores['S. Iminentes'] }
  }
  
  var mTamanho = d[0][reg[r]][anos]['Masculino'].length
  for (let t = 0; t < mTamanho; t++) {
    var valores = d[0][reg[r]][anos]['Masculino'][t]
    if(Object.keys(valores)[0] === 'Servidores'){ mServidores += valores['Servidores'] }
    if(Object.keys(valores)[0] === 'Aposentados'){  mAposentados += valores['Aposentados'] }
    if(Object.keys(valores)[0] === 'Pensionistas'){ mPensionistas += valores['Pensionistas'] }
    if(Object.keys(valores)[0] === 'S. Iminentes'){ mServIminentes += valores['S. Iminentes'] }
  }


}



var fchildren = []
if (fServidores!==0){ fchildren.push({"name": "Servidores","color": "#c98a61","loc": fServidores})}
if (fAposentados!==0){ fchildren.push({"name": "Aposentados","color": "#e6af8c","loc": fAposentados})}
if (fPensionistas!==0){ fchildren.push({"name": "Pensionistas","color": "#b88f76","loc": fPensionistas})}
if (fServIminentes!==0){ fchildren.push({"name": "S. Iminentes","color": "#dbc3b4","loc": fServIminentes})}

var mchildren = []
if (mServidores!==0){ mchildren.push({"name": "Servidores","color": "#c98a61","loc": mServidores})}
if (mAposentados!==0){ mchildren.push({"name": "Aposentados","color": "#e6af8c","loc": mAposentados})}
if (mPensionistas!==0){ mchildren.push({"name": "Pensionistas","color": "#b88f76","loc": mPensionistas})}
if (mServIminentes!==0){ mchildren.push({"name": "S. Iminentes","color": "#dbc3b4","loc": mServIminentes})}

var data = {
    "name": "Indiv\u00edduo",
    "color": "#1A1A40",
    "children": [{
                    "name": "Feminino",
                    "color": "#ff6500",
                    "children": fchildren
                  },
                  {
                    "name": "Masculino",
                    "color": "#1839c4",
                    "children": mchildren
                  }
                ]
                            
}

console.log(data)


// var data = {
//   "name": "Indiv\u00edduo",
//   "color": "#1A1A40",
//   "children": [{"name": "Feminino",
//                 "color": "#ff6500",
//                 "children": [{"name": "Servidores","color": "#c98a61","loc": 867},
//                              {"name": "Aposentados","color": "#e6af8c","loc": 29},
//                              {"name": "Pensionistas","color": "#b88f76","loc": 35},
//                              {"name": "S. Iminentes","color": "#dbc3b4","loc": 23}
//                   ]// 
//               },
//               {"name": "Masculino",
//                "color": "#1839c4",
//                "children": [{"name": "Servidores","color": "#576bc2","loc": 2022},
//                             {"name": "Aposentados","color": "#59669e","loc": 222},
//                             {"name": "Pensionistas","color": "#596391","loc": 67},
//                             {"name": "S. Iminentes","color": "#7e85a6","loc": 45}
//                   ]
//           }
//   ]
//   }





// regime
// sexo







// var data = [
//   {
//     "name": "Indiv\u00edduo",
//     "color": "#1A1A40",
//     "children": []

//   }
// ]