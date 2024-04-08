
import os
from naverWT import naverWT
from daumWT import daumWT
from toptoon import toptoon
from lezhin import lezhin
from kakaoWT import kakaoWT
from kWT import kWT
import timeit
import mongo_query

start_time = timeit.default_timer() # 시작 시간 체크


webtoons=[]
webtoons.append(naverWT())
webtoons.append(daumWT())
webtoons.append(lezhin())
webtoons.append(toptoon())
webtoons.append(kakaoWT())
webtoons.append(kWT())

for webtoon in webtoons:
    mongo_query.webtoon_update(webtoon)

terminate_time = timeit.default_timer()  # 종료 시간 체크

print("%f초 걸렸습니다." % (terminate_time - start_time))