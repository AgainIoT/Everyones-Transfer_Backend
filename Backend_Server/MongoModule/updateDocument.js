const updateRoot = (RootList, rootContent) => {
    return new Promise((resolve, reject) => {
        RootList.updateOne({"source.lineNum": rootContent.source.lineNum, 
                            "source.dir": rootContent.source.dir,
                            "destination.lineNum": rootContent.destination.lineNum,
                            "destination.dir": rootContent.destination.dir},
                            {$set: {"blocklist" : rootContent.blocklist}})
            .clone()
            .exec()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                console.log("[updateRoot] error occured");
                console.log(err);
                reject(err);
            });
    });
}

const updateBlock = (BlockList, blockContent) => {
    return new Promise((resolve, reject) => {
        BlockList.updateOne({"from": blockContent.from,
                             "to" : blockContent.to},
                             {$set: {"content" : blockContent.content}})
            .clone()
            .exec()
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                console.log("[updateRoot] error occured");
                console.log(err);
                reject(err);
            });
    });
}

export { updateRoot, updateBlock };