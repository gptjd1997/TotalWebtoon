import requests
from bs4 import BeautifulSoup

def kWT():

    print("케이툰")
    portal = "케이툰"

    html = requests.get("https://www.myktoon.com/web/webtoon/works_list.kt")  #웹툰 주소

    soup = BeautifulSoup(html.content,"html.parser") #링크를 html 형식으로 전환

    wtList = soup.select(".col") #전환시킨 html 에서 .col(네이버 웹툰 html 에서의 클래스)을 찾아 변수에 저장

    allWebtoon = [] #전체 웹툰이 들어갈 배열

    for wt in wtList: #전체 웹툰 반복문
        day = wt.h4.string # 웹툰 요일
        for list in wt.select("li"): #요일별 웹툰 반복문
            thumbnail = list.img['src'] #웹툰 썸네일 링크
            link = (list.a["href"]).lstrip('javascript:fncAdultCert(\'').rstrip('\')') #웹툰 링크
            title = list.strong.string
            webtoon={"day":day,"thumbnail":thumbnail,"link":link,"title":title,"portal":portal}#모은 정보를 토대로 json 형식으로 저장
            allWebtoon.append(webtoon) #webtoons(요일별 웹툰)배열에 추가


    return allWebtoon
