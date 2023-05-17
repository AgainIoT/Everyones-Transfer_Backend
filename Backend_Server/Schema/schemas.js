const stationListSchema = (mongoose, collection) => {
    delete mongoose.connection.models[collection];
    const mappingDataSchema = new mongoose.Schema({
        line: { type: Number, required: true },
        num: { type: Number, required: true },
        nextStation: { type: [String], required: true },
    });

    const stationListModel = mongoose.Schema({
        stationName: { type: String, required: true },
        collectionName: { type: String, required: true },
        mappingData: { type: [mappingDataSchema], required: true },
        createdAt: { type: Date, default: Date.now },
    });

    const stationList = mongoose.model(collection, stationListModel);
    return stationList;
};

const blockSchema = (mongoose, collection) => {
    delete mongoose.connection.models[collection];
    const BLockSchema = new mongoose.Schema({
        type: { type: String }, // block, root
    });
};

export { stationListSchema };
