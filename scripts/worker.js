importScripts('functions.js');

function compute(input) {
  let match;
  // Non-negative integer input
  if (match = input.match(/^(0|[1-9]\d*)$/)) {
    const n = BigInt(match[1]);

    // Input greater than 1
    if (n > 1n) {
      // Prime factorization
      const primeFactors = factor(n);
      self.postMessage([
        'Prime factorization',
        [
          primeFactors
            .map(([base, exponent]) => (
              exponent === 1n ? base : `${base}^${exponent}`
            ))
            .join(' \\times '),
        ],
        [
          primeFactors.length === 1 ? '&#160;(prime number)' : null
        ],
      ]);
    }

    self.postMessage(true);
  }
  // Factorial
  else if (match = input.match(/^(0|[1-9]\d*)!$/)) {
    const n = BigInt(match[1]);
    const value = factorial(n);
    self.postMessage(['Result', [value]]);

    compute(String(value));
  }
}

self.addEventListener('message', (event) => {
  const input = event.data;
  compute(input);
}, false);
