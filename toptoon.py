import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from find_day import find_day

def toptoon():
    print("탑툰")
    portal = "탑툰"

    options = Options()
    options.headless=True

    ###

    toptoon = "https://toptoon.com/weekly"

    ###

    browser = webdriver.Chrome(executable_path="./chromedriver.exe",options=options)

    allwebtoons=[]
    browser.get(toptoon)
    time.sleep(1)

    list=[]
    for val in range(1,8):
        path = "/html/body/div[5]/div/div/ul/li[%s]/a" % val
        browser.find_element_by_xpath(path).click()
        time.sleep(1)
        html = browser.page_source
        soup = BeautifulSoup(html,'html.parser')
        htmls = soup.select(".jsComicObj")
        list.append(htmls)


    allwebtoons=[]
    for index,val in enumerate(list):

        day = find_day(index)

        webtoons=[]
        for li in val: # 인덱스 값을 얻기 위해서 enumerate 사용

            link = "https://toptoon.com"+li.a["href"]
            thumbnail = li.select_one(".thumb_img").get("style")
            if thumbnail==None:
                thumbnail = li.select_one(".thumb_img").get("data-src")
            else:
                thumbnail = thumbnail.lstrip("background-image: url(\"").rstrip("\");") # 스타일에서 url만 추출하는 과정
            title = li.select_one(".title").get("title")

            webtoon={"day":day,"thumbnail":thumbnail,"link":link,"title":title,"portal":portal}
            allwebtoons.append(webtoon)


    return allwebtoons



