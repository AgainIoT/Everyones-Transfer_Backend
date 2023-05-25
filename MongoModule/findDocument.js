import { stationListSchema, rootSchema, blockSchema } from "../Schema/schemas.js";
import { dataToPlace } from "../convertModule/dataToPlace.js";

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

const makeBlockList = (mongoose, collectionID, rootID, response) => {
    return new Promise((resolve, reject) => {
        findRootByID(mongoose, collectionID, rootID)
            .then(async(fRoot) => {
                response.root.start.nextStation = fRoot.source.next + "역";
                response.root.start.line = fRoot.source.line;
                response.root.end.nextStation = fRoot.destination.next + "역";
                response.root.end.line = fRoot.destination.line;
                for(let i = 0; i < fRoot.blocklist.length; i++){
                    await findBlockByID(mongoose, collectionID, fRoot.blocklist[i])
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
                        })
                }
                //console.log(response);
                resolve(response);
            })
            .catch((err) => {
                console.log(err);
                console.log("[makeBlockList] error");
                reject(err);
            })
    })
}

export { findStationList, findRootByID, findBlockByPlace, findBlockByID, makeBlockList };
