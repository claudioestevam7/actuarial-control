import React, {useContext} from 'react';

/* import aliquota from '../data/aliquota.json' */
import './footer.css'

import { municipio } from '../../Context/Context'


const Footer = () => {

  const {mun, estadoPai} = useContext(municipio);
  const aliquota = require('../data/' + estadoPai + '/' + mun[0][1] + '/aliquota.json')
  return (
    <section className='footer'>
        
        <div className='aliquota'>
          <div className='card' >
            <div className="title" style={{"backgroundColor":"#354152"}}>
              <h1>Ente</h1>
            </div>
            <h1>{aliquota.ds_plano_segregacao_ente}</h1>
            <h2><span className='aliquota_name'>Alíquota</span> {aliquota.vl_aliquota_ente} %</h2>
          </div>
          <div className='card'>
            <div className="title" style={{"backgroundColor":"#3d5981"}}>
              <h1>Ativos</h1>
            </div>
            <h1>{aliquota.ds_plano_segregacao_ativos}</h1>
            <h2><span className='aliquota_name'>Alíquota</span> {aliquota.vl_aliquota_ativo} %</h2>
          </div>
          <div className='card' >
            <div className="title" style={{"backgroundColor":"#477fc9"}}>
              <h1>Aposentados</h1>
            </div>
            <h1>{aliquota.ds_plano_segregacao_aposentados}</h1>
            <h2><span className='aliquota_name'>Alíquota</span> {aliquota.vl_aliquota_aposentados} %</h2>
          </div>
          <div className='card' >
            <div className="title" style={{"backgroundColor":"#5cbfddd6"}}>
              <h1>Pensionistas</h1>
            </div>
            <h1>{aliquota.ds_plano_segregacao_pensionistas}</h1>
            <h2><span className='aliquota_name'>Alíquota</span> {aliquota.vl_aliquota_pensionistas} %</h2>
          </div>

         

        </div>
    </section>
  )
}

export default Footer