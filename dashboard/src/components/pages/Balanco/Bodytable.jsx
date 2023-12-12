import React from 'react'
import { TableBody, TableRow, TableCell } from '@mui/material'
import { useContext } from 'react'
import { municipio } from '../../Context/Context'



const Bodytable = () => {

    const contas = [
        "(-) Valor Presente dos Benefícios Futuros (Aposentados)",
        "(+) Valor Presente das Contribuições Futuras Participante (Aposentados)",
        "(-) Valor Presente dos Benefícios Futuros (Pensionistas)",
        "(+) Valor Presente das Contribuições Futuras Participante (Pensionistas)",
        "(+) Valor da Compensação Previdenciária (Beneficios Concedidos)",
        "(=) Reserva Matemática de Benefícios Concedidos (RMB - Concedidos)",
        "(-) Valor Presente dos Benefícios Futuros (A Conceder)",
        "(+) Valor Presente das Contribuições Futuras Patrocinador",
        "(+) Valor Presente das Contribuições Futuras Participante",
        "(+) Valor da Compensação Previdenciária (Beneficios a Conceder)",
        "(=) Reserva Matemática de Benefícios a Conceder (RMB a Conceder)",
        "(=) Reserva Matemática (RMBC + RMBaC)",
        "(+) Valor Presente dos Acordos de Parcelamentos",
        "(+) Ativo Líquido do Plano",
        "(=) Ativo Total do Plano",
        "Resultado Atuarial"
    ]

    // const data = [[40343, 0], [24, 20]]
    
    const { mun, reg, estadoPai, setIndexTabela } = useContext(municipio);
    
    const balanco = require('../data/' + estadoPai + '/' + mun[0][1] + '/balanco_atuarial.json')
    
    var anos = []
    for (let i = 0; i < reg.length; i++) {
        const p = Object.keys(balanco[0][reg[i]]['(-) Valor Presente dos Benefícios Futuros (Aposentados)'])
        anos = anos.concat(p)
    }
    var anos = anos.filter((a, i) => anos.indexOf(a) === i);


    // retornar matriz com os dados do corpo
    var data = []
    for (let c = 0; c < contas.length; c++) {
        var linha = []
        for (let a = 0; a < anos.length; a++) {
            var sum = 0
            for (let r = 0; r < reg.length; r++) {
                if (balanco[0][reg[r]][contas[c]][anos[a]] !== undefined) {
                    sum += balanco[0][reg[r]][contas[c]][anos[a]]
                }
            }
            linha.push(sum)
        }
        data[c] = linha
    }


    return (
        <TableBody className='head'>


            {data.map((valor,index) => {
                return (
                    <TableRow className='fundo_table'>
                        <TableCell className='cell_body' sx={{ color: "#fff", fontSize: "10px", fontWeight: "500", py: "2px", minHeight: "40px", cursor:'pointer' }}  onClick={()=>{setIndexTabela(contas[index])}}>{contas[index]}</TableCell>
                        {valor.map((val) => {
                            return (
                                <TableCell className='cell_body' sx={{ color: "#fff",
                                fontSize: "10px", 
                                fontWeight: "500", py: "2px", minHeight: "40px", cursor:'pointer' }} 
                                onClick={()=>{setIndexTabela(contas[index])}}>{Intl.NumberFormat('pt-BR', {  currency: 'BRL' }).format(val)}</TableCell>
                            )
                        })}
                    </TableRow>
                )

            })}
        </TableBody >
            )}
        







        // <TableRow className='fundo_table'>
        //     <Linha />
        //     <TableCell className='cell_body' sx={{ color: "#fff", fontSize: "10px", fontWeight: "500", py: "2px", minHeight: "40px" }}>{row['Descrição']}</TableCell>

        //     {anos.map((ano) => {
        //         return (
        //             <TableCell className='cell_body' sx={{ color: "#fff", fontSize: "8px", fontWeight: "200", py: "0", px: "4px" }}>{row[ano]}</TableCell>
        //         )
        //     })}
        // </TableRow>



export default Bodytable