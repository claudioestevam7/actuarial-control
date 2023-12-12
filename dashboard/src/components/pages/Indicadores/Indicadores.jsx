import React from 'react'
/* import './indicadores.css' */
import { useContext } from 'react'
import { municipio } from '../../Context/Context'

import Cards from './Cards'
import { BsFillArrowUpSquareFill, BsFillArrowDownSquareFill, BsFillDashSquareFill } from 'react-icons/bs';




function Indicadores(props) {

  const { mun, reg, ano, estadoPai } = useContext(municipio);
  // const data = require('../data/MG/' + mun[0][1] + '/indicadores.json')

  const balanco = require('../data/' + estadoPai + '/' + mun[0][1] + '/balanco_atuarial.json')



  for (let a = 0; a < ano.length; a++) {

    var g = []
    var ativoLiquidoTotal = 0
    var rmbConcedido = 0
    var reservaMatematica = 0

    for (let i = 0; i < reg.length; i++) {
      ativoLiquidoTotal += balanco[0][reg[i]]['(+) Ativo Líquido do Plano'][ano]
      rmbConcedido += balanco[0][reg[i]]['(=) Reserva Matemática de Benefícios Concedidos (RMB - Concedidos)'][ano]
      reservaMatematica += balanco[0][reg[i]]['(=) Reserva Matemática (RMBC + RMBaC)'][ano]

    }

      const ativoLiquidoTotal_rmbConcedido = ((ativoLiquidoTotal / rmbConcedido) * 100).toFixed(2)
      const ativoLiquidoTotal_reservaMatematica = ((ativoLiquidoTotal / reservaMatematica) * 100).toFixed(2)
      const rmbConcedido_reservaMatematica = ((rmbConcedido / reservaMatematica) * 100).toFixed(2)
      g.push([{"title" : "Ativo Total / Reserva",
                "value": ativoLiquidoTotal_rmbConcedido,
               "details": 'explicação_1'},
              {"title" : "Ativo Liquido / Reserva",
                "value": ativoLiquidoTotal_reservaMatematica,
                "details": 'explicação_2'}, 
              {"title" : "Concedidos / Reserva",
                "value": rmbConcedido_reservaMatematica,
                "details": 'explicação_3'}])
  }



  return (
    <div>
      {
        g.map((f) => {
          return (
            <>
              {f.map((v) => {
                return (
                  <>
                    { v.value > 0
                    ? <Cards titulo={v.title} icone={<BsFillArrowUpSquareFill color="#3bd154" className='icons' />}
                      explicacao={v.details} valor={<h2 style={{ color: "#3bd154" }}>{((v.value).replace(".", ","))} %</h2>}  color="#3bd154" />
                    : v.value < 0
                      ? <Cards titulo={v.title} icone={<BsFillArrowDownSquareFill color="#d13b3b" className='icons'/>} 
                      explicacao={v.details} valor={<h2 style={{color:"#d13b3b"}}>{(v.value).replace(".", ",")} %</h2>} color="#d13b3b" />
                      : <Cards titulo={v.title} icone={<BsFillDashSquareFill color="#d18b3b" className='icons'/>}
                      explicacao={v.details} valor={<h2 style={{color:"#d18b3b"}}>{(v.value).replace(".", ",")} %</h2>}color="#d18b3b" />
                    }
                  </>

                )
              })
              }
            </>
          )
        })
      }

      {/* { r==="positivo" ? (
        <Cards titulo='Deficit pelo PIB' 
               icone= {<BsFillArrowUpSquareFill color="#3bd154" className='icons'/>}
               explicacao="okkkkk" 
               valor={<h2 style={{color:"#3bd154"}}>{data[props.val]} %</h2>}
               color="#3bd154" />
      ):( r==="negativo" ? (
          <Cards titulo='Déficit pela Reserva Disponível' 
                 icone={<BsFillArrowDownSquareFill color="#d13b3b" className='icons'/>} 
                 explicacao="okkkkkk" 
                 valor={<h2 style={{color:"#d13b3b"}}>{data[props.val]}</h2>}
                 color="#d13b3b" />
      ):(
        <Cards titulo='Déficit pelo Ativo Total' 
              icone={<BsFillDashSquareFill color="#d18b3b" className='icons'/>}
              explicacao="okkkkk" 
              valor={<h2 style={{color:"#d18b3b"}}>{data[props.val]}</h2>}
              color="#d18b3b" 
        />
      )
      )
      
    } */}
    </div>
  )
}

export default Indicadores