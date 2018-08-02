const fs = require("fs");
const P = require("bluebird");
const stream = require("stream");

/**
 * Asynchronously fetch html file
 * @param {string|ReadStream} target - the html file path or read stream
 * @returns {string}
 */
function asyncFetchHtml(target) {
    let readStream;
    if (typeof target === "string") {
        // TODO: error handling
        readStream = fs.createReadStream(target);
    }
    // TODO: the "else if" statement may be not good,
    // ref: https://stackoverflow.com/questions/23885095/nodejs-check-if-variable-is-readable-stream
    else if(target instanceof stream.Readable) {
        readStream = target;
    }
    else {
        // TODO: throw error or return None
        return;
    }

    let resultBuf = null;
    return new P.Promise((resolve, reject) => {
        readStream.on("data", (chunk) => {
            if (resultBuf === null) {
                resultBuf = chunk;
            } else {
                resultBuf = Buffer.concat([resultBuf, chunk]);
            }
        });

        readStream.on("end", () => {
            if(resultBuf) {
                return resolve(resultBuf.toString());
            } else {
                return resolve("");
            }
        });

        readStream.on("error", (err) => {
            return reject(err);
        });
    });
}

module.exports = asyncFetchHtml;

// main for roughly testing
if (require.main === module) {
    let testPath = "./test.html";
    // asyncFetchHtml(path).then((result)=> {console.log(result); console.log("get!!!")})

    const testStream = fs.createReadStream(testPath);
    asyncFetchHtml(testStream).then((result)=> {console.log(result); console.log("get!!!")})
}
