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

export { findStation };
