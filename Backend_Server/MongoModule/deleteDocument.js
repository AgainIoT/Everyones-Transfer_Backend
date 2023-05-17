const deleteRoot = (RootList, rootContent) => {
    return new Promise((resolve, reject) => {
        RootList.deleteOne({ "source.lineNum": rootContent.source.lineNum, 
                             "source.dir": rootContent.source.dir,
                             "destination.lineNum": rootContent.destination.lineNum,
                             "destination.dir": rootContent.destination.dir})
            .clone()
            .exec()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                console.log("[deleteRoot] error occured");
                console.log(err);
                reject(err);
            });
    });
    // return new Promise((resolve, reject) => {
    //     RootList.deleteOne({ "source.lineNum": rootContent.source.lineNum, 
    //                          "source.dir": rootContent.source.dir,
    //                          "destination.lineNum": rootContent.destination.lineNum,
    //                          "destination.dir": rootContent.destination.dir})
    //         .clone()
    //         .exec()
    //         .then((result) => {
    //             resolve(result);
    //         })
    //         .catch((err) => {
    //             console.log("[deleteRoot] error occured");
    //             console.log(err);
    //             reject(err);
    //         });
    // });
};

const deleteBlock = (BlockList, blockContent) => {
    return new Promise((resolve, reject) => {
        BlockList.deleteOne({ "from" : blockContent.from,
                              "to" : blockContent.to})
            .clone()
            .exec()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                console.log("[deleteRoot] error occured");
                console.log(err);
                reject(err);
            });
    });
};

export {deleteRoot, deleteBlock};