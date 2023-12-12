import React from 'react'
import { useContext } from 'react'

/* import { Chart } from "react-google-charts"; */
import './grafico1.css'
/* import data from '../data/grafico_1.json' */
import { ResponsivePie } from '@nivo/pie'

import { municipio } from '../../Context/Context'

function Grafico1({ cnpj, local }) {


    const { mun, reg, ano, estadoPai } = useContext(municipio);
    const r = require('../data/' + estadoPai + '/' + mun[0][1] + '/estatistico_compilado.json')

    const regimes = reg
    

    var servidores = 0
    var aposentados = 0
    var pensionistas = 0
    var servidores_iminentes = 0


    for (let index = 0; index < regimes.length; index++) {
        const i_serv = Object.keys(r[0][ano][regimes[index]]).indexOf('Servidores')
        if (i_serv !== -1) {
            servidores += r[0][ano][regimes[index]]['Servidores']
        }
        const i_apos = Object.keys(r[0][ano][regimes[index]]).indexOf('Aposentados')
        if (i_apos !== -1) {
            aposentados += r[0][ano][regimes[index]]['Aposentados']
        }
        const i_pen = Object.keys(r[0][ano][regimes[index]]).indexOf('Pensionistas')
        if (i_pen !== -1) {
            pensionistas += r[0][ano][regimes[index]]['Pensionistas']
        }
        const i_serv_im = Object.keys(r[0][ano][regimes[index]]).indexOf('S. Iminentes')
        if (i_serv_im !== -1) {
            servidores_iminentes += r[0][ano][regimes[index]]['S. Iminentes']
        }

    }
    

    var data = []

    if (servidores !== 0) {
        data.push({
            "id": "Servidores",
            "label": "Servidores",
            "color": "rgb(40, 219, 198)",
            "value": servidores
        })
    }
    if (aposentados !== 0) {
        data.push({
            "id": "Aposentados",
            "label": "Aposentados",
            "color": "rgb(217, 104, 17)",
            "value": aposentados
        })
    }
    if (pensionistas !== 0) {
        data.push({
            "id": "Pensionistas",
            "label": "Pensionistas",
            "color": "rgb(45, 116, 239)",
            "value": pensionistas
        })
    }
    if (servidores_iminentes !== 0) {
        data.push({
            "id": "Servidores Imi.",
            "label": "Servidores Imi.",
            "color": "rgb(247, 243, 109)",
            "value": servidores_iminentes
        })
    }



    return (
        <ResponsivePie
            data={data}
            margin={{ top: 30, right: 10, bottom: 70, left: -75 }}
            sortByValue={true}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={7}
            colors={{ datum: "data.color" }}
            borderWidth={4}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        '1'
                    ]
                ]
            }}
            arcLabelsSkipAngle={5}
            enableArcLinkLabels={false}
            arcLinkLabelsTextOffset={10}
            arcLinkLabelsTextColor="#3d3846"
            arcLinkLabelsDiagonalLength={14}
            arcLinkLabelsStraightLength={29}
            arcLinkLabelsThickness={5}

            arcLabelsTextColor="black"
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: -35,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemWidth: 50,
                    itemHeight: 16,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 8,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#fff'
                            }
                        }
                    ]
                }
            ]}
        />



    );
}

export default Grafico1