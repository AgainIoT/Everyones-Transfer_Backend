const insertStation = (StationList, stationName) => {
    const newStation = new StationList({
        stationName: stationName,
        rootList: [],
    });
    newStation
        .save()
        .then((result) => {
            console.log("[insertStation] " + result);
        })
        .catch((err) => {
            console.log("[insertStation] error");
            console.log(err);
        });
};

const insertBr = (BrList, content) => {
    let newBr;
    if(content.type == "root"){
        newBr = new BrList({
            type: content.type,
            source: {lineNum: content.source.lineNum, dir: content.source.dir},
            destination: {lineNum: content.destination.lineNum, dir: content.destination.dir},
            blocklist: content.blocklist
        });
    }
    else{
        newBr = new BrList({
            type: content.type,
            from: content.from,
            to: content.to,
            content: content.content
        });
    }
    newBr
        .save()
        .then((result) => {
            console.log("[insertBr] " + result);
        })
        .catch((err) => {
            console.log("[Br] error");
            console.log(err);
        });
};

export { insertStation };
export { insertBr };
