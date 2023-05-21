import { mongoose } from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./MongoModule/mongoConnect.js";
import { insertStationList, insertRoot, insertBlock } from "./MongoModule/insertDocument.js";
import { updateStationList, updateRoot, updateBlock } from "./MongoModule/updateDocument.js";
import { getStationInfo } from "./OpenAPI/stationInfoAPI.js";
import { findStationList, findRootByID, findBlockByPlace, findBlockByID } from "./MongoModule/findDocument.js";
import { dataToPlace } from "./convertModule/dataToPlace.js";
dotenv.config();

const port = 8000;
const { MONGODB_URI } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/station/getLine", async (req, res) => {
    let stationInfo = {
        stationName: req.body.stationName,
        collectionID: "",
        LineCnt: 0,
        Line: [],
        returnValue: false,
    };

    if (req.body.stationName == "서울") {
        req.body.stationName = "서울역";
    } else if (req.body.stationName == "서울역") {
        stationInfo.stationName = "서울";
    }

    await getStationInfo(req.body.stationName)
        .then((result) => {
            if (result == undefined) {
                res.send({ returnValue: false, errMsg: "역 이름이 아닙니다" });
            } else if (result.list_total_count._text == 1) {
                res.send({ returnValue: false, errMsg: "환승역이 아닙니다" });
            } else {
                stationInfo.LineCnt = result.list_total_count._text;
                stationInfo.returnValue = true;
                stationInfo.collectionID = "no" + result.row[0].STATION_CD._text;
                for (let i = 0; i < stationInfo.LineCnt; i++) {
                    stationInfo.Line.push(result.row[i].LINE_NUM._text.replace("0", ""));
                }
                console.log("------------------------------------");
                console.log("[/station/getLine] success!");
                console.log(stationInfo);
                console.log("------------------------------------");
                res.send(stationInfo);
            }
        })
        .catch((err) => {
            console.log("------------------------------------");
            console.log("[/station/getLine] error!");
            console.log(err);
            console.log("------------------------------------");
            res.send({
                returnValue: false,
                errMsg: "API에 조회가 되지 않습니다.",
            });
        });
});

app.get("/root/getRoot", async (req, res) => {
    // startAt이랑 endAt을 한번 더 검사하는 부분 추가했으면 좋겠음
    let { stationName, collectionID, startAt, endAt, line } = req.body;

    let response = {
        collectionID: collectionID,
        rootID: "",
        returnValue: true,
    };

    let stationInfo;
    let rootInfo = {
        startAt: startAt,
        endAt: endAt,
    };

    let flag = true;

    /* stationList에서 해당 역이 있는 없는지를 판단 */
    await findStationList(mongoose, stationName)
        .then((result) => {
            stationInfo = result;
        })
        .catch((err) => {
            console.log("------------------------------------");
            console.log("[/root/getRoot] error!");
            console.log(err);
            console.log("------------------------------------");
        });

    let newStationInfo;

    if (stationInfo == null) {
        // stationList에 해당 역이 존재하지 않는다.
        newStationInfo = {
            stationName: stationName,
            collectionID: response.collectionID,
            lineInfo: line,
            rootInfo: [
                {
                    startAt: startAt,
                    endAt: endAt,
                    rootID: "",
                },
            ],
        };
    } else {
        // stationList에 해당 역이 존재한다.
        for (let i = 0; i < stationInfo.rootInfo.length; i++) {
            if (
                stationInfo.rootInfo[i].startAt.next == startAt.next &&
                stationInfo.rootInfo[i].endAt.next == endAt.next
            ) {
                // stationList에 해당 역의 데이터에, 해당 루트도 존재한다.
                response.rootID = stationInfo.rootInfo[i].rootID;
                flag = false;
            }
        }
    }

    if (response.rootID == "") {
        // stationList에 해당 역의 데이터에, 해당 루트가 존재하지 않는다.
        await insertRoot(mongoose, rootInfo, response.collectionID).then(
            // 루트를 만들어준다.
            (result) => {
                console.log(result);
                response.rootID = result._id;
            }
        );
    }

    if (newStationInfo != undefined) {
        // stationList에 해당 역의 데이터가 없으니 추가해준다. -> insert
        newStationInfo.rootInfo[0].rootID = response.rootID;
        console.log(newStationInfo);
        insertStationList(mongoose, newStationInfo);
    } else if (flag) {
        // stationList에 해당 역에 대한 데이터는 있으나, 해당 루트에 대한 데이터는 존재하지 않는다. -> update
        let newRootInfo = {
            startAt: startAt,
            endAt: endAt,
            rootID: response.rootInfo[0].rootID,
        };
        updateStationList(mongoose, newRootInfo, stationName);
    }

    console.log("------------------------------------");
    console.log("[/root/getRoot]");
    console.log(response);
    console.log("------------------------------------");

    res.send(response);
});

app.get("/block/getBlock", async (req, res) => {
    const { collectionID, from, to } = req.body;
    let response = {
        blockID: "",
        originContent: [],
        returnValue: true,
    };

    let block = await findBlockByPlace(mongoose, collectionID, from, to);

    if (block == null) {
        block = await insertBlock(mongoose, from, to, [], collectionID);
        response.blockID = block._id;
    } else {
        response.blockID = block._id;
        response.originContent = block.content;
    }

    console.log("------------------------------------");
    console.log("[/block/getBlock]");
    console.log(response);
    console.log("------------------------------------");

    res.send(response);
});

app.patch("/block/patchBlock", async (req, res) => {
    const { collectionID, blockID, content } = req.body;
    let response = { returnValue: true };
    await updateBlock(mongoose, collectionID, blockID, content)
        .then((result) => {
            console.log("------------------------------------");
            console.log("[/block/patchBlock]");
            console.log(response);
            console.log("------------------------------------");
            res.send(response);
        })
        .catch((err) => {
            response.returnValue = false;
            response.errMsg = "Block 업데이트 과정에 에러가 발생했습니다.";
            console.log("------------------------------------");
            console.log("[/block/patchBlock]");
            console.log(response);
            console.log(err);
            console.log("------------------------------------");
            res.send(response);
        });
});

app.patch("/root/patchRoot", async (req, res) => {
    const { collectionID, rootID, blockID_List } = req.body;
    let response = { returnValue: true };
    await updateRoot(mongoose, collectionID, rootID, blockID_List)
        .then((result) => {
            console.log("------------------------------------");
            console.log("[/block/patchRoot]");
            console.log(response);
            console.log("------------------------------------");
            res.send(response);
        })
        .catch((err) => {
            response.returnValue = false;
            response.errMsg = "Root 업데이트 과정에 에러가 발생했습니다.";
            console.log("------------------------------------");
            console.log("[/block/patchRoot]");
            console.log(response);
            console.log(err);
            console.log("------------------------------------");
            res.send(response);
        });
});

app.get("/openAPI/viewStation", async (req, res) => {
    let { stationName } = req.query;

    let response;

    if (stationName != undefined) {
        stationName.replace("역", "");
        findStationList(mongoose, stationName)
            .then((result) => {
                if (result == null) {
                    response = {
                        returnValue: false,
                        errCode: 100,
                        errMsg: "Data was not collected or this station doesn't exist",
                    };
                    console.log("------------------------------------");
                    console.log("[/openAPI/viewStation]");
                    console.log(response);
                    console.log("------------------------------------");
                    res.status(404).send(response);
                } else {
                    response = {
                        stationName: stationName + "역",
                        lineList: result.lineInfo.sort(),
                        rootList: result.rootInfo.map((root) => ({
                            startAt: {
                                line: root.startAt.line,
                                next: root.startAt.next + "역",
                            },
                            endAt: {
                                line: root.endAt.line,
                                next: root.endAt.next + "역",
                            },
                        })),
                        returnValue: true,
                    };

                    console.log("------------------------------------");
                    console.log("[/openAPI/viewStation]");
                    console.log(response);
                    console.log("------------------------------------");
                    res.status(200).send(response);
                }
            })
            .catch((err) => {
                response = {
                    returnValue: false,
                    errCode: 101,
                    errMsg: "Server Error Occured",
                };
                console.log("------------------------------------");
                console.log("[/openAPI/viewStation]");
                console.log(response);
                console.log(err);
                console.log("------------------------------------");
                res.status(500).send(response);
            });
    } else {
        response = {
            returnValue: false,
            errCode: 102,
            errMsg: "Incorrect query",
        };
        console.log("------------------------------------");
        console.log("[/openAPI/viewStation]");
        console.log(response);
        console.log("------------------------------------");
        res.status(404).send(response);
    }
});

app.get("/openAPI/viewRoot", async (req, res) => {
    let { stationName, start, end } = req.query;

    let response = {
        stationName: "",
        root: {
            start: {
                line: "",
                nextStation: "",
            },
            end: {
                line: "",
                nextStation: "",
            },
        },
        blockList: [],
        returnValue: true,
    };
    let collectionID;

    /* stationName이랑 start랑 end 모든 데이터가 존재한다. */
    if (stationName != undefined && start != undefined && end != undefined) {
        stationName.replace("역", "");

        /* findStationList를 통해서 collectionID와 rootID를 뽑아낸다. */
        await findStationList(mongoose, stationName)
            .then((result) => {
                /* result에 데이터가 없다면, 해당 역이 존재하지 않는다는 의미 */
                if (result == null) {
                    response = {
                        returnValue: false,
                        errCode: 100,
                        errMsg: "Data was not collected or this station doesn't exist",
                    };
                    console.log("------------------------------------");
                    console.log("[/openAPI/viewRoot]");
                    console.log(response);
                    console.log("------------------------------------");
                    res.status(404).send(response);
                } else {
                    collectionID = result.collectionID;
                    response.stationName = `${result.stationName}역`;

                    /* root의 갯수만큼 루트와 일치하는게 있는지 돌려본다 */
                    for (let i = 0; i < result.rootInfo.length; i++) {
                        /* root와 일치하는건 무조건 하나! */
                        let index = -1;
                        if (result.rootInfo[i].startAt.next == start && result.rootInfo[i].endAt.next == end) {
                            index = i;
                            break;
                        }

                        if (index != -1) {
                            /* Root가 같은 것을 찾는다. */
                            findRootByID(mongoose, collectionID, result.rootInfo[i].rootID)
                                .then((root) => {
                                    response.root.start.nextStation = root.source.next + "역";
                                    response.root.start.line = root.source.line;
                                    response.root.end.nextStation = root.destination.next + "역";
                                    response.root.end.line = root.destination.line;

                                    /* 블록들을 찾아서 하나하나 추가해준다. */
                                    for (let ii = 0; ii < root.blocklist.length; ii++) {
                                        findBlockByID(mongoose, collectionID, root.blocklist[ii])
                                            .then((block) => {
                                                let blockInfo = {
                                                    source: dataToPlace(
                                                        block.source.floor,
                                                        block.source.line,
                                                        block.source.location
                                                    ),
                                                    destination: dataToPlace(
                                                        block.destination.floor,
                                                        block.destination.line,
                                                        block.destination.location
                                                    ),
                                                    content: block.content,
                                                };
                                                response.blockList.push(blockInfo);
                                                console.log(response);
                                                // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                                            })
                                            .catch((err) => {
                                                response = {
                                                    returnValue: false,
                                                    errCode: 101,
                                                    errMsg: "Server Error Occured",
                                                };
                                                console.log("------------------------------------");
                                                console.log("[/openAPI/viewRoot] - findBlockByID");
                                                console.log(response);
                                                console.log(err);
                                                console.log("------------------------------------");
                                                res.status(500).send(response);
                                            });
                                        console.log(response);
                                    }
                                    /* 블록들을 찾아서 하나하나 추가해준다. */
                                    console.log(response);
                                })
                                .catch((err) => {
                                    response = {
                                        returnValue: false,
                                        errCode: 101,
                                        errMsg: "Server Error Occured",
                                    };
                                    console.log("------------------------------------");
                                    console.log("[/openAPI/viewRoot] - findRootByID");
                                    console.log(response);
                                    console.log(err);
                                    console.log("------------------------------------");
                                    res.status(500).send(response);
                                });
                            console.log(response);
                        } else {
                            // index가 -1이면 root data가 없다는 뜻!
                            response = {
                                returnValue: false,
                                errCode: 103,
                                errMsg: "Root data was not collected",
                            };
                            console.log("------------------------------------");
                            console.log("[/openAPI/viewRoot]");
                            console.log(response);
                            console.log(err);
                            console.log("------------------------------------");
                            res.status(404).send(response);
                        }
                    }
                    /* root의 갯수만큼 루트와 일치하는게 있는지 돌려본다 */
                }
                // console.log(response);
                /* result에 데이터가 있다, 데이터 처리 */
            })
            .catch((err) => {
                response = {
                    returnValue: false,
                    errCode: 101,
                    errMsg: "Server Error Occured",
                };
                console.log("------------------------------------");
                console.log("[/openAPI/viewRoot]");
                console.log(response);
                console.log(err);
                console.log("------------------------------------");
                res.status(500).send(response);
            });
        /* findStationList를 통해서 collectionID와 rootID를 뽑아낸다. */
    } else {
        response = {
            returnValue: false,
            errCode: 102,
            errMsg: "Incorrect query",
        };
        console.log("------------------------------------");
        console.log("[/openAPI/viewRoot]");
        console.log(response);
        console.log("------------------------------------");
        res.status(404).send(response);
    }
    /* stationName이랑 start랑 end 중에 하나라도 없는 값이 있다면 */
});

app.listen(port, () => {
    console.log(`port is listening at ${port}`);
});

connectDB(mongoose, MONGODB_URI);
