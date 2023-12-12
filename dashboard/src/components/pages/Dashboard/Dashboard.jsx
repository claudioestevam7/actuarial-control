import React, {useState, useContext} from 'react';
import './dashboard.css'
import Grafico1 from '../Grafico1/Grafico1';
import Indicadores from '../Indicadores/Indicadores';
import Deficit from '../Grafico_deficit/Deficit';
import Geografico from '../geografico/Geografico';
import Arvore from '../Arvore/Arvore';
import Ibge from '../Ibge/Ibge';
import Footer from '../Footer/Footer';
import Regimes from '../Regimes/Regimes'
import Crp from '../Crp/Crp';

import { municipio } from '../../Context/Context'
import Ministerio from '../Ministerio/Ministerio';

const Dashboard = () => {

    const local = require('../data/estados.json')
    const [cnpj, setcnpj] = useState(18029165000151)
    const grafico_1 = require('../data/mg.json')
    

    const {mun, setMun} = useContext(municipio);

    
return (
    <section className='Dashboard'>
        

        <div className='Dash'>
            <div id='linha1'>
                <div id='grafico1'>
                    <h4 id='top'>Quantidade de individuos</h4>
                    <Grafico1 cnpj={cnpj} local={grafico_1}/>
                </div>
                <div id="grafico2">
                    <h4 id='top'>Regimes de Segregação</h4>
                    <Regimes/>
                </div>
                
                <div id="grafico3">
                    <div >
                        <Indicadores />
                    </div>
                    
                </div>
                <div id="grafico4">
                    <Geografico />
                    
                </div>
            </div>
            
            <div id='linha2'>
                <div id='grafico1'>
                    <Ibge />
                </div>
                <div id="grafico2">
                    <Deficit />
                </div>
                <div id="grafico3">
                    <Arvore />
                </div>
                
            </div>
            <div id='linha3'>
                <div id='grafico1'>
                    <Crp />
                </div>
                <div id="grafico2">
                    <Ministerio />
                </div>
                
                <div id='grafico3'>
                    <Footer/>
                </div>
            </div>

        </div>


    </section>








    )
    }

export default Dashboard