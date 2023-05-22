import request from "request";
import convert from "xml-js";
import dotenv from "dotenv";

dotenv.config();
const { API_KEY } = process.env;

const getStationInfo = (stationName) => {
    return new Promise((resolve, reject) => {
        const URL =
            "http://openAPI.seoul.go.kr:8088/" +
            API_KEY +
            "/xml/SearchInfoBySubwayNameService/1/5/" +
            stationName +
            "/";

        console.log("[getStationInfo] " + URL);

        request(
            {
                url: encodeURI(URL),
                method: "GET",
            },
            (error, response, body) => {
                if ((response.statusCode = 200)) {
                    console.log("------------------------------------");
                    console.log("[getStationInfo] success!");
                    var convertedBody = convert.xml2js(body, {
                        compact: true,
                        spaces: 4,
                    });
                    console.log(convertedBody.SearchInfoBySubwayNameService);
                    console.log("------------------------------------");
                    resolve(convertedBody.SearchInfoBySubwayNameService);
                } else {
                    console.log("------------------------------------");
                    console.error("[getStationInfo] error!");
                    console.error(error);
                    console.log("------------------------------------");
                    reject(false);
                }
            }
        );
    });
};

export { getStationInfo };
