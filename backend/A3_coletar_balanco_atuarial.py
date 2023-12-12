import requests
import json
import pandas as pd
import numpy as np
from datetime import datetime
import time
import os

# import var

def coletarBalancoAtuarial(var):
  estados = pd.read_json('estados.json')

  # estado = var.estadoSelecionado()[0]
  # indice = var.estadoSelecionado()[1]

  estado = var[0]
  indice = var[1]


  cidades = estados['Cidades'][indice]

  regimes  = ['Previdenciário', 'Financeiro', 'Mantidos pelo Tesouro']

  regime = 'Previdenciário'

  descri = {

  "(-) Valor Presente dos Benefícios Futuros (Aposentados)":["Benefícios Concedidos - Encargos - Aposentadorias Programadas",
              "Benefícios Concedidos - Encargos -  Aposentadorias Especiais de Professores",
              "Benefícios Concedidos - Encargos - Outras Aposentadorias Especiais",
              "Benefícios Concedidos - Encargos -  Aposentadorias por Invalidez"],

  "(+) Valor Presente das Contribuições Futuras Participante (Aposentados)":['Benefícios Concedidos - Contribuições Futuras dos Aposentados'],

  "(-) Valor Presente dos Benefícios Futuros (Pensionistas)":['Benefícios Concedidos - Encargos -  Pensões Por Morte'],

  "(+) Valor Presente das Contribuições Futuras Participante (Pensionistas)":['Benefícios Concedidos - Contribuições Futuras dos Pensionistas'],

  "(+) Valor da Compensação Previdenciária (Beneficios Concedidos)": ['Benefícios a Conceder - Compensação Previdenciária a Receber',
                                                                      'Benefícios a Conceder - Encargos -  Compensação Previdenciária a Pagar'],

  "(=) Reserva Matemática de Benefícios Concedidos (RMB - Concedidos)":["(-) Valor Presente dos Benefícios Futuros (Aposentados)",
            "(+) Valor Presente das Contribuições Futuras Participante (Aposentados)",
            "(-) Valor Presente dos Benefícios Futuros (Pensionistas)",
            "(+) Valor Presente das Contribuições Futuras Participante (Pensionistas)",
            "(+) Valor da Compensação Previdenciária (Beneficios Concedidos)"],

  "(-) Valor Presente dos Benefícios Futuros (A Conceder)":['Benefícios a Conceder - Encargos -  Aposentadorias Programadas',
            "Benefícios a Conceder - Encargos -  Aposentadorias Especiais de Professores",
            "Benefícios a Conceder - Encargos -  Outras Aposentadorias Especiais",
            "Benefícios a Conceder - Encargos -  Aposentadorias por Invalidez",  
            "Benefícios a Conceder - Encargos -  Pensões Por Morte de Servidores em Atividade",
            "Benefícios a Conceder - Encargos -  Pensões Por Morte de Aposentados"  
  ],

  "(+) Valor Presente das Contribuições Futuras Patrocinador":['Benefícios a Conceder - Contribuições Futuras do Ente'],

  "(+) Valor Presente das Contribuições Futuras Participante":['Benefícios a Conceder - Contribuições  Futuras dos Segurados Ativos'],

  "(+) Valor da Compensação Previdenciária (Beneficios a Conceder)":['Benefícios a Conceder - Compensação Previdenciária a Receber'],

  "(=) Reserva Matemática de Benefícios a Conceder (RMB a Conceder)":["(-) Valor Presente dos Benefícios Futuros (A Conceder)",
            "(+) Valor Presente das Contribuições Futuras Participante",
            "(+) Valor Presente das Contribuições Futuras Patrocinador",
            "(+) Valor da Compensação Previdenciária (Beneficios a Conceder)"
            ],

  "(=) Reserva Matemática (RMBC + RMBaC)": ["(=) Reserva Matemática de Benefícios Concedidos (RMB - Concedidos)",
            "(=) Reserva Matemática de Benefícios a Conceder (RMB a Conceder)"],

  "(+) Valor Presente dos Acordos de Parcelamentos":["Valor Atual dos Parcelamentos de Débitos Previdenciários"],

  "(+) Ativo Líquido do Plano":['ATIVOS GARANTIDORES DOS COMPROMISSOS DO PLANO DE BENEFÍCIOS'],

  "(=) Ativo Total do Plano":["(+) Valor Presente dos Acordos de Parcelamentos",
            "(+) Ativo Líquido do Plano"
  ],
  "Resultado Atuarial":["(=) Reserva Matemática (RMBC + RMBaC)",
                        "(=) Ativo Total do Plano"
      
  ]
  }

  contas_negativas = ["(-) Valor Presente dos Benefícios Futuros (Aposentados)",
                      "(-) Valor Presente dos Benefícios Futuros (Pensionistas)",
                      "(-) Valor Presente dos Benefícios Futuros (A Conceder)",
                      ]

  def build_table(dados_regime):
    anos = np.array(dados_regime['dt_exercicio'].drop_duplicates().sort_values())
    first = True
    for ano in anos:
      if first == True:
        dados_tabela = pd.DataFrame(columns=['dt_exercicio','ds_item_resultado', 'vl_geracao_atual'])
        
        first=False
      for i in descri:
        soma = 0
        for conta in descri[i]:
          
          
          try:
            if conta == 'Benefícios a Conceder - Encargos -  Compensação Previdenciária a Pagar':
              # print(conta)
              soma -= float(dados_regime.query('ds_item_resultado=="' + str(conta) + '" & dt_exercicio=='+ str(ano))['vl_geracao_atual'])
              # print(conta , 'ok', float(dados_regime.query('ds_item_resultado=="' + str(conta) + '" & dt_exercicio=='+ str(ano))['vl_geracao_atual']))
            else:
              soma += float(dados_regime.query('ds_item_resultado=="' + str(conta) + '" & dt_exercicio=='+ str(ano))['vl_geracao_atual'])

          except:
            try:
              # print(conta , 'ok')
              if conta == 'Benefícios a Conceder - Encargos -  Compensação Previdenciária a Pagar':
                soma -= float(dados_tabela.query('ds_item_resultado=="' + str(conta) + '" & dt_exercicio=='+ str(ano))['vl_geracao_atual'])
              else:
                soma += float(dados_tabela.query('ds_item_resultado=="' + str(conta) + '" & dt_exercicio=='+ str(ano))['vl_geracao_atual'])
            except:
              # print("erro", conta , 'ok')
              soma += 0.0
        if i in contas_negativas:
            soma = soma * -1
        dados_tabela.loc[dados_tabela.shape[0]] = [ano, 	i,	str(soma)]
        
        # print(dados_tabela)
        # break
    return dados_tabela


  for cid in cidades:
      mun = cid[1]
      cnpj = cid[1]
      print(cid[0])

      table = 'DRAA_VALORES_COMPROMISSOS'
      url = str('https://apicadprev.economia.gov.br/' + table + '?nr_cnpj_entidade='+ cnpj)
      

      diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/balanco_atuarial.json"
      # if os.path.isfile(diretorio) == True:
      #   continue

      # print(url)
      try:
          result_parc = requests.get(url,verify=False)
          result_parc = result_parc.content
          result_parc = json.loads(result_parc)
          # print(result_parc)
      except:
          print('Aguardando...') 
          time.sleep(10)
          result_parc = requests.get(url,verify=False)
          result_parc = result_parc.content
          result_parc = json.loads(result_parc)

      # with open('rs.json', "r") as arquivo:
      # # Carrega o conteúdo do arquivo JSON em um objeto Python
      #   result_parc = json.load(arquivo)

      dados = pd.DataFrame(result_parc['results'][0]['data'])
      ####### dados = dados.query('tp_plano=="' + str(regime) +'"&te_situacao=="Documentos Digitalizados"')
      dados = dados.query('te_situacao=="Documentos Digitalizados" & tp_massa=="Civil"')
      dados.to_excel('rs.xlsx')
      dados = dados[['tp_plano','dt_exercicio','ds_item_resultado', 'vl_geracao_atual']]
      dados.reset_index(drop=True,inplace= True)
      dados = dados.fillna(0)
      # print(dados)
      # break

      # adicionar as linhas que sao somas

      planos = dados['tp_plano'].drop_duplicates()
      data = []
      regimes = {}
      for plano in planos:
          r = build_table(dados.query('tp_plano=="' + plano + '"'))
          regimes[plano] = {}
          
          # print(r)
          
          for conta in descri.keys():
              regimes[plano][conta] = {}
              anos = r['dt_exercicio'].drop_duplicates()
              # print(anos)
              # break
              for ano in anos:
                  anual = r.query('dt_exercicio==' + str(ano))
                  conta_valor = anual.query('ds_item_resultado=="' + conta + '"')['vl_geracao_atual']
                  # print(anual)
                  regimes[plano][conta][ano] = int(round(float(conta_valor),0))
                  
      data.append(regimes)

      # print(data)
      
      
      json_object = json.dumps(data, indent=4)
      
      diretorio = "./balanco_atuarial.json"
      with open(diretorio, "w") as outfile: 
          outfile.write(json_object) 




      diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/balanco_atuarial.json"
      with open(diretorio, "w") as outfile: 
          outfile.write(json_object) 

