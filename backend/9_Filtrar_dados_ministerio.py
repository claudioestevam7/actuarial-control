import pandas as pd
import json



d = pd.read_excel('./data/ministerio.xlsx')
e = pd.read_json('estados.json')


data = []
data_prov = {}

for i in range(len(e['Estado'])):
  data_prov[e['Estado'][i]] = {}
  for c in e['Cidades'][i]:
    n = (c[0]).upper() + ' - ' + e['Estado'][i]
    local = d.query('ENTE=="'+ n + '"')


    try:
      data_prov[e['Estado'][i]][c[1]] = {"isp" : local['INDICADOR DE SITUAÇÃO PREVIDENCIÁRIA'].values[0],
                  "perfil" : local['PERFIL ATUARIAL'].values[0]}
    except:
      data_prov[e['Estado'][i]][c[1]] = {"isp" : 'N',
                  "perfil" : 'N'}


  data.append(data_prov)


json_object = json.dumps(data, indent=4)

diretorio = 'ministerio.json'
with open(diretorio, "w") as outfile:
  outfile.write(json_object) 