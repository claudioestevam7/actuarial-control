import pandas as pd
import os

estados = pd.read_json('estados.json')

###    AC   0
###    AL   1
###    AP   2
###    AM   3
###    BA   4
###    CE   5
###    DF   6
###    ES   7
###    GO   8
###    MA   9
###    MT   10
###    MS   11
###    MG   12      ok
###    PA   13
###    PB   14
###    PR   15
###    PE   16
###    PI   17
###    RJ   18
###    RN   19
###    RS   20
###    RO   21
###    RR   22
###    SC   23       ok
###    SP   24       ok
###    SE   25
###    TO   26 



est = 'AL'
indice = 1

cid = estados['Cidades'][indice]
cid 

###############################################
######## CRIE PRIMEIRO UMA PASTA PARA O ESTADO
###############################################


for c in cid:
    dir =  "./data/" + est +"/" + c[1]
    if os.path.isdir(dir) == False:
        print(c)
        os.mkdir(dir)