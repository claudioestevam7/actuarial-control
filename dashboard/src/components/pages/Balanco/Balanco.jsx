import React from 'react';
import './balanco.css'
/* import New_table from './New_table'; */
import Newtable from './Newtable';

import { useContext } from 'react'
import { municipio } from '../../Context/Context'
import { useState } from 'react';


const Balanco = () => {

    const {mun} = useContext(municipio);

    const local = require('../data/estados.json')
    const estados = local.filter(local => (local.Estado==="MG"));

    

    function tabela_resumo() {
        let select = document.getElementById("completo");
        let select2 = document.getElementById("resumo");
        select.style.display="none"
        select2.style.display="block"
    }
    function tabela_completa() {
        let select = document.getElementById("completo");
        let select2 = document.getElementById("resumo");
        select.style.display="block"
        select2.style.display="none"
    }

    const regimes = []

    

    // const [choiceRegime, setChoiceRegime] = useState('Previdenciário')

    
return (
    <section className='Balanco'>
           {/* <div>
                {regimes.map((values) => {
                    return <button onClick={()=>{setChoiceRegime(values)}} className="botao">{values}</button>
                })}

           </div> */}
           <Newtable />
           {/* <Table cnpj={cnpj} fluxo_atuarial={fluxo_atuarial}/> */}



    </section>

    )
    }

export default Balanco