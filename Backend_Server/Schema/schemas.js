const stationListSchema = (mongoose, collection) => {
    const stationListModel = mongoose.Schema({
        stationName: { type: String, required: true },
        rootList: { type: [mongoose.Schema.Types.ObjectId], required: false, ref : "root" },
        createdAt: { type: Date, default: Date.now },
    });

    const stationList = mongoose.model(collection, stationListModel);
    return stationList;
};

const rootSchema = (mongoose, collection) => {
    const rootModel = mongoose.Schema({
        source: { type: String, required: true },
        destination: { type: String, required: true },
        blockList: { type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'block' },
        createdAt: { type: Date, default: Date.now },
    });

    const root = mongoose.model(collection, rootModel);
    return root;
};

const blockSchema = (mongoose, collection) => {
    const blockModel = mongoose.Schema({
        source: { type: String, required: true },
        destination: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    });

    const block = mongoose.model(collection, blockModel);
    return block;
};

export { stationListSchema, rootSchema, blockSchema };
