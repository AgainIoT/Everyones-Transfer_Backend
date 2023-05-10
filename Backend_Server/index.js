import { mongoose } from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./MongoModule/mongoConnect.js";
import { findStation } from "./MongoModule/findDocument.js";
import { insertStation } from "./MongoModule/insertDocument.js";
import {
    stationListSchema,
    rootSchema,
    blockSchema,
} from "./Schema/schemas.js";

dotenv.config();

const port = 8000;
const { MONGODB_URI } = process.env;
const StationList = stationListSchema(mongoose, "stationList");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/station/getStationList", async (req, res) => {
    console.log(req.body.stationName);
    let station = await findStation(StationList, req.body.stationName);
    console.log(station);
    res.send("success");
});

app.post("/station/insertStation", (req, res) => {
    console.log(req.body.stationName);
    insertStation(StationList, req.body.stationName);
    res.send("success")
});

app.listen(port, () => {
    console.log(`port is listening at ${port}`);
});

connectDB(mongoose, MONGODB_URI);
