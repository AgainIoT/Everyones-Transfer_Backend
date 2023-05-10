const reconnectDB = (mongoose, mongodb_uri) => {
    mongoose.connection.on("disconnected", () => {
        console.log("[reconnectDB] DB disconnected! try reconnect...");
        if (reconnectFlag) {
            reconnectFlag = false;
            connectDB(mongoose, mongodb_uri);
            setTimeout((reconnectFlag = true), 5000);
        }
    });
};