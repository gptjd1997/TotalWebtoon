import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from find_day import find_day

def kakaoWT():
    print("카카오페이지")
    portal="카카오페이지"

    ###

    options = Options()
    options.headless=True

    ###

    kakao = []
    kakao.append("https://page.kakao.com/main?categoryUid=10&subCategoryUid=1004&day=1") #웹툰 월
    kakao.append("https://page.kakao.com/main?categoryUid=10&subCategoryUid=1004&day=2") #웹툰 화
    kakao.append("https://page.kakao.com/main?categoryUid=10&subCategoryUid=1004&day=3") #웹툰 수
    kakao.append("https://page.kakao.com/main?categoryUid=10&subCategoryUid=1004&day=4") #웹툰 목
    kakao.append("https://page.kakao.com/main?categoryUid=10&subCategoryUid=1004&day=5") #웹툰 금
    kakao.append("https://page.kakao.com/main?categoryUid=10&subCategoryUid=1004&day=6") #웹툰 토
    kakao.append("https://page.kakao.com/main?categoryUid=10&subCategoryUid=1004&day=7") #웹툰 일

    ###

    browser = webdriver.Chrome(executable_path="./chromedriver.exe",options=options)

    allwebtoon=[]
    for index,val in enumerate(kakao):
        browser.get(kakao[index])
        time.sleep(1)

        html = browser.page_source

        soup = BeautifulSoup(html,'html.parser')
        list = soup.select(".css-1md2t19")

        for li in list: # 인덱스 값을 얻기 위해서 enumerate 사용
            day = find_day(index)
            link = "https://page.kakao.com"+li.get("href")
            thumbnail = li.img["data-src"]
            title = li.select_one(".text-ellipsis").string

            webtoon={"day":day,"thumbnail":thumbnail,"link":link,"title":title,"portal":portal}
            allwebtoon.append(webtoon)

    return allwebtoon

