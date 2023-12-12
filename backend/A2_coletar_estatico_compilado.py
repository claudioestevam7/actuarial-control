import requests
import json
import pandas as pd
import numpy as np
from datetime import datetime
import time
import os




def coletarEstatisticoCompilado(var):
    estados = pd.read_json('estados.json')


    estado = var[0]
    indice = var[1]

    cidades = estados['Cidades'][indice]

    # funcao muito importante para codificar em formato possivel de converter para json
    def np_encoder(object):
        if isinstance(object, np.generic):
            return object.item()


    for cid in cidades:
        mun = cid[1]
        cnpj = cid[1]
        print(cid[0], cid[1])

        
        diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/estatistico_compilado.json"
        # if os.path.isfile(diretorio) == True:
        #     continue


        table = 'DRAA_ESTATISTICA'
        url = str('https://apicadprev.economia.gov.br/' + table + '?nr_cnpj_entidade='+ str(cnpj))



        try:
            result_parc = requests.get(url,verify=False)
            result_parc = result_parc.content
            result_parc = json.loads(result_parc)
        except:
            print('Aguardando...')
            time.sleep(10)
            result_parc = requests.get(url,verify=False)
            result_parc = result_parc.content
            result_parc = json.loads(result_parc)

        print(url)
        dados = pd.DataFrame(result_parc['results'][0]['data'])

        dados.query('te_situacao=="Documentos Digitalizados"', inplace=True)

        dados = dados[['dt_exercicio', 'tp_populacao', 'tp_plano', 'qt_grupo_fem', 'qt_grupo_masc']]
        dados[['qt_grupo_fem', 'qt_grupo_masc']] = dados[['qt_grupo_fem', 'qt_grupo_masc']].fillna(0)

        dados['total'] = dados['qt_grupo_fem'] + dados['qt_grupo_masc']

        data = {}
        anos = dados['dt_exercicio'].drop_duplicates()
        for ano in anos:
            dados_anual = dados.query('dt_exercicio=='+ str(ano))
            planos = dados_anual['tp_plano'].drop_duplicates()
            data[str(ano)] = {}
            for plano in planos:
                dados_plano = dados_anual.query('tp_plano=="'+ plano +'"')
                populacoes = dados_plano['tp_populacao'].drop_duplicates()
                data[str(ano)][plano] = {}
                for populacao in populacoes:
                    pop = int(dados_plano.query('tp_populacao=="'+ populacao +'"')['total'].sum())

                    data[str(ano)][plano][populacao] = pop

        data_insert = []
        data_insert.append(data)



        json_object = json.dumps(data_insert, default=np_encoder, indent=3) 

        
        diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/estatistico_compilado.json"
        with open(diretorio, 'w') as outfile: 
            outfile.write(json_object) 
            json_object = json.dumps(data, indent=4) 
