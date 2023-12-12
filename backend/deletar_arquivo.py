import pandas as pd
import os
import shutil


estados = pd.read_json('estados.json')

est = 'MG'

cid = estados['Cidades'][0]
cid


#### deletar aqrquivo
# for c in cid:
#     dir =  "./data/" + est +"/" + c[1] +"/resultado.json"
#     if os.path.isfile(dir) == True:
#         print(c)
#         os.remove(dir)


