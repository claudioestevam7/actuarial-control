import React from 'react'

import { TableContainer, Table, Paper } from '@mui/material'

import './newtable.css'

import Bodyhead from './Bodyhead'
import Bodytable from './Bodytable'

const Newtable = () => {
  return (
    <section className='fundo_table'>
      <TableContainer component={Paper} className='fundo_table'>
        <Table className='fundo_table'>
          <Bodyhead />
          <Bodytable />
        </Table>
      </TableContainer>
    </section>

  )
}

export default Newtable