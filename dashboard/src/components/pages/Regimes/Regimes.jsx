import React from 'react'
import { useContext } from 'react'
import { municipio } from '../../Context/Context'

import Regime from './Regime'


const Regimes = () => {
  const { mun, reg, ano, estadoPai } = useContext(municipio);
  const balanco = require('../data/' + estadoPai + '/' + mun[0][1] + '/balanco_atuarial.json')



    var g = []
    for (let index = 0; index < reg.length; index++) {
      g.push({})
      g[index][reg[index]] = balanco[0][reg[index]]['Resultado Atuarial'][ano]
    }


  return (
    <div>

      {        
      g.map((f)=>{
                    return(
                      f[Object.keys(f)] >= 0 ? (
                        <Regime  title={Object.keys(f)[0]}
                                  valor={<h2 style={{color:"#3bd154"}}>{f[Object.keys(f)].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>}
                                  color="#3bd154" />
                      ):( f[Object.keys(f)] <=0 ? (
                          <Regime title={Object.keys(f)[0]}
                                  valor={<h2 style={{color:"#d13b3b"}}>{f[Object.keys(f)].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>}
                                  color="#d13b3b" />
                      ):(
                        <Regime  title={Object.keys(f)[0]}
                                  valor={<h2 style={{color:"#d18b3b"}}>{f[Object.keys(f)].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>}
                                  color="#d18b3b" 
                        />

                      )
                      )
                    )


                  })



        // reg===true ? (
        //   r==="positivo" ? (
        //     <Regime  title={props.title}
        //              valor={<h2 style={{color:"#3bd154"}}>{data[props.val]}</h2>}
        //              color="#3bd154" />
        //   ):( r==="negativo" ? (
        //       <Regime title={props.title}
        //               valor={<h2 style={{color:"#d13b3b"}}>{data[props.val]}</h2>}
        //               color="#d13b3b" />
        //   ):(
        //     <Regime  title={props.title}
        //              valor={<h2 style={{color:"#d18b3b"}}>{data[props.val]}</h2>}
        //              color="#d18b3b" 
        //     />
        //   )
        //   )
        // ):(
        //   <></>
        // )


      }
    </div>
  )
}

export default Regimes