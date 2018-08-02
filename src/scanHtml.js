const asyncFetchHtml = require("./asyncFetchHtml.js");
const asyncOutput = require("./asyncOutput.js");

// TODO: scan(src, validator([rule1, rule2]), dest)
/**
 * Scan a html with given rules
 * @param {string|ReadStream} src - input source
 * @param {Validator} validator - validator for an array of rules
 * @params {console|string|WriteStream} dest - output destination
 */
function scanHtml(src, validator, dest) {
    // asyncFetchHtml => parser => validator => dest
    return asyncFetchHtml(src).then((content) => {
        validator.scan(content);
        return validator.asyncGenReport();
    }).then((result) => {
        return asyncOutput(result, dest);
    });


//    return asyncFetchHtml(src).then((content) => {
//        return asyncOutput(content, dest);
//    });
}

module.exports = scanHtml;
