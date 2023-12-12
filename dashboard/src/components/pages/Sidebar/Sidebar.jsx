import React from 'react'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'

import { municipio } from '../../Context/Context'



const Sidebar = () => {

    const { mun, setMun, reg, setReg, ano, setAno, estadoPai, setEstadoPai, indexTabela } = useContext(municipio);

    const [prevSelected, setPrevSelected] = useState(true)
    const [finSelected, setFinSelected] = useState(false)
    const [tesSelected, setTesSelected] = useState(false)

    function lista(prev, fin, tes) {

        var r = []

        if (prev) { r = r.concat(['Previdenciário']) }
        if (fin) { r = r.concat(['Financeiro']) }
        if (tes) { r = r.concat(['Mantidos pelo Tesouro']) }
        return (setReg(r))
    }
    function prev() {
        if (finSelected || tesSelected) {
            setPrevSelected(!prevSelected)
            lista(!prevSelected, finSelected, tesSelected)
        }
    }
    function fin() {
        if (prevSelected || tesSelected) {
            setFinSelected(!finSelected)
            lista(prevSelected, !finSelected, tesSelected)
        }
    }
    function tes() {
        if (prevSelected || finSelected) {
            setTesSelected(!tesSelected)
            lista(prevSelected, finSelected, !tesSelected)
        }
    }

    const local = require('../data/estados.json')

    const [estado, setEstado] = useState()

    function function_estados() {
        const est = document.getElementById('option-estado')
        const cid = document.getElementById('option-cidades')
        let selecao = est.options[est.selectedIndex].text

        let e = local.filter(local => (local.Estado === selecao));
        let r = e[0].Cidades

        setEstado(e)
        let cod = r.map((r, key) => { return `<option key = {key}>${r[0]}</option>` })
        cid.innerHTML = cod

  


        const c = r.filter((index) => (index[0] == e[0].Cidades[0][0]))

        
            const d = require('../data/' + selecao + '/' + c[0][1] + '/estatistico_compilado.json')
            const ultimoAno = Object.keys(d[0]).at(-1)

            return (
                setMun([e[0].Cidades[0]]),
                setEstadoPai(e[0].Estado),
                setAno(ultimoAno),
                setPrevSelected(true),
                setFinSelected(false),
                setTesSelected(false),
                setReg(['Previdenciário'])
            )
        
    }

    async function function_cidades() {
        let select = document.getElementById('option-cidades')
        let selecao = select.options[select.selectedIndex].text
        const est = document.getElementById('option-estado')
        let selecao_est = est.options[est.selectedIndex].text

        let e = local.filter(local => (local.Estado === selecao_est));
        let r = e[0].Cidades

        setEstado(e)

        const c = r.filter((index) => (index[0] == selecao))

        const Logo = document.getElementsByClassName("logo");

        if (select != null) {
            const d = require('../data/' + estadoPai + '/' + c[0][1] + '/estatistico_compilado.json')
            const ultimoAno = Object.keys(d[0]).at(-1)

            return (
                setMun(c),
                setPrevSelected(true),
                setFinSelected(false),
                setTesSelected(false),
                setReg(['Previdenciário']),
                setAno(ultimoAno)
            )
        } else {
        }

    }

    const [activeButton, setActiveButton] = useState(1)

    function toggleState(index) {
        setActiveButton(index)
    }


    const dados = require('../data/' + estadoPai + '/' + mun[0][1] + '/estatistico_compilado.json')

    // ano

    function selectedAno(props) {
        return (
            setPrevSelected(true),
            setFinSelected(false),
            setTesSelected(false),
            setReg(['Previdenciário']),
            setAno(props)
        )
    }

    const anosBotoes = Object.keys(dados[0])



    // plano
    const planosLista = Object.keys(dados[0][ano])
    var planos = []

    if (planosLista.indexOf('Previdenciário') !== -1) {
        planos.push({ valor: prevSelected, funcao: prev, titulo: "Previdenciário" })
    }
    if (planosLista.indexOf('Financeiro') !== -1) {
        planos.push({ valor: finSelected, funcao: fin, titulo: "Financeiro" })
    }
    if (planosLista.indexOf('Mantidos pelo Tesouro') !== -1) {
        planos.push({ valor: tesSelected, funcao: tes, titulo: "Mantidos pelo Tesouro" })
    }


    const [cabecalho, setCabecalho] = useState('Dashboard')

    // grafico sidebar 
    const dadosGrafico = require('../data/' + estadoPai + '/' + mun[0][1] + '/balanco_atuarial.json')
    console.log(dadosGrafico)
    var anosDisponiveis = []
    for (let i = 0; i < reg.length; i++) {
        const p = Object.keys(dadosGrafico[0][reg[i]][indexTabela])
        anosDisponiveis = anosDisponiveis.concat(p)
    }
    var anosgrafico = anosDisponiveis.filter((a, i) => anosDisponiveis.indexOf(a) === i);


    var out = []
    for (let a = 0; a < anosgrafico.length; a++) {
        var sum = 0
        for (let r = 0; r < reg.length; r++) {
            if (dadosGrafico[0][reg[r]][indexTabela][anosgrafico[a]] !== undefined) {
                sum += dadosGrafico[0][reg[r]][indexTabela][anosgrafico[a]]
            }
        }
        out.push({'x':anosgrafico[a], 'y': sum})
    }


    const data = [
    {   "id": "Déficit",
        "data": out}
    ]
    
    console.log(data)

    return (
        <div className='sidebar'>
            <div id='cabecalho'>
                <div className="img_logo">
                    <svg className='logo'

                        width={32}
                        height={32}
                        fill="none"
                        viewBox="10 0 225 350"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g className='estrutura' clipPath="url(#a)">
                            <path
                                d="M80.206 348.863c-23.454-1.001-46.451-.214-69.44-.495-8.348-.102-9.79-1.513-9.84-9.974-.033-5.499-.117-11.002.05-16.495.161-5.263 2.096-7.016 7.417-7.268 2.993-.141 5.984-.375 8.979-.418 3.759-.053 5.36-1.803 5.263-5.595-.142-5.495.095-10.998.014-16.495-.464-31.53 10.572-57.801 35.016-78.276 9.698-8.123 18.815-16.943 28.142-25.506 8.254-7.579 8.065-17.154-.2-24.701-13.405-12.242-27.437-23.846-39.902-37.059-15.47-16.397-21.76-36.705-22.967-58.757-.527-9.639-.439-19.318-.365-28.977.026-3.34-1.344-4.536-4.405-4.517-3.332.02-6.665-.028-9.997-.016-4.255.015-6.706-2.206-6.838-6.318C.904 20.84.938 13.668 1.1 6.508 1.185 2.598 3.397.375 7.454.323 15.617.218 23.78.058 31.942.057c66.488-.01 132.975.01 199.462.028 9.747.003 10.896 1.174 10.881 10.905-.009 5.332.078 10.666-.044 15.996-.119 5.163-2.192 7.16-7.389 7.312-2.996.087-6.003.124-8.996-.016-3.428-.16-4.734 1.339-4.758 4.737-.069 9.987.066 19.965-.683 29.958-1.894 25.256-10.541 47.237-29.718 64.495-11.02 9.917-21.882 20.011-32.818 30.023-8.729 7.991-8.799 17.005-.134 24.937 11.553 10.573 23.204 21.039 34.69 31.684 15.567 14.428 23.839 32.607 26.854 53.366 1.63 11.224 1.995 22.528 1.885 33.861-.062 6.43.61 7.044 7.139 7.198 2.159.051 4.323-.232 6.485-.267 4.796-.077 7.303 2.022 7.435 6.753.196 6.993.189 13.998.032 20.993-.107 4.774-2.227 6.325-8.136 6.331-27.995.029-55.989-.031-83.984.056-23.156.072-46.313.303-69.939.456ZM176.5 34.32c-45.318.014-90.636.026-135.955.047-6.198.004-6.403.2-6.389 6.518.02 8.664-.227 17.344.217 25.987 1.135 22.09 8.283 41.638 25.077 56.89a14368.512 14368.512 0 0 1 33.979 30.972c13.489 12.33 13.848 29.44.596 42.014-9.784 9.284-19.701 18.45-29.936 27.23-14.546 12.477-24.276 27.583-27.978 46.566-2.417 12.392-1.599 24.87-2.03 37.326-.167 4.841 1.598 6.148 6.324 6.305 27.985.932 55.972.323 83.957.432 26.156.101 52.314-.197 78.47-.064 4.982.025 6.367-1.919 6.19-6.51-.302-7.821.052-15.67-.353-23.483-1.129-21.767-8.203-41-24.72-56.026-11.583-10.537-23.23-21.005-34.699-31.665-13.026-12.109-12.878-29.634.192-41.745 10.872-10.074 21.676-20.226 32.695-30.138 13.489-12.134 22.114-26.935 25.255-44.823 2.436-13.873 1.496-27.896 1.584-41.87.022-3.485-2.171-4.007-4.985-3.991-8.83.049-17.661.026-27.491.028Z"
                                fill="#B1CEBC"
                            />
                            <g className='interior' fill="#6CB0BD">
                                <path d="M193.223 299.561c-.891 3.743-3.142 4.826-6.378 4.822-43.121-.043-86.243-.018-129.365-.069-5.833-.007-8.135-2.524-7.666-8.472 3.158-40.005 35.374-66.505 70.183-67.346 32.539-.786 66.297 21.784 72.695 61.171.503 3.099.401 6.296.531 9.894ZM163.265 131.273c-7.526 7.108-14.755 14.013-22.087 20.807-5.271 4.884-9.131 10.433-10.402 17.732-.927 5.317-4.106 7.636-8.987 7.473-4.893-.163-8.225-2.792-9.018-7.7-1.058-6.544-4.145-11.724-8.949-16.26-14.054-13.268-27.922-26.732-41.847-40.136-5.485-5.28-4.793-9.489 2.098-12.525 21.022-9.263 42.28-8.887 63.829-1.832 11.773 3.854 23.749 6.781 36.192 2.791 5.732-1.838 11.136-4.426 16.48-7.15 3.151-1.605 6.272-2.627 9.071.555 2.691 3.058 1.056 5.891-.638 8.667-6.623 10.855-16.676 18.514-25.742 27.578ZM117.466 210.385c5.136-2.632 8.913-1.512 9.715 2.575.529 2.695-.375 4.894-2.758 6.364-2.301 1.419-4.491.942-6.38-.738-2.608-2.319-2.989-5.006-.577-8.201ZM127.192 194.844c-1.055 3.64-3.32 4.937-6.557 4.389-2.781-.471-4.451-2.321-4.719-5.071-.251-2.578 1.18-4.459 3.431-5.588 3.754-1.882 7.075.616 7.845 6.27Z" />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="a">
                                <path fill="#fff" d="M0 0h243v349H0z" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <h2>{cabecalho}</h2>
            </div>

            <div id='inf'>
                <h2 className='regimento'>Localidade</h2>
                <section className="localidade">
                    <select id="option-estado" onChange={function_estados}>
                        <option>Selecione o Estado</option>
                        {local.map((local, key) =>
                            <option key={key} >{local.Estado}</option>
                        )}
                    </select>
                    <select id="option-cidades" onChange={function_cidades}>
                        <option key='0'>Cidade</option>
                    </select>

                </section>

                <h2 className={activeButton=== 1 || activeButton=== 3 ? "regimento" : "invisivel"}>Ano</h2>
                <div className={activeButton=== 1 || activeButton=== 3 ? "sidebar_anos" : "invisivel"}>

                    {anosBotoes.map((a, index) => {
                        return (
                            <button key={index} className={ano === a ? 'sidebar_anos_botao anos_botao_active' : 'sidebar_anos_botao'} onClick={() => selectedAno(a)}>{a}</button>
                        )
                    })}


                </div>
                    <div className={activeButton=== 2 ? "div__evolucao" : "invisivel"}>
                        <h2 className={activeButton=== 2 ? "regimento" : "invisivel"}>Evolução</h2>
                        <abbr title="Clique nas linhas da tabela para plotar a evolução temporal"><i className="fas fa-info-circle"></i></abbr>
                    </div>

                <div className={activeButton=== 2 ? "evolucao" : "invisivel"}>

                        <div className="grafico">
                        <ResponsiveLine
                            data={data}
                            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                            xScale={{ type: 'point' }}
                            yScale={{
                                type: 'linear',
                                min: 'auto',
                                max: 'auto',
                                stacked: true,
                                reverse: false,
                                fontSize:'12px'
                            }}
                            isInteractive={false}
                            enableArea={true}
                            defs={[
                                linearGradientDef('gradientA', [
                                    { offset: 0, color: '#fff' },
                                    { offset: 100, color: '#1E1E1E', opacity: 1 },
                                ]),
                            ]}
                            fill={[{ match: '*', id: 'gradientA' }]}
                            curve="natural"
                            axisTop={null}
                            axisRight={null}
                            axisLeft={null}
                            axisBottom={null}
                            enableGridX={false}
                            enableGridY={false}
                            /* colors={{ scheme: 'nivo' }} */
                            /* colors={{ scheme: 'purple_blue' }} */
                            colors={['#fff']}
                            theme={{
                            fill: {color:"#000"},
                            axis: { 
                                ticks: { text: { fontSize: 12,fill:'#fff'}},
                                    legend:{text:{fontSize:12, fill:'#fff'}}}}
                            }
                            lineWidth={3}
                            pointSize={7}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={1}
                            pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                            enablePointLabel={true}
                            pointLabel={false}
                            enableSlices="x"
                            useMesh={true}
                            areaOpacity={0.2}
                        />
                        
                        </div>
                        <div className={indexTabela== '' ? "orientacao" :  "invisivel"}>
                            <p>Clique nas linhas da tabela para plotar a evolução temporal</p>
                        </div>

                </div>


                <h2 className='regimento'>Regimento</h2>
                <div className='regimentos'>
                    {planos.map((plan) => {
                        return (
                            < div>
                                <input type="checkbox" className='checkbox' checked={plan['valor']} onChange={plan['funcao']} />
                                {plan['titulo']}
                            </div>
                        )
                    })}

                </div>




                <h2 className='regimento'>Páginas</h2>
                <Link to={'/'} className={activeButton === 1 ? 'link active__button' : 'link'} onClick={() => { toggleState(1); setCabecalho('Dashboard') }}>
                    <i className="fas fa-chart-bar"></i>
                    <h4 className='btn_dashboard'>
                        Dashboard
                    </h4>
                </Link>
                <Link to={'/balanco'} className={activeButton === 2 ? 'link active__button' : 'link'} onClick={() => { toggleState(2); setCabecalho('Balanço') }}>
                    <i className="fas fa-table"></i>
                    <h4 className='btn_dashboard'>
                        Balanço
                    </h4>
                </Link>
                {/* <Link to={'/Arvore'} className={activeButton === 3 ? 'link active__button' : 'link'} onClick={() => { toggleState(3) }}>
                    <i className="fas fa-users"></i>
                    <h4 className='btn_dashboard'>
                        População
                    </h4>
                </Link> */}
                <Link to={'/Contact'} className={activeButton === 4 ? 'link active__button' : 'link'} onClick={() => { toggleState(3); setCabecalho('Contato') }}>
                    <i className="fas fa-id-card"></i>
                    <h4 className='btn_dashboard'>
                        Contato
                    </h4>
                </Link>
            </div>


        </div >
    )
}

export default Sidebar
