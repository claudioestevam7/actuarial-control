import React from 'react'
import { useState } from 'react'

// import Loc from './components/local/Loc'
// import Grafico from './components/grafico/grafico'
/* import Dashboard from './components/pages/Dashboard/Dashboard' */
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Sidebar from './components/pages/Sidebar/Sidebar'
import Home from './components/pages/Dashboard/Dashboard'
import Balanco from './components/pages/Balanco/Balanco'
import Contact from './components/Contact/Contact'
import { municipio } from './components/Context/Context'

/* 
    Dependencias do app
    react-router-dom @nivo/treemap @mui/x-data-grid @nivo/line @nivo/pie react-icons
*/


const App = () => {
  
  const [mun, setMun] = useState([["Belo Horizonte", "18715383000140", 3106200.0]])
  const [reg, setReg] = useState(['Previdenciário'])
  const [ano, setAno] = useState('2022')
  const [estadoPai, setEstadoPai] = useState('MG')
  const [indexTabela, setIndexTabela] = useState('Resultado Atuarial')

  

  return (
    <municipio.Provider value={{mun,setMun, reg, setReg, ano, setAno, estadoPai, setEstadoPai, indexTabela, setIndexTabela}}>
        <main className='principal'>
        <Sidebar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/balanco' element={<Balanco />}/>
            <Route path='/contact' element={<Contact />}/>
          </Routes>
        </main>
    </municipio.Provider >

    
  )
}

export default App