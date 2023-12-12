import requests
import json
import pandas as pd
import numpy as np
from datetime import datetime
import time
import os

# import var


def coletarAliquota(var):
  estados = pd.read_json('estados.json')

  estado = var[0]
  indice = var[1] 

  cidades = estados['Cidades'][indice]



  for cid in cidades:
    mun = cid[1]
    cnpj = cid[1]
    print(cid[0])

    #verificar se o arquivo ja existe
    diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/aliquota.json"
    # if os.path.isfile(diretorio) == True:
    #     continue

    table = 'RPPS_ALIQUOTA'
    url = str('https://apicadprev.economia.gov.br/' + table + '?nr_cnpj_entidade='+ cnpj)


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

    dados = pd.DataFrame(result_parc['results'][0]['data'])

    dados.query('id_vigente=="VIGENTE"',inplace=True)

    data = {
            "ds_plano_segregacao_ente": dados.query('no_sujeito_passivo=="Ente"')[['ds_plano_segregacao', 'vl_aliquota']].max().fillna('---')['ds_plano_segregacao'],
            "vl_aliquota_ente": float(dados.query('no_sujeito_passivo=="Ente"')[['ds_plano_segregacao', 'vl_aliquota']].max().fillna(0)['vl_aliquota']),
            "ds_plano_segregacao_aposentados": dados.query('no_sujeito_passivo=="Aposentados"')[['ds_plano_segregacao', 'vl_aliquota']].max().fillna('---')['ds_plano_segregacao'],
            "vl_aliquota_aposentados": float(dados.query('no_sujeito_passivo=="Aposentados"')[['ds_plano_segregacao', 'vl_aliquota']].max().fillna(0)['vl_aliquota']),
            "ds_plano_segregacao_pensionistas": dados.query('no_sujeito_passivo=="Pensionistas"')[['ds_plano_segregacao', 'vl_aliquota']].max().fillna('---')['ds_plano_segregacao'],
            "vl_aliquota_pensionistas": float(dados.query('no_sujeito_passivo=="Pensionistas"')[['ds_plano_segregacao', 'vl_aliquota']].max().fillna(0)['vl_aliquota']),
            "ds_plano_segregacao_ativos": dados.query('no_sujeito_passivo=="Ativo"')[['ds_plano_segregacao', 'vl_aliquota']].max().fillna('---')['ds_plano_segregacao'],
            "vl_aliquota_ativo": float(dados.query('no_sujeito_passivo=="Ativo"')[['ds_plano_segregacao', 'vl_aliquota']].max().fillna(0)['vl_aliquota'])
            }

    json_object = json.dumps(data, indent = 8) 
    diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/aliquota.json"
    with open(diretorio, "w") as outfile: 
      outfile.write(json_object) 


