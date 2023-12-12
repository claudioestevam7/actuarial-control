import React from 'react'
import { useContext } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'

import { municipio } from '../../Context/Context'

const Deficit = () => {

  const {mun, reg, estadoPai} = useContext(municipio);

  const balanco = require('../data/' + estadoPai +'/' + mun[0][1] + '/balanco_atuarial.json')


  var anos = []
  for (let i = 0; i < reg.length; i++) {
    const p = Object.keys(balanco[0][reg[i]]['(-) Valor Presente dos Benefícios Futuros (Aposentados)'])
    anos = anos.concat(p)
  }
  var anos = anos.filter((a, i) => anos.indexOf(a) === i);

  var out = []
  for (let a = 0; a < anos.length; a++) {
    var sum = 0
    for (let r = 0; r < reg.length; r++) {
      if (balanco[0][reg[r]]['Resultado Atuarial'][anos[a]] != undefined){
        sum += balanco[0][reg[r]]['Resultado Atuarial'][anos[a]]
      }
    }
    out.push({'x':anos[a], 'y': sum})
  }


  const data = [
    {
      "id": "Resultado",
      "data": out
    }
  ]

  return (
    <ResponsiveLine
    data={data}
    margin={{ top: 25, right: 25, bottom: 30, left: 20 }}
    xScale={{ type: 'point' }}
    yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
    }}
    yFormat={value =>
      `R$ ${Number(value).toLocaleString('PT-BR', {
          minimumFractionDigits: 2,
      })}`
  }
    enableArea={true}
      
    /* curve={select('curve', curveOptions, 'linear')} */

    
    defs={[
        linearGradientDef('gradientA', [
            { offset: 0, color: '#fff' },
            { offset: 100, color: '#1E1E1E', opacity: 1 },
        ]),
    ]}
    fill={[{ match: '*', id: 'gradientA' }]}
    curve="natural"
    axisTop={null}
    axisRight={null}
    axisLeft={null}
    enableGridX={false}
    enableGridY={false}
    /* colors={{ scheme: 'nivo' }} */
    /* colors={{ scheme: 'purple_blue' }} */
    colors={['#fff']}
    theme={{
      fill: {color:"#000"},
      axis: { 
        ticks: { text: { fontSize: 12,fill:'#fff'}},
              legend:{text:{fontSize:12, fill:'#fff'}}}}

    }
    lineWidth={3}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor', modifiers: [] }}
    enablePointLabel={true}
    pointLabel={false}
    enableSlices="x"
    useMesh={true}
    areaOpacity={0.2}
/>
  )
}

export default Deficit