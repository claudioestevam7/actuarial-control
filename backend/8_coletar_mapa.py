# instalat selenium e webdriver-manager
from selenium import webdriver
import time
import pyperclip
import pandas as pd
import json
import os


import var

estados = pd.read_json('estados.json')

estado = var.estadoSelecionado()[0]
indice = var.estadoSelecionado()[1] 


cidades = estados['Cidades'][indice]

#codigo padaro para identificar e instalar o webdriver atualizado (3 linhas abaixo sao padrao para firefox)

from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
servico = Service(ChromeDriverManager().install())

#abrir o navegador
navegador = webdriver.Chrome(service=servico)



for cid in cidades:
    mun = cid[1]
    cnpj = cid[1]
    print(cid[0],cid[1])


    #verificar se o arquivo ja existe
    diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/mapa.js"
    if os.path.isfile(diretorio) == True:
        continue

    #acessar um link
    
    navegador.get('https://www.google.com.br/maps')

    time.sleep(2)

    descricao = "cidade " + cid[0] + " - " + estado
    #acessar um elemento                                                                                  
    navegador.find_element('xpath', '//*[@id="searchboxinput"]').send_keys(descricao)
    time.sleep(1)

    # .click para clicar
    # .send_keys para precher com texto
    #clicar em pesquisar

    navegador.find_element('xpath', '//*[@id="searchbox-searchbutton"]').click()
    time.sleep(2)



    try:
        #clicar em compartilhar
        navegador.find_element('xpath', '/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[4]/div[5]/button').click()
    except: 
        print('------- Dualidade detectada -------')

        #clicar no primeiro endereco
        navegador.find_element('xpath', '//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[1]/div[1]/div/a').click()

        time.sleep(3)
        try:
            #clicar em compartilhar
            navegador.find_element('xpath', '/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[4]/div[5]/button').click()
        except:
            #clicar em compartilhar
            navegador.find_element('xpath','/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[3]/div/div[1]/div/div/div[2]/div[4]/div[5]/button/span/img').click()

        
        

    """ #clicar em compartilhar
    navegador.find_element('xpath', '/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[4]/div[5]/button').click() """

    time.sleep(1)

    # clicar em incorporar um mapa
    navegador.find_element('xpath', '/html/body/div[3]/div[1]/div/div[2]/div/div[3]/div/div/div[1]/div[2]/button[2]').click()

    time.sleep(1)

    # clicar em copiar HTML
    navegador.find_element('xpath', '/html/body/div[3]/div[1]/div/div[2]/div/div[3]/div/div/div/div[3]/div[1]/button[2]').click()

    time.sleep(1)

   
    # para utilizar o pyperclip é preciso instar "sudo apt-get install xclip"
    text = pyperclip.paste()

    text = text.replace('width="600" height="450" style="border:0;"', 'width="330" height="245" title="geo"')


    # salvar html em arquivo .js
    diretorio = '../dashboard/src/components/pages/data/' + estado + '/' + mun + "/mapa.js"
    arquivo = open(diretorio, "w")
    arquivo.write("export  const geo = [" + text + "]")
    arquivo.close()


            