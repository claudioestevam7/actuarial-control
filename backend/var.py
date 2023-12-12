
###    AC   0        ok
###    AL   1        ok
###    AP   2        ok
###    AM   3        
###    BA   4        
###    CE   5        
###    DF   6          
###    ES   7          
###    GO   8        
###    MA   9        
###    MT   10         
###    MS   11       
###    MG   12       ok
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
###    SC   23       
###    SP   24    ok   
###    SE   25       
###    TO   26          


from A7_coletar_aliquota import coletarAliquota
from A6_coletar_crp import coletarCrp
from A5_coletar_arvore_inicial import coletarArvoreInicial
from A4_coletar_ibge import coletarIbge
from A3_coletar_balanco_atuarial import coletarBalancoAtuarial
from A2_coletar_estatico_compilado import coletarEstatisticoCompilado


# def estadoSelecionado ():
  
#   return ['MG', 12]



var = ['MG', 12]

# coletarEstatisticoCopimlado(var)
coletarBalancoAtuarial(var)
coletarIbge(var)
coletarArvoreInicial(var)
coletarCrp(var)
coletarAliquota(var)
