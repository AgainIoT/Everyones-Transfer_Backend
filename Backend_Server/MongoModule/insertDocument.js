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

export { insertStation };
