import React from 'react'
/* import { Chart } from "react-google-charts"; */
import './loc.css'
const local = require('../data/estados.json')

function t () {
    const est = document.getElementById('estado')
    const cid = document.getElementById('cidades')
    let selecao = est.options[est.selectedIndex].text
    
    let e = local.filter(local => (local.Estado == selecao));
    let r = e[0].Cidades
    console.log(r)
        
    let c = r.map((r, key) => {
                    return `<option key = {key}>${r}</option>`
                    }
                )

    cid.innerHTML = c

}

const loc = () => {
  
    // const estados = require('../data/mg.json')

    // const cid = estados.filter(estados => (estados.nr_cnpj_entidade == "18186346000191" && estados.qt_grupo_masc == "14.0"));

    // console.log(cid)

    const e = 'MG'
    
    // const cid = local.filter(local => (local.Estado == e));

    // console.log(cid)
  

    const estados = local.map(local => (local.Estado));
    // console.log(estados)
    


    return (
    <section className="localidade">
        <div>
            <select id="estado" onChange={t}>


                <option>Select Country</option>
                
                {local.map((local, key) => 
                    <option key = {key}>{local.Estado}</option>
                )}
                
            </select>

            <select id="cidades">
               

            </select>
            <div>   
                
            </div>
        </div>
    // </section>
  )
}

export default loc