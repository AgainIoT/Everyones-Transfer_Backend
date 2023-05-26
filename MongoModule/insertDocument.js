import {
    stationListSchema,
    rootSchema,
    blockSchema,
} from "../Schema/schemas.js";

const insertStationList = (mongoose, stationInfo) => {
    return new Promise((resolve, reject) => {
        const StationList = stationListSchema(mongoose, "stationList");

        const { stationName, collectionID, lineInfo, rootInfo } = stationInfo;

        const newStation = new StationList({
            stationName,
            collectionID,
            lineInfo,
            rootInfo,
        });

        newStation
            .save()
            .then((result) => {
                console.log("[insertStationList] success!");
                resolve();
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[insertStationList] error!");
                console.log(err);
                console.log("------------------------------------");
                reject(err);
            });
    });
};

const insertRoot = (mongoose, rootInfo, collectionID) => {
    return new Promise((resolve, reject) => {
        const Root = rootSchema(mongoose, collectionID);

        const newRoot = new Root({
            type: "root",
            source: rootInfo.startAt,
            destination: rootInfo.endAt,
            blockList: [],
        });

        newRoot
            .save()
            .then((result) => {
                console.log("[insertRoot] success!");
                resolve(result);
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[insertRoot] error!");
                console.log(err);
                console.log("------------------------------------");
                reject(err);
            });
    });
};

const insertBlock = (mongoose, from, to, content, collectionID) => {
    return new Promise((resolve, reject) => {
        const Block = blockSchema(mongoose, collectionID);

        const newBlock = new Block({
            type: "block",
            source: from,
            destination: to,
            content: content,
        });

        newBlock
            .save()
            .then((result) => {
                console.log("[insertBlock] success!");
                resolve(result);
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[insertBlock] error!");
                console.log(err);
                console.log("------------------------------------");
                reject(err);
            });
    });
};

export { insertStationList, insertRoot, insertBlock };
