import { mongoose } from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./MongoModule/mongoConnect.js";
import {
    findStation,
    findRoot,
    findBlock,
} from "./MongoModule/findDocument.js";
import { insertStation, insertBr } from "./MongoModule/insertDocument.js";
import { updateRoot, updateBlock } from "./MongoModule/updateDocument.js";
import { deleteRoot, deleteBlock } from "./MongoModule/deleteDocument.js";
import {
    stationListSchema,
    rootSchema,
    blockSchema,
} from "./Schema/schemas.js";
import { getStationInfo } from "./OpenAPI/stationInfoAPI.js";
import request from "request";
import { createCollection } from "./MongoModule/collections.js";
dotenv.config();

const port = 8000;
const { MONGODB_URI } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/station/getLine", async (req, res) => {
    let stationInfo = {
        stationName: req.body.stationName,
        collectionName: "",
        LineCnt: 0,
        Line: [],
        returnValue: false,
    };

    if (req.body.stationName == "서울") {
        req.body.stationName = "서울역";
    } else if (req.body.stationName == "서울역") {
        stationInfo.stationName = "서울";
    }

    console.log(stationInfo.stationName);
    console.log(req.body.stationName);
    await getStationInfo(req.body.stationName).then((result) => {
        if (result == undefined) {
            res.send({ returnValue: false, errMsg: "역 이름이 아닙니다" });
        } else if (result.list_total_count._text == 1) {
            res.send({ returnValue: false, errMsg: "환승역이 아닙니다" });
        } else {
            stationInfo.LineCnt = result.list_total_count._text;
            stationInfo.returnValue = true;
            stationInfo.collectionName = "no" + result.row[0].STATION_CD._text;
            for (let i = 0; i < stationInfo.LineCnt; i++) {
                stationInfo.Line.push(
                    result.row[i].LINE_NUM._text.replace("0", "")
                );
            }
            console.log(stationInfo);
            res.send(stationInfo);
        }
    });
});

app.get("/test/", async (req, res) => {
    const Block = blockSchema(mongoose, "no1702");
    await Block.findOne({ type: "block" })
        .exec()
        .then((result) => {
            console.log(result);
        });
    const Root = rootSchema(mongoose, "no1702");
    await Root.findOne({ type: "root" })
        .exec()
        .then((result) => {
            console.log(result);
        });
    res.send("1");
});

app.get("/test2/", async (req, res) => {
    const Block = blockSchema(mongoose, "no1702");
    const nblock = new Block({
        type: "block",
        source: "시작지점",
        destination: "끝지점",
        content: ["어쩌구", "저쩌구"],
    });

    nblock
        .save()
        .then((result) => {
            console.log("[insertStation] " + result);
        })
        .catch((err) => {
            console.log("[insertStation] error");
            console.log(err);
        });

    const Root = rootSchema(mongoose, "no1702");
    const nroot = new Root({
        type: "root",
        source: { line: "2", next: "신당" },
        destination: { line: "5", next: "청구" },
        blocklist: [],
    });

    nroot
        .save()
        .then((result) => {
            console.log("[insertStation] " + result);
        })
        .catch((err) => {
            console.log("[insertStation] error");
            console.log(err);
        });

    res.send("1");
});

app.listen(port, () => {
    console.log(`port is listening at ${port}`);
});

connectDB(mongoose, MONGODB_URI);