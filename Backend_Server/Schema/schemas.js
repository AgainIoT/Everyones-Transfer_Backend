const stationListSchema = (mongoose, collection) => {
    delete mongoose.connection.models[collection];

    const LineInfoSchema = new mongoose.Schema({
        line: { type: String, required: true },
        next: { type: [String], required: true },
    });

    const RootInfoSchema = new mongoose.Schema({
        startAt: { type: LineInfoSchema, required: true },
        endAt: { type: LineInfoSchema, required: true },
        rootID: {
            type: [mongoose.Schema.Types.ObjectId],
            required: true,
            ref: collection,
        },
    });

    const stationListModel = new mongoose.Schema({
        stationName: { type: String, required: true },
        collectionName: { type: String, required: true },
        lineInfo: { type: [String], required: true },
        rootInfo: { type: [RootInfoSchema], required: true },
    });

    const stationList = mongoose.model(collection, stationListModel);
    return stationList;
};

const rootSchema = (mongoose, collection) => {
    delete mongoose.connection.models[collection];

    const rootModel = new mongoose.Schema({
        type: { type: String, required: true, enum: ["root"] },
        source: {
            line: { type: String, required: true },
            next: { type: String, required: true },
        },
        destination: {
            line: { type: String, required: true },
            next: { type: String, required: true },
        },
        blocklist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: collection,
            },
        ],
    });

    const root = mongoose.model(collection, rootModel);
    return root;
};

const blockSchema = (mongoose, collection) => {
    delete mongoose.connection.models[collection];

    const blockModel = new mongoose.Schema({
        type: { type: String, required: true, enum: ["block"] },
        source: { type: String, required: true },
        destination: { type: String, required: true },
        content: { type: [String], required: true },
    });

    const block = mongoose.model(collection, blockModel);
    return block;
};

export { stationListSchema, rootSchema, blockSchema };
