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


// main for roughly testing
if (require.main === module) {
    let testPath = "./test.html";
    let testOut = "./test.out";
    const fs = require("fs");
    const testStream = fs.createWriteStream(testOut);

    const Rule = require("./Rule.js");
    const Validator = require("./Validator.js");
    const rule1 = new Rule().tag("img").notHasAttr("alt").gt(0);
//    console.log(rule1)
//    const rule2 = new Rule().tag("a").hasAttr("rel").gt(0);
    const rule3 = [
                    new Rule("head").tag("title").gt(0),
                    new Rule("head").tag("meta").hasAttr("name", "description").gt(0),
                    new Rule("head").tag("meta").hasAttr("name", "keywords").gt(0),
                  ];
//    console.log(rule3)
//    const rule4 = new Rule().tag("strong").gt(15);
//    const rule5 = new Rule().tag("H1").gt(01);
//
//    const validator = new Validator([rule1, rule3]);
    const validator = new Validator([rule1]);
//
    scanHtml(testPath, validator, console).then(()=> {console.log("finish scan!!!")})
}
