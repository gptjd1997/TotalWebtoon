import mongoose from "mongoose";
import dotenv from "dotenv";
import webtoons from "./model/models";

dotenv.config();

const db = mongoose.connection;

mongoose.Promise = global.Promise;

export default mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`Successfully connected to mongodb`))
    .catch((e) => console.error(e));
