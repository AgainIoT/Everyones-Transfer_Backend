const getCollections = async (mongoose) => {
    return new Promise(async (resolve, reject) => {
        let collectionList;
        await mongoose.connection.db // collection list 조회
            .listCollections()
            .toArray()
            .then((collections) => {
                collectionList = collections.map(
                    (collection) => collection.name
                );
                console.log("------------------------------------");
                console.log("[getCollections] success!");
                console.log(collectionList);
                console.log("------------------------------------");
                resolve(collectionList);
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[getCollections] error!");
                console.error(err);
                console.log("------------------------------------");
                reject(err);
            });
    });
};

export { getCollections };
