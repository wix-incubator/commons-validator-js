# commons-validator-js

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

JavaScript port of [Apache Commons Validator](https://commons.apache.org/proper/commons-validator/).

### Usage
Install the library with `npm install commons-validator-js` or with `bower install commons-validator-js --save`

```javascript
var EmailValidator = require('commons-validator-js').EmailValidator;

var validator = new EmailValidator();
validator.isValid('chuck.norris@gmail.com'); //=> true
validator.isValid('chuck.norris@gmail.con'); //=> false (can your validator do this?)
```

[downloads-image]: https://img.shields.io/npm/dm/commons-validator-js.svg

[npm-url]: https://npmjs.org/package/commons-validator-js
[npm-image]: https://img.shields.io/npm/v/commons-validator-js.svg
