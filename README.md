# SEO-profiler
## Install
``` shell
$ npm install
```

## Get started
### Import the module
```javascript
const { scanHtml, Validator, rule1, rule2, rule3, rule4, rule5 } = require("./SEO-profiler.js");
```


### Input
##### File path as input
```javascript
const validator = new Validator([rule1]);
scanHtml('./example.html', validator, console);
```

##### Readstream as input
```javascript
const fs = require("fs");
const readStream = fs.createReadStream('example.html');
const validator = new Validator([rule1]);
scanHtml(readStream, validator, console);
```

### Output
##### File path as output
```javascript
const validator = new Validator([rule1]);
scanHtml('./example.html', validator, 'example.out');
```

##### Writestream as output
```javascript
const fs = require("fs");
const writeStream = fs.createWriteStream('example.out');
const validator = new Validator([rule1]);
scanHtml('./example.html', validator, writeStream);
```

##### Writestream as output
```javascript
const validator = new Validator([rule1]);
scanHtml('./example.html', validator, console);
```

### Self-defined rule
``` javascript
// Given rule 1:
// Detect if any <img /> tag without alt attribute
const myRule1 = new Rule().tag("img").notHasAttr("alt").gt(0);


// Given rule 3:
// In <head> tag
//   i. Detect if header doesn’t have <title> tag
//   ii. Detect if header doesn’t have <meta name=“descriptions” … /> tag
//   iii. Detect if header doesn’t have <meta name=“keywords” … /> tag
const myRule3 = [
                new Rule("head").tag("title").gt(0),
                new Rule("head").tag("meta").hasAttr("name", "description").gt(0),
                new Rule("head").tag("meta").hasAttr("name", "keywords").gt(0),
               ];

```

