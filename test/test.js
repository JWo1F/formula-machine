var assert = require('assert');
var formula = require('../build/bundle');

describe('general', function() {
  it('toNumber', function() {
    assert.equal(2, formula._toNumber(2));
    assert.equal(0, formula._toNumber('eee'));
  });

  it('renderBrackets', function() {
    assert.equal(2, formula._renderBrackets(2));
    assert.equal(2, formula._renderBrackets({ number: 2 }));
    assert.equal('$vars["x"]', formula._renderBrackets({ variable: 'x' }));
    assert.equal('(2+2)', formula._renderBrackets({ operator: '+', first: 2, second: 2 }));
    assert.equal('Math.sqrt((2+3))', formula._renderBrackets({ operator: 'sqrt', first: { formula: { operator: '+', first: 2, second: 3 } } }));
    assert.throws(() => formula._renderBrackets({ unknown: true }), Error);
  });

  it('renderOperator', function() {
    assert.equal('(1+2)', formula._renderOperator({ operator: '+', first: 1, second: 2 }));
    assert.equal('Math.pow(1,2)', formula._renderOperator({ operator: 'pow', first: 1, second: 2 }));
    assert.equal('Math.sqrt(4)', formula._renderOperator({ operator: 'sqrt', first: 4 }));
  });

  it('working', function() {
    assert.equal(3, formula.toFunction({ operator: '+', first: { operator: '-', first: 4, second: 2 }, second: 1 })());
  });
})