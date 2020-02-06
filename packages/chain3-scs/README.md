# chain3-scs

This is a sub package of [chain3.js][repo]

This is the MOAC package to be used [chain3.js][repo].
Please read the [documentation][docs] for more.

## Installation

### Node.js

```bash
npm install chain3-scs
```

### In the Browser

Build running the following in the [chain3.js][repo] repository:

```bash
npm run-script build-all
```

Then include `dist/chain3-scs.js` in your html file.
This will expose the `Chain3SCS` object on the window object.


## Usage

```js
// in node.js
var Chain3SCS = require('chain3-scs');

var scs = new Chain3SCS('http://localhost:8548');
```


[docs]: https://moacdocs-chn.readthedocs.io/zh_CN/latest/moac/js/index.html
[repo]: https://github.com/MOACChain/chain3/tree/1.x


