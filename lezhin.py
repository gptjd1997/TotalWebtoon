import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from find_day import find_day


def lezhin():
    print("레진코믹스")
    portal = "레진코믹스"

    ###

    options = Options()
    options.headless=True


    ###

    browser = webdriver.Chrome(executable_path="./chromedriver.exe",options=options)
    browser.get("https://www.lezhin.com/ko/scheduled?day=1")
    time.sleep(1)

    html = browser.page_source


    soup = BeautifulSoup(html,"html.parser") #링크를 html 형식으로 전환

    wtList = soup.select(".lzComic__list")

    allWebtoon = [] #전체 웹툰이 들어갈 배열

    for index,wt in enumerate(wtList): #전체 웹툰 반복문
        day = find_day(index)
        for list in wt.select("li"): #요일별 웹툰 반복문
            data_bool = list.img.has_attr('data-src')
            if data_bool:
                thumbnail = list.img['data-src']
            else:
                thumbnail = list.img['src'] #웹툰 썸네일 링크
            link = "https://www.lezhin.com"+list.a["href"] #웹툰 링크
            title = list.select_one(".lzComic__title").string
            webtoon={"day":day,"thumbnail":thumbnail,"link":link,"title":title,"portal":portal} #모은 정보를 토대로 json 형식으로 저장
            allWebtoon.append(webtoon) #webtoons(요일별 웹툰)배열에 추가



    return allWebtoon
