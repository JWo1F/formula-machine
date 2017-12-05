export function toFunction(raw) {
  return new Function('$vars', 'return ' + _renderBrackets(raw));
}

export function _renderBrackets(item) {
  if(typeof item == 'number') return _toNumber(item);

  if('number' in item) return _toNumber(item.number);
  if('variable' in item) return `$vars["${item.variable}"]`;
  if('operator' in item) return _renderOperator(item);

  throw new Error('Unexpected item');
}

export function _renderOperator(item) {
  const operands = item.operands.map(operand => _renderBrackets(operand));

  if(['+', '-', '*', '/'].includes(item.operator)) {
    return `(${operands.join(item.operator)})`;
  }

  if(item.operator == 'pow') {
    return `Math.pow(${operands[0]},${operands[1]})`;
  }

  if(item.operator == 'sqrt') {
    return `Math.sqrt(${operands[0]})`;
  }

  throw new Error('Unexpected operator');
}

export function _toNumber(a) {
  a = Number(a);

  if(isNaN(a)) return 0;

  return a;
}