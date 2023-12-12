import React, {useContext} from 'react'
import { ResponsiveTreeMap } from '@nivo/treemap'
import './arvore.css'

import { municipio } from '../../Context/Context'

const Arvore = () => {
  const {mun, ano, reg, estadoPai} = useContext(municipio);
  const d = require('../data/' + estadoPai + '/' + mun[0][1] + '/arvore_inicial.json')

  // const data = require('./data.json')

  var fServidores = 0
  var fAposentados = 0
  var fPensionistas = 0
  var fServIminentes = 0

  var mServidores = 0
  var mAposentados = 0
  var mPensionistas = 0
  var mServIminentes = 0

  if (d[0][reg[0]][ano] != undefined){

    for (let r = 0; r < reg.length; r++) {
      
      var fTamanho = d[0][reg[r]][ano]['Feminino'].length
      for (let t = 0; t < fTamanho; t++) {
        var valores = d[0][reg[r]][ano]['Feminino'][t]
        if(Object.keys(valores)[0] === 'Servidores'){ fServidores += valores['Servidores'] }
        if(Object.keys(valores)[0] === 'Aposentados'){  fAposentados += valores['Aposentados'] }
        if(Object.keys(valores)[0] === 'Pensionistas'){ fPensionistas += valores['Pensionistas'] }
        if(Object.keys(valores)[0] === 'S. Iminentes'){ fServIminentes += valores['S. Iminentes'] }
      }
      
      var mTamanho = d[0][reg[r]][ano]['Masculino'].length
      for (let t = 0; t < mTamanho; t++) {
        var valores = d[0][reg[r]][ano]['Masculino'][t]
        if(Object.keys(valores)[0] === 'Servidores'){ mServidores += valores['Servidores'] }
        if(Object.keys(valores)[0] === 'Aposentados'){  mAposentados += valores['Aposentados'] }
        if(Object.keys(valores)[0] === 'Pensionistas'){ mPensionistas += valores['Pensionistas'] }
        if(Object.keys(valores)[0] === 'S. Iminentes'){ mServIminentes += valores['S. Iminentes'] }
      }
    }
  }

  var fchildren = []
  if (fServidores!==0){ fchildren.push({"name": "Servidores","color": "#c98a61","loc": fServidores})}
  if (fAposentados!==0){ fchildren.push({"name": "Aposentados","color": "#e6af8c","loc": fAposentados})}
  if (fPensionistas!==0){ fchildren.push({"name": "Pensionistas","color": "#b88f76","loc": fPensionistas})}
  if (fServIminentes!==0){ fchildren.push({"name": "S. Iminentes","color": "#dbc3b4","loc": fServIminentes})}

  var mchildren = []
  if (mServidores!==0){ mchildren.push({"name": "Servidores","color": "#576bc2","loc": mServidores})}
  if (mAposentados!==0){ mchildren.push({"name": "Aposentados","color": "#59669e","loc": mAposentados})}
  if (mPensionistas!==0){ mchildren.push({"name": "Pensionistas","color": "#596391","loc": mPensionistas})}
  if (mServIminentes!==0){ mchildren.push({"name": "S. Iminentes","color": "#7e85a6","loc": mServIminentes})}

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




  return (
    <ResponsiveTreeMap
        data={data}
        tile="sliceDice"
        identity="name"
        value="loc"

        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        colors={{datum: 'data.color'}}
        parentLabelSize={16}
        nodeOpacity={0.6}
        parentLabelTextColor='#fff'
        labelTextColor ='#fff'
        borderWidth={0.5}
        borderColor="#ffffff"
        
        parentLabelPosition="top"
        

    />
  )
}

export default Arvore
