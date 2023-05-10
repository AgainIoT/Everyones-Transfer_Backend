const connectDB = (mongoose, mongodb_uri) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(mongodb_uri)
            .then(() => {
                console.log("[connectDB] MongoDB Connected")
                resolve();
            })
            .catch((err) => {
                console.log("[connectDB] MongoDB Error")
                console.log(err);
                reject();
            });
    });
};

export { connectDB };