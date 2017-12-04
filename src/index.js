export function toFunction(raw) {
  return new Function('$vars', 'return ' + _renderBrackets(raw));
}

export function _renderBrackets(item) {
  if(typeof item == 'number') return _toNumber(item);

  if('number' in item) return _toNumber(item.number);
  if('formula' in item) return _renderBrackets(item.formula);
  if('variable' in item) return `$vars["${item.variable}"]`;
  if('operator' in item) return _renderOperator(item);

  throw new Error('Unexpected item');
}

export function _renderOperator(item) {
  if(['+', '-', '*', '/'].includes(item.operator)) {
    return `(${_renderBrackets(item.first)}${item.operator}${_renderBrackets(item.second)})`;
  }

  if(item.operator == 'pow') {
    return `Math.pow(${_renderBrackets(item.first)},${_renderBrackets(item.second)})`;
  }

  if(item.operator == 'sqrt') {
    return `Math.sqrt(${_renderBrackets(item.first)})`;
  }

  throw new Error('Unexpected operator');
}

export function _toNumber(a) {
  a = Number(a);

  if(isNaN(a)) return 0;

  return a;
}