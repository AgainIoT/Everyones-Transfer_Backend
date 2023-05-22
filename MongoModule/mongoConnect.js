const connectDB = (mongoose, mongodb_uri) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(mongodb_uri)
            .then(() => {
                console.log("[connectDB] MongoDB Connected");
                resolve();
            })
            .catch((err) => {
                console.log("------------------------------------");
                console.log("[connectDB] MongoDB Error");
                console.log(err);
                console.log("------------------------------------");
                reject();
            });
    });
};

export { connectDB };
