const { scanHtml, Validator, rule1, rule2, rule3, rule4, rule5 } = require("./SEO-profiler.js");

const validator = new Validator([rule1, rule3, rule4, rule5]);
scanHtml('./example.html', validator, console);
