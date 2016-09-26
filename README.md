# commons-validator-js

[![NPM version][npm-image]][npm-url]  ![Bower version](https://img.shields.io/bower/v/bootstrap.svg) [![Downloads][downloads-image]][npm-url]

JavaScript port of [Apache Commons Validator](https://commons.apache.org/proper/commons-validator/).

### Usage - npm
Install the library with `npm install commons-validator-js`

```javascript
var EmailValidator = require('commons-validator-js').EmailValidator;

var validator = new EmailValidator();
validator.isValid('chuck.norris@gmail.com'); //=> true
validator.isValid('chuck.norris@gmail.con'); //=> false (can your validator do this?)
```

### Usage - bower
Install the library: `bower install commons-validator-js`. 
Add a reference: `'bower_components/commons-validator-js/dist/commons-validator-js.js'`
   
Then use the global constructor: `var EmailValidator = CommonsValidator.EmailValidator;` and proceed as shown in the npm usage example above.  

[downloads-image]: https://img.shields.io/npm/dm/commons-validator-js.svg

[npm-url]: https://npmjs.org/package/commons-validator-js
[npm-image]: https://img.shields.io/npm/v/commons-validator-js.svg

