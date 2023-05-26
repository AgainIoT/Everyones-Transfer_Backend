const disconnectDB = (mongoose) => {
    mongoose
        .disconnect()
        .then(() => {
            console.log("[disconnectDB] MongoDB Disconnected");
        })
        .catch((err) => {
            console.log("------------------------------------");
            console.log("[disconnectDB] error!");
            console.log(err);
            console.log("------------------------------------");
        });
};

export { disconnectDB };
