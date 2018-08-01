const fs = require("fs");
const P = require("bluebird");

function asyncFetchHtml(target) {
    let readStream;
    if (typeof target === "string") {
        // TODO: error handling
        readStream = fs.createReadStream(target);
    }
    // TODO: the else if statement is not good,
    // ref: https://stackoverflow.com/questions/23885095/nodejs-check-if-variable-is-readable-stream
    else if(target.constructor.name === "ReadStream") {
        readStream = target;
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
            return resolve(resultBuf.toString());
        });

        readStream.on("error", (err) => {
            return reject(err);
        });
    });
}

module.exports = {
    asyncFetchHtml
};

// main for roughly testing
if (require.main === module) {
    let testPath = "testfile";
    // asyncFetchHtml(path).then((result)=> {console.log(result); console.log("get!!!")})

    const testStream = fs.createReadStream(testPath);
    asyncFetchHtml(testStream).then((result)=> {console.log(result); console.log("get!!!")})
}
