# instalat selenium e webdriver-manager
from selenium import webdriver
import time
import pyperclip
#codigo padaro para identificar e instalar o webdriver atualizado (3 linhas abaixo sao padrao para firefox)

from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
servico = Service(ChromeDriverManager().install())

#abrir o navegador
navegador = webdriver.Chrome(service=servico)

#acessar um link
navegador.get('https://www.google.com.br/maps')

#acessar um elemento (find_element)
navegador.find_element('xpath', '//*[@id="searchboxinput"]').send_keys('tres corações mg')

# .click para clicar
# .send_keys para precher com texto

#clicar em pesquisar
navegador.find_element('xpath', '//*[@id="searchbox-searchbutton"]').click()

time.sleep(20)

#clicar em compartilhar
navegador.find_element('xpath', '/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[4]/div[5]/button').click()

time.sleep(5)

# clicar em incorporar um mapa
navegador.find_element('xpath', '/html/body/div[3]/div[1]/div/div[2]/div/div[3]/div/div/div[1]/div[2]/button[2]').click()

time.sleep(5)

# clicar em copiar HTML
navegador.find_element('xpath', '/html/body/div[3]/div[1]/div/div[2]/div/div[3]/div/div/div/div[3]/div[1]/button[2]').click()

time.sleep(5)

# para utilizar o pyperclip é preciso instar "sudo apt-get install xclip"
text = pyperclip.paste() 

print(text)

# salvar html em arquivo .js
arquivo = open("contatos.js", "w")
arquivo.write("export  const geo = [" + text + "]")
arquivo.close()

time.sleep(2)