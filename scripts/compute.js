importScripts('functions.js');

function compute(originalInput, isFirstCall = true) {
  let input = originalInput;
  let match;

  // Number
  if (isNumber(input)) {
    if (isFirstCall) {
      self.postMessage(['Input', [input]]);
    }

    // Integer
    if (isInteger(input)) {
      const integer = BigInt(input);

      // Greater than 1
      if (integer > 1n) {
        // Prime factorization
        const factoredForm = factorInteger(input);
        const isPrime = factoredForm === input;
        self.postMessage([
          'Prime factorization',
          [factoredForm],
          [isPrime && '&nbsp;(prime number)'],
        ]);
      }
    }

    self.postMessage(true);
    return;
  }

  // Factorial
  if (match = input.match(/^(0|[1-9]\d*)!$/)) {
    if (isFirstCall) {
      self.postMessage(['Input', [input]]);
    }

    const integerString = match[1];
    const value = factorial(integerString);
    self.postMessage(['Result', [value]]);

    compute(value, false);
    return;
  }

  // Other mathematical expression

  input = input.replaceAll(/\*\*/g, '^');
  input = input.replaceAll(/([^=])=(?!=)/g, '$1==');
  input = input.replaceAll(/\)\s*\(/g, ')*(');

  // Inserts a space between the factors written in juxaposition, such as "xyz",
  // because Algebrite cannot handle them.
  input = input.replaceAll(/[a-z]{2,}/gi, (match) => {
    // If the string is a standard mathematical function or constant, such as
    // "sin" or "pi", does not change it.
    if (match.toLowerCase() in Math || match.toUpperCase() in Math) {
      return match;
    }

    return [...match].join(' ');
  });

  if (isFirstCall) {
    self.postMessage(['Input', [input]]);
  }

  // Simplification
  const simplifiedForm = simplify(input);

  if (simplifiedForm == null) {
    return;
  }

  if (!expressionEquals(simplifiedForm, input)) {
    self.postMessage(['Result', [simplifiedForm]]);
  }

  if (isNumber(simplifiedForm)) {
    compute(simplifiedForm, false);
    return;
  }

  // Polynomial factorization
  const factoredForm = factorPolynomial(input);
  if (
    factoredForm != null
    && !expressionEquals(factoredForm, input)
    && !expressionEquals(factoredForm, simplifiedForm)
  ) {
    self.postMessage(['Alternate form', [factoredForm]]);
  }

  input = simplifiedForm;

  // Differentiation
  const derivative = differentiate(input);
  if (derivative != null) {
    self.postMessage(['Derivative', [`D(${input}) = ${derivative}`]]);
  }

  // Indefinite integration
  const antiderivative = integrate(input);
  if (antiderivative != null) {
    self.postMessage([
      'Indefinite integral',
      [`D^-1(${input}) = ${antiderivative}`],
      ['+ constant'],
    ]);
  }

  // Symbolic roots
  const symbolicRoots = symbolicSolve(input);
  if (symbolicRoots != null) {
    self.postMessage(['Solution', symbolicRoots]);
  }

  // Numerical roots
  const numericalRoots = numericalSolve(input);
  if (numericalRoots != null) {
    self.postMessage(['Numerical solution', numericalRoots]);
  }

  self.postMessage(true);
}

self.addEventListener('message', (event) => {
  const input = event.data;
  compute(input);
}, false);
