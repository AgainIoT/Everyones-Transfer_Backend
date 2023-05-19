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
import { getStationInfo } from "./OpenAPI/stationInfoAPI.js";
import request from "request";
import { createCollection } from "./MongoModule/collections.js";
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


// getStationInfo("가산디지털단지").then((result) => {
//     // 서울역만 역을 붙임
//     console.log(result.list_total_count);
//     console.log(result.row);
// });

// createCollection()

// request(
//     {
//         url: "https://api.odsay.com/v1/api/subwayStationInfo?lang=0&stationID=1405&apiKey=gVwPsIqng1dgToFhQ9vTQm5idr9yyT7dxPEVJmcEMnQ",
//         method: "GET",
//     }, (error, response, body) => {
//         console.log(JSON.parse(body).result)
//         console.log(JSON.parse(body).result.prevOBJ.station[0])
//         console.log(JSON.parse(body).result.exOBJ)
//         // console.log(JSON.parse(body).result.nextOBJ.station[0].stationName)
//     }
// )

// 1607 - 312 = 1295
