import React from 'react'
import './cards.css'


function Cards (props) {
  return (

      
    <section className='container'>
            <div className='cabecalho'>
                <h8 className="title">{props.titulo}</h8>
                
                <abbr title={props.explicacao}><i className="fas fa-info-circle"></i></abbr>
                <div style={{display:'none'}}>Explicação</div>
            </div>
            <div className='corpo'>
                {props.valor}
                <i  className="icone" >{props.icone}</i>
            </div>
        
    </section>
  )
}

export default Cards