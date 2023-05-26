import { mongoose } from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./MongoModule/mongoConnect.js";
import { findStationList, makeBlockList } from "./MongoModule/findDocument.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
dotenv.config();

const port = 3000;
const { MONGODB_URI } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

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
                        errCode: 101,
                        errMsg: "Data was not collected or this station doesn't exist",
                    };
                    console.log("------------------------------------");
                    console.log("[/openAPI/viewStation]");
                    console.log(response);
                    console.log("------------------------------------");
                    res.status(404).json(response);
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
                    res.status(200).json(response);
                }
            })
            .catch((err) => {
                response = {
                    returnValue: false,
                    errCode: 102,
                    errMsg: "Server Error Occured",
                };
                console.log("------------------------------------");
                console.log("[/openAPI/viewStation]");
                console.log(response);
                console.log(err);
                console.log("------------------------------------");
                res.status(500).json(response);
            });
    } else {
        response = {
            returnValue: false,
            errCode: 100,
            errMsg: "Incorrect query",
        };
        console.log("------------------------------------");
        console.log("[/openAPI/viewStation]");
        console.log(response);
        console.log("------------------------------------");
        res.status(403).json(response);
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
                        errCode1: 101,
                        errMsg: "Data was not collected or this station doesn't exist",
                    };
                    console.log("------------------------------------");
                    console.log("[/openAPI/viewRoot]");
                    console.log(response);
                    console.log("------------------------------------");
                    res.status(404).json(response);
                }
                else {
                    collectionID = result.collectionID;
                    response.stationName = `${result.stationName}역`;

                    let index = -1;
                    /* root의 갯수만큼 루트와 일치하는게 있는지 돌려본다 */
                    for (let i = 0; i < result.rootInfo.length; i++) {
                        /* root와 일치하는건 무조건 하나! */
                        if (result.rootInfo[i].startAt.next == start && result.rootInfo[i].endAt.next == end) {
                            index = i;
                            break;
                        }
                    }
                    if (index == -1) {
                        response = {
                            returnValue: false,
                            errCode: 101,
                            errMsg: "Data was not collected or this station doesn't exist",
                        };
                        console.log("------------------------------------");
                        console.log("[/openAPI/viewRoot]");
                        console.log(response);
                        console.log("------------------------------------");
                        res.status(404).json(response);
                    }
                    else {
                        makeBlockList(mongoose, collectionID, result.rootInfo[index].rootID, response)
                            .then((response) => {
                                console.log("------------------------------------");
                                console.log("[/openAPI/viewRoot]");
                                console.log(response);
                                console.log("------------------------------------");
                                res.status(200).json(response);
                            })
                    }
                }
                /* result에 데이터가 있다, 데이터 처리 */
            })
            .catch((err) => {
                response = {
                    returnValue: false,
                    errCode: 102,
                    errMsg: "Server Error Occured",
                };
                console.log("------------------------------------");
                console.log("[/openAPI/viewRoot]");
                console.log(response);
                console.log(err);
                console.log("------------------------------------");
                res.status(500).json(response);
            });
        /* findStationList를 통해서 collectionID와 rootID를 뽑아낸다. */
    } else {
        response = {
            returnValue: false,
            errCode: 100,
            errMsg: "Incorrect query",
        };
        console.log("------------------------------------");
        console.log("[/openAPI/viewRoot]");
        console.log(response);
        console.log("------------------------------------");
        res.status(403).json(response);
    }
    /* stationName이랑 start랑 end 중에 하나라도 없는 값이 있다면 */
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.listen(port, () => {
    console.log(`port is listening at ${port}`);
});

connectDB(mongoose, MONGODB_URI);
