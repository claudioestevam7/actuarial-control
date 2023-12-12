import React from 'react'
import "./ibge.css"

import { useContext } from 'react'
import { municipio } from '../../Context/Context'


const Ibge = () => {
  const {mun, estadoPai} = useContext(municipio);
  const indicadores = require('../data/' + estadoPai + '/' + mun[0][1] + '/indicadores.json')

  return (
    <section className='ibge'>
        <div>
            <h3>População Total</h3>
            <h2>{indicadores.populacao}</h2>
        </div>
        <div>
            <h3>Produto Interno Bruto</h3>
            <h2>{indicadores.pib}</h2>
        </div>
        <div>
            <h3>População Idosa</h3>
            <h2>{indicadores.populacao_idosa}</h2>
        </div>
    </section>
  )
}

export default Ibge