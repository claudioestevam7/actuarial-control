import React, {useContext} from 'react';

/* import aliquota from '../data/aliquota.json' */
import './crp.css'

import { municipio } from '../../Context/Context'

const Crp = () => {
  const {mun, estadoPai} = useContext(municipio);
  const crp = require('../data/' + estadoPai + '/' + mun[0][1] + '/crp.json')

  return (
    <div className='crp'>
      <div className='title'>
        <h1>CRP</h1>
        <abbr title='Certificado de Regularidade Previdenciária'><i className="info fas fa-info-circle"></i></abbr>
      </div>
      <h2>{crp.tp_crp}</h2>
      <h3>Validade</h3>
      <h2>{crp.dt_validade}</h2>
    </div>
  )
}

export default Crp