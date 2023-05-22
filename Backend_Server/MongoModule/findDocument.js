import { stationListSchema, rootSchema, blockSchema } from "../Schema/schemas.js";

const findStationList = (mongoose, stationName) => {
    return new Promise((resolve, reject) => {
        const StationList = stationListSchema(mongoose, "stationList");

        StationList.findOne({ stationName: stationName })
            .exec()
            .then((result) => {
                console.log("------------------------------------");
                console.log("[findStationList] success!");
                console.log(result);
                console.log("------------------------------------");
                resolve(result);
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[findStationList] error!");
                console.log(err);
                console.log("------------------------------------");
                reject(err);
            });
    });
};

const findRootByID = (mongoose, collectionID, rootID) => {
    return new Promise((resolve, reject) => {
        const Root = rootSchema(mongoose, collectionID);

        Root.findOne({
            _id: rootID,
            type: "root",
        })
            .exec()
            .then((result) => {
                console.log("[findRootByID] success!");
                resolve(result);
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[findRootByID] error!");
                console.log(err);
                console.log("------------------------------------");
                reject(err);
            });
    });
};

const findRootByPlace = (mongoose, collectionID, source, destination) => {
    return new Promise((resolve, reject) => {
        const Root = rootSchema(mongoose, collectionID);

        Root.findOne({
            source: source,
            destination: destination,
        })
            .exec()
            .then((result) => {
                console.log("[findBlockByPlace] success!");
                resolve(result);
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[findBlockByPlace] error!");
                console.log(err);
                console.log("------------------------------------");
                reject(err);
            });
    });
};

const findBlockByID = (mongoose, collectionID, blockID) => {
    return new Promise((resolve, reject) => {
        const Block = blockSchema(mongoose, collectionID);

        Block.findOne({
            _id: blockID,
        })
            .exec()
            .then((result) => {
                console.log("[findBlockByID] success!");
                resolve(result);
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[findBlockByPlace] error!");
                console.log(err);
                console.log("------------------------------------");
                reject(err);
            });
    });
};

const findBlockByPlace = (mongoose, collectionID, source, destination) => {
    return new Promise((resolve, reject) => {
        const Block = blockSchema(mongoose, collectionID);

        Block.findOne({
            source: source,
            destination: destination,
        })
            .exec()
            .then((result) => {
                console.log("[findBlockByPlace] success!");
                resolve(result);
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[findBlockByPlace] error!");
                console.log(err);
                console.log("------------------------------------");
                reject(err);
            });
    });
};

export { findStationList, findRootByID, findBlockByPlace, findBlockByID };
