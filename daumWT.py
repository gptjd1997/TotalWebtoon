import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from find_day import find_day

def daumWT():
    print("다음")

    portal= "다음 웹툰"

    options = Options()
    options.headless=True

    ###

    daum = []
    daum.append("http://webtoon.daum.net/#day=mon&tab=day") #웹툰 월
    daum.append("http://webtoon.daum.net/#day=tue&tab=day") #웹툰 화
    daum.append("http://webtoon.daum.net/#day=wed&tab=day") #웹툰 수
    daum.append("http://webtoon.daum.net/#day=thu&tab=day") #웹툰 목
    daum.append("http://webtoon.daum.net/#day=fri&tab=day") #웹툰 금
    daum.append("http://webtoon.daum.net/#day=sat&tab=day") #웹툰 토
    daum.append("http://webtoon.daum.net/#day=sun&tab=day") #웹툰 일

    ###

    browser = webdriver.Chrome(executable_path="./chromedriver.exe",options=options)

    allwebtoons=[]
    for index,val in enumerate(daum):
        browser.get(daum[index])
        time.sleep(1)

        html = browser.page_source

        soup = BeautifulSoup(html,'html.parser')
        list = soup.select(".list_wt > li")

        for li in list: # 인덱스 값을 얻기 위해서 enumerate 사용
            day = find_day(index)
            link = "http://webtoon.daum.net"+li.a["href"]
            thumbnail = li.img["src"]
            title = li.strong.text

            webtoon={"day":day,"thumbnail":thumbnail,"link":link,"title":title,"portal":portal}
            allwebtoons.append(webtoon)


    return allwebtoons



