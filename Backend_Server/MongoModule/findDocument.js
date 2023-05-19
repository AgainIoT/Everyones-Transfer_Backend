const findStation = (StationList, stationName) => {
    return new Promise((resolve, reject) => {
        StationList.findOne({ stationName: stationName })
            .exec()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                console.log("[findStation] error occured");
                console.log(err);
                reject(err);
            });
    });
};

const find = (StationList, stationName) => {
    return new Promise((resolve, reject) => {
        StationList.findOne({ stationName: stationName })
            .exec()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                console.log("[findStation] error occured");
                console.log(err);
                reject(err);
            });
    });
};


const findRoot = (RootList, rootContent) => {
    return new Promise((resolve, reject) => {
        RootList.findOne({ "source.lineNum": rootContent.source.lineNum, 
                           "source.dir": rootContent.source.dir,
                           "destination.lineNum": rootContent.destination.lineNum,
                           "destination.dir": rootContent.destination.dir})
            .clone()
            .exec()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                console.log("[find] error occured");
                console.log(err);
                reject(err);
            });
    });
};

const findBlock = (BlockList, blockContent) => {
    return new Promise((resolve, reject) => {
        BlockList.find()
            .clone()
            .exec()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                console.log("[find] error occured");
                console.log(err);
                reject(err);
            });
    });
};

export { findStation, findRoot, findBlock };
