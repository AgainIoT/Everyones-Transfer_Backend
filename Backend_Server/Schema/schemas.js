
const stationListSchema = (mongoose, collection) => {
    const stationListModel = mongoose.Schema({
        stationName: { type: String, required: true },
        rootList: { type: [mongoose.Schema.Types.ObjectId], required: false, ref : "root" },
        createdAt: { type: Date, default: Date.now },
    });

    const stationList = mongoose.model(collection, stationListModel);
    return stationList;
};

/*
{
    type: root,
    source: {호선: 2, 방향: 신당},
    destination: {호선: 5, 방향: 청구},
    blocklist: [block_id1, block_id2, block_id3]
}
{
    type: block,
    from: "1호선 승강장",
    to: "5호선 승강장",
    content: {엘베타고, 직진하고, 좌측 돌고}
}
*/

const brSchema = (mongoose, collection) => {
    const lineSchema = mongoose.Schema({
        lineNum: Number,
        dir: String
    })

    const brModel = mongoose.Schema({
        type: {type: String, required: true},
        source: {type: lineSchema, default: undefined, required: false},
        destination: {type: lineSchema, default: undefined, required: false},
        //blockList: { type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'block' },
        blocklist: { type: [Number], default: undefined, required: false, ref: 'block' },
        from: {type: String, default: undefined, required: false},
        to: {type: String, default: undefined, required: false},
        content: {type: [String], default: undefined, required: false},
        createdAt: { type: Date, default: Date.now },
    });

    const br = mongoose.model(collection, brModel);
    return br;
};

export { stationListSchema, brSchema };
