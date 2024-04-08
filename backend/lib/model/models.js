import { Double } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;
mongoose.set("useCreateIndex", true);

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    nickname: String,
    email: { type: String, unique: true, required: true },
    social: { type: String, required: true },
    _bookmarks: [{ type: Schema.Types.ObjectId, ref: "webtoons" }],
    _comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
    _ratedWebtoon: [{ type: Schema.Types.ObjectId, ref: "webtoons" }],
});

const commentSchema = new Schema({
    _id: Schema.Types.ObjectId,
    _webtoon: { type: Schema.Types.ObjectId, ref: "webtoons" },
    _user: { type: Schema.Types.ObjectId, ref: "users" },
    score: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    comment: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

const webtoonSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },

    day: {
        type: String,
        required: true,
    },

    thumbnail: {
        type: String,
        required: true,
    },

    link: {
        type: String,
        required: true,
    },

    portal: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },
    like: {
        type: Number,
        default: 0,
    },
    views: { type: Number, default: 0 },
    total_score: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    score_count: { type: Number, default: 0 },

    _comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
});

export const users = mongoose.model("users", userSchema);

export const comments = mongoose.model("comments", commentSchema);

export const webtoons = mongoose.model("webtoons", webtoonSchema);
