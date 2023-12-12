import React, { useState, useContext } from 'react'
import './ministerio.css'

import { municipio } from '../../Context/Context'

const Ministerio = () => {

  const { mun, setMun, reg, setReg, ano, setAno, estadoPai, setEstadoPai } = useContext(municipio);

  const data = require('../data/ministerio.json')

  const dadosMinisterio = data[0][estadoPai][mun[0][1]]



  const i = dadosMinisterio['isp']
  const p = dadosMinisterio['perfil']

  
  const isp = i == 'A' ? 0 : i == 'B' ? 1 : i == 'C' ? 2 : 3

  const perfil = p === 'III' ? 0 : p === 'II' ? 1 : p === 'I' ? 2 : 3
  
  console.log(isp)

  return (
    <section className='conteudo'>
      <div className="indice">
        <div className="cabecalho">
        <h3 className='titulo'>ISP</h3>
        <abbr title='INDICADOR DE SITUAÇÃO PREVIDENCIÁRIA'><i className="fas fa-info-circle"></i></abbr>

        </div>
        <h1 className='resultado'>{i}</h1>
        <div className='estrelas'>
          <i className={isp <= 3 ? "estrela fas fa-star" : "vazio far fa-star"}></i>
          <i className={isp <= 2 ? "estrela fas fa-star" : "vazio far fa-star"}></i>
          <i className={isp <= 1 ? "estrela fas fa-star" : "vazio far fa-star"}></i>
          <i className={isp <= 0 ? "estrela fas fa-star" : "vazio far fa-star"}></i>
        </div>
      </div>
      <div className="indice">
        <h3 className='titulo'>Perfil Atuarial</h3>
        <h1 className='resultado'>{p}</h1>
        <div className='estrelas'>
          <i className={perfil <= 3 ? "estrela fas fa-star" : "vazio far fa-star"}></i>
          <i className={perfil <= 2 ? "estrela fas fa-star" : "vazio far fa-star"}></i>
          <i className={perfil <= 1 ? "estrela fas fa-star" : "vazio far fa-star"}></i>
          <i className={perfil <= 0 ? "estrela fas fa-star" : "vazio far fa-star"}></i>
        </div>
      </div>
    </section>
  )
}

export default Ministerio