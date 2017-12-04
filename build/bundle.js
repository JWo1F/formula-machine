'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function toFunction(raw) {
  return new Function('$vars', 'return ' + _renderBrackets(raw));
}

function _renderBrackets(item) {
  if (typeof item == 'number') return _toNumber(item);

  if ('number' in item) return _toNumber(item.number);
  if ('formula' in item) return _renderBrackets(item.formula);
  if ('variable' in item) return '$vars["' + item.variable + '"]';
  if ('operator' in item) return _renderOperator(item);

  throw new Error('Unexpected item');
}

function _renderOperator(item) {
  if (['+', '-', '*', '/'].includes(item.operator)) {
    return '(' + _renderBrackets(item.first) + item.operator + _renderBrackets(item.second) + ')';
  }

  if (item.operator == 'pow') {
    return 'Math.pow(' + _renderBrackets(item.first) + ',' + _renderBrackets(item.second) + ')';
  }

  if (item.operator == 'sqrt') {
    return 'Math.sqrt(' + _renderBrackets(item.first) + ')';
  }

  throw new Error('Unexpected operator');
}

function _toNumber(a) {
  a = Number(a);

  if (isNaN(a)) return 0;

  return a;
}

exports.toFunction = toFunction;
exports._renderBrackets = _renderBrackets;
exports._renderOperator = _renderOperator;
exports._toNumber = _toNumber;
//# sourceMappingURL=bundle.js.map
