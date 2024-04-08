import express, { json } from "express";
import { ObjectID } from "mongodb";
import { webtoons, comments, users } from "../lib/model/models";
const router = express.Router();

router.post("/update", async (req, res) => {});

router.post("/find", async (req, res) => {
    const query = req.query;
    let day = query.day;
    if (day === "Monday") day = "월";
    else if (day === "Sunday") day = "일";
    else if (day === "Tuesday") day = "화";
    else if (day === "Wednesday") day = "수";
    else if (day === "Thursday") day = "목";
    else if (day === "Friday") day = "금";
    else if (day === "Saturday") day = "토";
    console.log(day);

    await webtoons.find({ day: day }).then((webtoon) => {
        console.log(webtoon);
        return res.json(webtoon);
    });
});

router.post("/comment_find", async (req, res) => {
    const { query } = req;
    const { _id } = query;

    try {
        await webtoons
            .findOne({ _id })
            .populate({ path: "_comments", select: "comment createdAt", populate: { path: "_user", select: "email" } })
            .exec((err, data) => {
                res.json(data._comments);
            });
    } catch (error) {
        console.log("ㅇ하");
    }
});

router.post("/comment_insert", async (req, res) => {
    const { query } = req;
    const { user, webtoon, comment } = query;

    const comment_id = new ObjectID();

    await new comments({ _id: comment_id, _user: user, _webtoon: webtoon, comment }).save();
    await webtoons.updateOne({ _id: webtoon }, { $push: { _comments: [comment_id] } }).exec();
    await users.updateOne({ _id: user }, { $push: { _comments: [comment_id] } }).exec();
    //
    res.json();
});

router.post("/check_rating", async (req, res) => {
    const { query } = req;
    const { user_id, webtoon_id } = query;
    console.log("check_rating");
    if (user_id) {
        users.findOne({ _id: user_id }).exec((err, data) => {
            if (data._ratedWebtoon.includes(webtoon_id)) {
                res.json({ rateAble: false });
            } else {
                res.json({ rateAble: true });
            }
        });
    } else {
        res.json({ rateAble: false });
    }
});

router.post("/rating_update", async (req, res) => {
    const { query } = req;
    const { score, user_id, webtoon_id } = query;

    await users.findByIdAndUpdate(user_id, { $push: { _ratedWebtoon: webtoon_id } }).exec();
    await webtoons.findByIdAndUpdate(webtoon_id, { $inc: { total_score: +score, score_count: +1 } }).exec((err, dada) => {
        webtoons
            .findById(webtoon_id, (err, data) => {
                webtoons.findByIdAndUpdate(webtoon_id, { score: data.total_score / data.score_count }).exec((err, data) => res.send(true));
            })
            .exec();
    });
});

router.post("/views_increase", async (req, res) => {
    const { query } = req;
    const { _id } = query;
    console.log("views_increase");

    await webtoons.findByIdAndUpdate(_id, { $inc: { views: +1 } }).exec();
});

router.post("/find_rate", async (req, res) => {
    const { query } = req;
    const { _id } = query;

    await webtoons.findOne({ _id }).exec((err, data) => {
        res.json({ score: data.score });
    });
});

export default router;
