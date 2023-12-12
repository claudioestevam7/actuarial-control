import React from 'react'
import './regime.css'

const Regime = (props) => {
  
  
  
  return (
    <div className='regimes'>
        <h3>{props.title}</h3>
        {props.valor}
    </div>
  )
}

export default Regime