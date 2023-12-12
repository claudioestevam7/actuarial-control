import requests
import json
import pandas as pd
import numpy as np
from datetime import datetime
import time
import os


# import var


def coletarIbge(var):
    estados = pd.read_json('estados.json')
    
    estado = var[0]
    indice = var[1]

    cidades = estados['Cidades'][indice]


    ## pibm 2012
    ## https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2020/variaveis/37?localidades=N6[1100015]

    ## projecao da populacao total para ano de 2021
    ## https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/2021/variaveis/9324?localidades=N6[1100023]

    ## populacao com mais de 70 anos com base no ultimo censo demografico de 2010
    ## https://servicodados.ibge.gov.br/api/v3/agregados/200/periodos/2010/variaveis/93?localidades=N6[1100023]&classificacao=2[0]|1[0]|58[1154,1155,2503,6802,6803,92963,92964,92965]

    ##observacao se der erro com ssl retire troque o protoclo https por http




    for cid in cidades:
        mun = cid[1]
        cnpj = cid[0]
        print(cid[0])

    
    
        #verificar se o arquivo ja existe
        diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/indicadores.js"
        # if os.path.isfile(diretorio) == True:
        #     continue


        #####  coleta IBGE
        cod_ibge = str(cid[2])[:-2]
        ### PIB
        print(cod_ibge)
        url = str("http://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2020/variaveis/37?localidades=N6[" + cod_ibge + "]")


        result_parc = requests.get(url,verify=False)
        result_parc = result_parc.content
        result_parc = json.loads(result_parc)

        pib_save = result_parc[0]['resultados'][0]['series'][0]['serie']['2020']
        pib = f'R$ {int(pib_save):_.0f}'.replace('.',',').replace('_','.')

        ### População
        url = str('http://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/2021/variaveis/9324?localidades=N6[' + cod_ibge + ']')
        
        result_parc = requests.get(url,verify=False)
        result_parc = result_parc.content
        result_parc = json.loads(result_parc)

        pop = result_parc[0]['resultados'][0]['series'][0]['serie']['2021']
        pop = f'{int(pop):_.0f}'.replace('_','.')


        ### População Idosa
        url = str('http://servicodados.ibge.gov.br/api/v3/agregados/200/periodos/2010/variaveis/93?localidades=N6[' + cod_ibge + ']&classificacao=2[0]|1[0]|58[1154,1155,2503,6802,6803,92963,92964,92965]')

        result_parc = requests.get(url,verify=False)
        result_parc = result_parc.content
        result_parc = json.loads(result_parc)

        pop_idosa = 0
        for i in range(7):
            pop_idosa += int(result_parc[0]['resultados'][0]['series'][0]['serie']['2010'])

        pop_idosa = f'{int(pop_idosa):_.0f}'.replace('_','.')

        data = {

            "populacao": pop,
            "pib": pib,
            "populacao_idosa": pop_idosa,
            


        }


        json_object = json.dumps(data, indent = 4) 
        diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/indicadores.json"
        with open(diretorio, "w") as outfile: 
            outfile.write(json_object) 

