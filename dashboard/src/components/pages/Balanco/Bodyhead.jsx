import React from 'react'
import { TableHead, TableRow, TableCell} from '@mui/material'
import { useContext } from 'react'
import { municipio } from '../../Context/Context'
import './newtable.css'


const Tablehead = (props) => {
  const {mun, reg, estadoPai} = useContext(municipio);
  
  const balanco = require('../data/' + estadoPai + '/' + mun[0][1] + '/balanco_atuarial.json')

  var anos = []
  for (let i = 0; i < reg.length; i++) {
    const p = Object.keys(balanco[0][reg[i]]['(-) Valor Presente dos Benefícios Futuros (Aposentados)'])
    anos = anos.concat(p)
  }
  anos = anos.filter((a, i) => anos.indexOf(a) === i);

  
  return (
    <TableHead className='head' key='head'> 
        <TableRow className='fundo_table'>
            <TableCell className='cell_head' sx={{color:"#fff", fontSize:"14px", fontWeight:"800", width:"300px", height:'20px'}}>Descrição</TableCell>

            {anos.map((ano)=>{
                return(
                    <TableCell className='cell_head' sx={{color:"#fff", fontSize:"12px", fontWeight:"800", width:"60px"}}>{ano}</TableCell>
                )
            })
            }

                
        </TableRow>
    </TableHead>
  )
}

export default Tablehead