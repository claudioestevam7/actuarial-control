import pandas as pd
import shutil
import os

ufs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]
# ufs = ["AC","AL"]
indices = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
estados = pd.read_json('estados.json')



for uf, indice in zip(ufs, indices):
  for cidade in estados['Cidades'][indice]:
    
    diretorio = '../dashboard/src/components/pages/data/' + uf +'/' + cidade[1] + '/estatistico_compilado.json'
    # if os.path.isfile(diretorio) == False:
    #     continue
    e = pd.read_json(diretorio)
    if e.empty == True:
      print(uf, cidade[1])
      dir =  "./data/" + 'AL' +"/" + "12200150000128"
      shutil.rmtree(dir)







