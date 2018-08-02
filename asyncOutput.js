const fs = require("fs");
const P = require("bluebird");
const stream = require("stream");

/**
 * Asynchronously output to destination
 * @params {string} content - contnt to output
 * @params {console|string|WriteStream} dest - output destination
 */
function asyncOutput(content, dest) {
    // TODO: need to check type of content?
    if(dest instanceof console.Console) {
        dest.log(content);
        return P.resolve();
    } else if(typeof(dest) === 'string'){
        return new P.Promise((resolve, reject) => {
            fs.writeFile(dest, content, (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    } else if(dest instanceof stream.Writable) {
        // TODO: need slice content?
        return new P.Promise((resolve, reject) => {

            dest.write(content, 'utf-8', () => {
                return resolve();
            });

            dest.on("error", (err) => {
                return reject(err);
            })
        });
    } else {
        // TODO: error handling
    }
}

module.exports = asyncOutput;

// main for roughly testing
if (require.main === module) {
    let testPath = "./test.out";
    const content = "asdfghjkl"
    const testStream = fs.createWriteStream(testPath);
    asyncOutput(content, testStream).then(()=> {console.log("finish write!!!")})
    //asyncOutput(content, testPath).then(()=> {console.log("finish write!!!")})
    //asyncOutput(content, console).then(()=> {console.log("finish write!!!")})
}
