const disconnectDB = (mongoose) => {
    mongoose
        .disconnect()
        .then(() => {
            console.log("[disconnectDB] MongoDB Disconnected");
        })
        .catch((err) => {
            console.log(err);
        });
};

export {disconnectDB}