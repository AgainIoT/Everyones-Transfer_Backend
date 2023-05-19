const createCollection = (mongoose, collectionName) => {
    mongoose.connection.db.createCollection(collectionName, (error, collection) => {
        if (error) {
            console.log("[createCollection] error!");
            console.error(error);
        } else {
            console.log("[createCollection] Collection created!");
        }
    });
};

const getCollections = async (mongoose, stationNum) => {
    let collectionList;
    await mongoose.connection.db // collection list 조회
        .listCollections()
        .toArray()
        .then((collections) => {
            collectionList = collections.map((collection) => collection.name);
            console.log("[getCollections] ");
            console.log(collectionList);
        })
        .catch((err) => {
            console.log("[getCollections] error!");
            console.error(err);
            return err;
        });

    if (collectionList.indexOf(stationNum) == -1) {
        createCollection(mongoose, stationNum);
    }
};

export { getCollections, createCollection };
