# MOAC JavaScript API version 1.0.1.
This documentation is under construction and documents the 1.x alpha versions of chain3.js. 
The current stable version of chain3.js is 0.1.22 and should get preferred for production use cases.


To use the MOAC chain3 lib in Node.Js program,.

```js

    //MOAC chain3 lib
    var Chain3 = require('chain3');

    var chain3 = new Chain3('Http://gateway.moac.io/testnet');

    chain3.mc.net.isListening()
    .then(console.log);

```

or 

```js
import Chain3 from 'chain3';

new Chain3(...);
```

This is the MOAC compatible JavaScript API which implements the Generic JSON RPC spec as described in the Chain3.md.

Some of the methods require running a local MOAC VNODE or SCS clients to use this library.

Usage
```js
var Chain3 = require('chain3');

var chain3 = new Chain3();
```


This is the MOAC compatible JavaScript API which implements the Generic JSON RPC spec as described in the Chain3.md. It's available on npm as a node module, for bower and component as an embeddable js and as a meteor.js package.

Some of the methods require running a local MOAC VNODE or SCS client software to use this library.


## Installation

Currently chain3 1.x is still in testing and not avaiable with npm. 
User can download the package from the github: https://github.com/MOACChain/chain3/tree/1.x


```
More examples are under the example directory

## Contribute!

### Requirements

* Node.js
* npm

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install nodejs-legacy
```

### Building (gulp)
Require install gulp (https://gulpjs.com/) in the system:

```bash
gulp chain3-scs // build single package

gulp all // build all the packages
```

### Testing (mocha)
Test all cases.

```bash
npm test
```

Test a singe function.

```bash
mocha test/mc.getCoinbase.js
```

## Some extras

### A simple express server
The server directory contains the example codes to build a web server to access
the MOAC network using this API library.


### Accounts use the following library for generating private key.

[browserify-cryptojs](https://github.com/fahad19/crypto-js/) v0.3.1





