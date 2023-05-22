import {
    stationListSchema,
    rootSchema,
    blockSchema,
} from "../Schema/schemas.js";

const updateStationList = (mongoose, newRootInfo, stationName) => {
    return new Promise((resolve, reject) => {
        const StatoinList = stationListSchema(mongoose, "stationList");
        StatoinList.updateOne(
            { stationName: stationName },
            { $push: { rootInfo: newRootInfo } }
        )
            .exec()
            .then((result) => {
                console.log("------------------------------------");
                console.log("[updateStationList] success!");
                console.log(result);
                console.log("------------------------------------");
                resolve();
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[updateStationList] error!");
                console.log(err);
                console.log("------------------------------------");
                reject(err);
            });
    });
};

const updateRoot = (mongoose, collectionID, rootID, blockID_List) => {
    return new Promise((resolve, reject) => {
        const Root = rootSchema(mongoose, collectionID);
        Root.updateOne({ _id: rootID }, { $set: { blocklist: blockID_List } })
            .exec()
            .then((result) => {
                console.log("------------------------------------");
                console.log("[updateRoot] success!");
                console.log(result);
                console.log("------------------------------------");
                resolve();
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[updateRoot] error!");
                console.log(err);
                console.log("------------------------------------");
                reject(err);
            });
    });
};

const updateBlock = (mongoose, collectionID, blockID, newContent) => {
    return new Promise((resolve, reject) => {
        const Block = blockSchema(mongoose, collectionID);
        Block.updateOne({ _id: blockID }, { $set: { content: newContent } })
            .exec()
            .then((result) => {
                console.log("------------------------------------");
                console.log("[updateBlock] success!");
                console.log(result);
                console.log("------------------------------------");
                resolve();
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[updateBlock] error!");
                console.log(err);
                console.log("------------------------------------");
                reject(err);
            });
    });
};

export { updateStationList, updateRoot, updateBlock };
