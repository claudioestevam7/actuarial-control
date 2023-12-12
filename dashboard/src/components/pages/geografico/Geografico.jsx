import React from 'react'
/* import {geo} from "../data/mapa.js"; */
import { useContext } from 'react'

import { municipio } from '../../Context/Context'

const Geografico = () => {

  const {mun, estadoPai} = useContext(municipio);
  const {geo} = require('../data/' + estadoPai + '/' + mun[0][1] + '/mapa.js')

  return (
    <div className="mapa">
        {geo[0]}
    </div>
  )
}

export default Geografico