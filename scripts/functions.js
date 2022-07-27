importScripts('third_party/algebrite.js');

function differentiate(expression) {
  Algebrite.clearall();
  try {
    return _nilToNull(Algebrite.derivative(expression));
  } catch (error) {}
}

function expressionEquals(expression1, expression2) {
  const normalize = (expression) => (
    String(expression).replaceAll(/[*\s]+/g, '')
  );
  return normalize(expression1) === normalize(expression2);
}

function factorial(integer) {
  Algebrite.clearall();
  try {
    return _nilToNull(Algebrite.factorial(integer));
  } catch (error) {}
}

function factorInteger(integer) {
  Algebrite.clearall();
  let factoredForm;
  try {
    factoredForm = Algebrite.factor(integer);
  } catch (error) {
    return;
  }
  factoredForm = _nilToNull(factoredForm);
  return factoredForm?.replaceAll('*', ' \\times ');
}

function factorPolynomial(polynomial) {
  Algebrite.clearall();
  try {
    return _nilToNull(Algebrite.factor(polynomial));
  } catch (error) {}
}

function integrate(expression) {
  Algebrite.clearall();
  try {
    return _nilToNull(Algebrite.integral(expression));
  } catch (error) {}
}

function isInteger(value) {
  try {
    BigInt(String(value));
  } catch (error) {
    return false;
  }
  return true;
}

function isNumber(value) {
  return isInteger(value) || Number.isFinite(Number(value));
}

function numericalSolve(expression) {
  Algebrite.clearall();
  let roots;
  try {
    roots = Algebrite.nroots(expression);
  } catch (error) {
    return;
  }
  return _parseArray(_nilToNull(roots));
}

function simplify(expression) {
  Algebrite.clearall();
  try {
    return _nilToNull(Algebrite.simplify(expression));
  } catch (error) {}
}

function symbolicSolve(expression) {
  Algebrite.clearall();
  let roots;
  try {
    roots = Algebrite.roots(expression);
  } catch (error) {
    return;
  }
  return _parseArray(_nilToNull(roots));
}

function _nilToNull(value) {
  const string = String(value);
  return string === 'nil' ? null : string;
}

function _parseArray(string) {
  return string?.replaceAll(/^\[|\]$/g, '').split(',');
}
