import requests
import json
import pandas as pd
import numpy as np
from datetime import datetime
import os

# import var


def coletarCrp(var):
  estados = pd.read_json('estados.json')

  estado = var[0]
  indice = var[1] 

  cidades = estados['Cidades'][indice]

  for cid in cidades:
    mun = cid[1]
    cnpj = cid[1]
    print(cid[0])

    #verificar se o arquivo ja existe
    diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/crp.json"
    # if os.path.isfile(diretorio) == True:
    #     continue

    table = 'RPPS_CRP'
    url = str('https://apicadprev.economia.gov.br/' + table + '?nr_cnpj_entidade='+ cnpj)


    result_parc = requests.get(url,verify=False)
    result_parc = result_parc.content
    result_parc = json.loads(result_parc)

    print(url)
    dados = pd.DataFrame(result_parc['results'][0]['data'])

    dados['dt_validade'] = pd.to_datetime(dados['dt_validade'], format='%d/%m/%Y')
    dados.sort_values(by=['dt_validade'], ascending=False, inplace=True)
    dados.reset_index(inplace=True)
    dados.drop(['index'], axis=1 , inplace=True)
    crp = np.array(dados)[0]
    print(crp)
    if crp[7] != "SEM CRP":
      crp[6] = datetime.strftime(crp[6], '%d/%m/%Y') 
    else:
      crp[6] = "Sem Data" 
    data = {
            "nr_cnpj_entidade": crp[0],
            "no_ente": crp[1], 
            "sg_uf": crp[2], 
            "nr_crp": crp[3], 
            "ds_situacao": crp[4],
            "dt_emissao": crp[5], 
            "dt_validade": crp[6], 
            "tp_crp": crp[7]
    }

    json_object = json.dumps(data, indent = 8) 
    diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/crp.json"
    with open(diretorio, "w") as outfile: 
      outfile.write(json_object) 
