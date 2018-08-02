const cheerio = require("cheerio");
const P = require("bluebird");
const { format } = require("util");
const { flatten, forEach } = require("lodash");


class Validator{

    /**
     * Construct a validator with given rules
     * @param { [Rule,[Rule]] } rules - input source
     */
    constructor(rules) {
        this._rules = flatten(rules);
        this._results;
    }

    scan(content) {
        const $ = cheerio.load(content);

        let results = new Array(this._rules.length);

        // scan content with all rules
        forEach(this._rules, function(rule, idx) {
            let query = "";
            if(rule._scope) {
                query += rule._scope;
                query += ">";
            }
            if(rule._tag) {
                query += rule._tag;
            }
            if(rule._attr) {
                if(rule._attr.exist) {
                    if(rule._attr.value) {
                        query += format("[%s='%s']", rule._attr.key, rule._attr.value);
                    } else {
                        query += format("[%s]", rule._attr.key);
                    }
                } else {
                    query += ":not(";
                    if(rule._attr.value) {
                        query += format("[%s='%s']", rule._attr.key, rule._attr.value);
                    } else {
                        query += format("[%s]", rule._attr.key);
                    }
                    query += ")";
                }
            }

            if(rule._cond && !isNaN(rule._thres)) {
                if(rule._cond === "gt") {
                    results[idx] = ( $(query).length > rule._thres)
                } else if(rule._cond === "lt") {
                    results[idx] = ( $(query).length < rule._thres)
                }
            }
        });
        this._results = results;
    } // scan()

    asyncGenReport() {
        return new P.Promise((resolve, reject) => {
            let report = "";
            let results = this._results;
            forEach(this._rules, function(rule, idx) {
                report += "There is "
                if(!results[idx]) {
                    report += "no "
                }

                if(rule._cond === "gt" && rule._thres>0) {
                    report += format("more than %d ", rule._thres);
                } else if(rule._cond === "lt" && rule._thres>0) {
                    report += format("less than %d ", rule._thres);
                }

                report += format("<%s> tags ", rule._tag)

                if(rule._attr) {
                    if(rule._attr.exist) {
                        report += format("with ")
                    } else {
                        report += format("without ")
                    }

                    report += format("attribute %s ", rule._attr.key);
                    if(rule._attr.value) {
                        report += format("= %s ", rule._attr.value);
                    }
                }

                if(rule._scope) {
                    report += format("in <%s> ", rule._scope);
                }
                report += ".\n";
            }) //forEach
            resolve(report);
        }); //Promise
    } // asyncGenReport

}

module.exports = Validator;
