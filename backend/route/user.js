import express from "express";
import { users } from "../lib/model/models";
import jwt from "jsonwebtoken";
const router = express.Router();
const secret = process.env.SECRET;

router.post("/check_login", async (req, res) => {
    const { query } = req;
    const { token } = query;

    if (token) {
        try {
            jwt.verify(token, secret, async (err, decoded) => {
                users.findOne({ _id: decoded._id }, (err, user) => {
                    if (!err && user) {
                        res.json({ loggin: true, user });
                    } else {
                        res.json({ loggin: false, user: false });
                    }
                });
            });
        } catch (error) {}
    } else res.json({ loggin: false, user: false });
});

router.post("/login", async (req, res) => {
    const { query } = req;
    const { email, social } = query;

    console.log("로그인");
    await users.updateOne({ email, social }, { $set: { email, social } }, { upsert: true }).then((val) => {
        console.log(val);
    });

    await users.findOne({ email, social }, (err, result) => {
        console.log(result);

        var token = jwt.sign({ _id: result._id }, secret);
        res.json(token);
    });
});

router.post("/find_bookmark", async (req, res) => {
    const { query } = req;
    console.log(query);

    await users.findById(query.user).exec((err, data) => {
        res.send(data._bookmarks.includes(query.webtoon));
    });
});

router.post("/find_bookmark_webtoons", async (req, res) => {
    const { query } = req;
    const { _id } = query;

    await users
        .findById(_id)
        .populate("_bookmarks")
        .exec((err, data) => {
            res.send(data._bookmarks);
        });
});

router.post("/marking", async (req, res) => {
    const { query } = req;
    const { user, webtoon } = query;

    console.log(req);
    console.log(query);
    await users.findByIdAndUpdate(user, { $push: { _bookmarks: webtoon } }).exec((err, data) => console.log(data));
});

router.post("/unmarking", async (req, res) => {
    const { query } = req;
    const { user, webtoon } = query;

    await users.findByIdAndUpdate(user, { $pull: { _bookmarks: webtoon } }).exec((err, data) => console.log(data));
});

export default router;
