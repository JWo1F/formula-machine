Formula machine
=============

A formula machine for JS

example
=======

```js
var formula = require('formula-machine');

var src = {
  operator: '+',
  first: 2,
  second: {
    operator: 'sqrt',
    first: {
      operator: '*',
      first: { number: 4 },
      second: {
        operator: '/',
        first: 2,
        second: 2
      }
    }
  }
};

// will convert to
(2 + Math.sqrt(4 * (2/2)))

console.log(formula.toFunction(src)()); // 4
```

With variables
==============

```js
var formula = require('formula-machine');

var src = {
  operator: '+',
  first: 2,
  second: { variable: 'name' }
};

var fn = formula.toFunction(src);

console.log(fn({ name: 4 })); // 2 + 4 = 6
```

operators
=========

Formula machine has some binary operators:

* **1 + 2**: simple "plus" (**+**)
* **1 - 2**: simple "minus" (**-**)
* **1 * 2**: simple "multiply" (__*__)
* **1 / 2**: simple "division" (**/**)
* **Math.pow(1, 2)**: exponentiation (**pow**)

Formula machine has some unary operators:

* **Math.sqrt(4)**: calculating the root (**sqrt**)

install
=======

With [npm](https://www.npmjs.com/package/formula-machine) do:

```
npm install formula-machine
```

test
====

With [npm](https://www.npmjs.com/package/formula-machine) do:

```
npm test
```