import pymongo
import os

from dotenv import load_dotenv

load_dotenv(verbose=True)

#client = pymongo.MongoClient("mongodb+srv://gptjd1997:%s@cluster0.nform.mongodb.net/%s?retryWrites=true&w=majority" %(os.getenv('PASS'),os.getenv('DB_NAME')))
client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")

db = client["total_webtoon"]

webtoon_col = db["webtoons"]



def webtoon_update(webtoons):
    for webtoon in webtoons:
        print(webtoon["thumbnail"])
        webtoon_col.update_one({"title":webtoon["title"],"portal":webtoon["portal"]}, {"$set": webtoon}, upsert=True)
        
    print("완료")
