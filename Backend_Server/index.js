import { mongoose } from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./MongoModule/mongoConnect.js";
import { findStation, findRoot, findBlock } from "./MongoModule/findDocument.js";
import { insertStation, insertBr } from "./MongoModule/insertDocument.js";
import { updateRoot, updateBlock } from "./MongoModule/updateDocument.js";
import { deleteRoot, deleteBlock } from "./MongoModule/deleteDocument.js";
import {
    stationListSchema,
    brSchema
} from "./Schema/schemas.js";

dotenv.config();

const port = 8000;
const { MONGODB_URI } = process.env;
const StationList = stationListSchema(mongoose, "stationList");
const BrList = brSchema(mongoose, "brList");
const RootList = BrList.find({"type": "root"});
const BlockList = BrList.find({"type": "block"});


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
    res.send("success");
});

app.get("/br/getRoot", async(req, res) => {
    console.log(req.body);
    let root = await findRoot(RootList, req.body);
    console.log(root);
    res.send("success");
})

app.get("/br/getBlock", async(req, res) => {
    //console.log(req.body);
    let block = await findBlock(BlockList, req.body);
    console.log(block);
    res.send("success");
})

app.post("/br/insertBr", (req, res) => {
    console.log(req.body);
    insertBr(BrList, req.body);
    res.send("success");
})

app.patch("/br/updateRoot", async(req, res) => {
    console.log(req.body);
    let root = await updateRoot(RootList, req.body);
    console.log(root);
    res.send("success");
});

app.patch("/br/updateBlock", async(req, res) => {
    console.log(req.body);
    let block = await updateBlock(BlockList, req.body);
    console.log(block);
    res.send("success");
});

app.post("/br/deleteRoot", async(req, res) => {
    console.log(req.body);
    let root = await deleteRoot(RootList, req.body);
    console.log(root);
    res.send("success");
})

app.post("/br/deleteBlock", async(req, res) => {
    console.log(req.body);
    let block = await deleteBlock(BlockList, req.body);
    console.log(block);
    res.send("success");
})

app.listen(port, () => {
    console.log(`port is listening at ${port}`);
});


connectDB(mongoose, MONGODB_URI);
