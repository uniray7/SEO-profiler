const scanHtml = require("./src/scanHtml.js");
const Rule = require("./src/Rule.js");
const Validator = require("./src/Validator.js");

const rule1 = new Rule().tag("img").notHasAttr("alt").gt(0);
const rule2 = new Rule().tag("a").notHasAttr("rel").gt(0);
const rule3 = [
                new Rule("head").tag("title").gt(0),
                new Rule("head").tag("meta").hasAttr("name", "descriptions").gt(0),
                new Rule("head").tag("meta").hasAttr("name", "keywords").gt(0),
              ];
const rule4 = new Rule().tag("strong").gt(15);
const rule5 = new Rule().tag("H1").gt(1);

module.exports = {
    scanHtml,
    Rule,
    Validator,
    rule1,
    rule2,
    rule3,
    rule4,
    rule5
};
