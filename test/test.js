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
    assert.equal('(2+2)', formula._renderBrackets({ operator: '+', operands: [2, 2] }));
    assert.equal('Math.sqrt((2+3))', formula._renderBrackets({ operator: 'sqrt', operands: [{ operator: '+', operands: [2, 3] }] }));
    assert.throws(() => formula._renderBrackets({ unknown: true }), Error);
  });

  it('renderOperator', function() {
    assert.equal('(1+2)', formula._renderOperator({ operator: '+', operands: [1, 2] }));
    assert.equal('Math.pow(1,2)', formula._renderOperator({ operator: 'pow', operands: [1, 2] }));
    assert.equal('Math.sqrt(4)', formula._renderOperator({ operator: 'sqrt', operands: [4] }));
  });

  it('working', function() {
    assert.equal(3, formula.toFunction({ operator: '+', operands: [{ operator: '-', operands: [4, 2] }, 1] })());
    assert.equal(5, formula.toFunction({ operator: '/', operands: [100, 2, 10] })());

    // (2^2 + 4^2 + 5^2) / (2^2 - 4^2 / 2)
    const src = {
      operator: '/',
      operands: [
        {
          operator: '+',
          operands: [
            { operator: 'pow', operands: [2, 2] },
            { operator: 'pow', operands: [4, 2] },
            { operator: 'pow', operands: [5, 2] },
          ],
        },
        {
          operator: '-',
          operands: [
            { operator: 'pow', operands: [2, 2] },
            {
              operator: '/',
              operands: [
                { operator: 'pow', operands: [4, 2] },
                2
              ]
            },
          ]
        }
      ]
    }
    assert.equal(-11.25, formula.toFunction(src)())
  });
})