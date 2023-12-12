import requests
import json
import pandas as pd
import numpy as np
import time
from datetime import datetime
import os

# import var

def coletarArvoreInicial(var):

  estados = pd.read_json('estados.json') 

  estado = var[0]
  indice = var[1]

  cidades = estados['Cidades'][indice]


  for cid in cidades:
    mun = cid[1]
    cnpj = cid[1]
    print(cid[0])

    #verificar se o arquivo ja existe
    diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/arvore_inicial.json"
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
      time.sleep(15)
      result_parc = requests.get(url,verify=False)
      result_parc = result_parc.content
      result_parc = json.loads(result_parc)

    dados = pd.DataFrame(result_parc['results'][0]['data'])
    dados = dados.query('te_situacao=="Documentos Digitalizados"')

    regimes_data = {}
    regimes = dados['tp_plano'].drop_duplicates()
    for reg in regimes:
      regimes_data[reg] = {}
      anual = dados.query('tp_plano=="' + reg + '"')
      anos = anual['dt_exercicio'].drop_duplicates()
      for ano in anos:
        regimes_data[reg][ano] = {}
        serv = anual.query('dt_exercicio=='+str(ano))
        populacao = serv['tp_populacao'].drop_duplicates()
        regimes_data[reg][ano]["Feminino"] = []
        regimes_data[reg][ano]["Masculino"] = []
        for pop in populacao:
          sexo = serv.query('tp_populacao=="' + pop +'"')
          feminino = int(sexo['qt_grupo_fem'].sum())
          masculino = int(sexo['qt_grupo_masc'].sum())
          regimes_data[reg][ano]["Feminino"].append({pop: feminino})
          regimes_data[reg][ano]["Masculino"].append({pop: masculino})


    data = [regimes_data]
    

    json_object = json.dumps(data, indent = 8) 
    diretorio = '../dashboard/src/components/pages/data/'+ estado +'/' + mun + "/arvore_inicial.json"
    with open(diretorio, "w") as outfile: 
      outfile.write(json_object) 



