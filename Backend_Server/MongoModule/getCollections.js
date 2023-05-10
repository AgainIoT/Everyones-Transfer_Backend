const getCollections = async () => {
    await mongoose
        .connect(MONGODB_URI)
        .then(() => {
            console.log("connected DB");
        })
        .catch((err) => {
            console.log(err);
        });

    mongoose.connection.on("disconnected", () => {
        console.log("Mongoose default connection disconnected");
        if (reconnectFlag) {
            mongoose.connect(MONGODB_URI).then(() => {});
        }
    });

    await mongoose.connection.db // collection list 조회
        .listCollections()
        .toArray()
        .then((collections) => {
            // console.log(collections);
            collectionList = collections.map((collection) => collection.name);
            console.log(collectionList);
        })
        .catch((err) => {
            console.error(err);
        });

    mongoose
        .disconnect()
        .then(() => {
            console.log("DB disconnected");
        })
        .catch((err) => {
            console.log(err);
        });
};