importScripts('third_party/algebrite.js');

function compute(input) {
  let match;
  // Non-negative integer input
  if (match = input.match(/^(0|[1-9]\d*)$/)) {
    const numberString = match[1];
    const number = BigInt(numberString);

    // Input greater than 1
    if (number > 1n) {
      // Prime factorization
      const factoredForm = String(Algebrite.factor(numberString))
        .replaceAll('*', ' \\times ');
      const isPrime = factoredForm === numberString;
      self.postMessage([
        'Prime factorization',
        [factoredForm],
        [isPrime && '&nbsp;(prime number)'],
      ]);
    }

    self.postMessage(true);
  }
  // Factorial
  else if (match = input.match(/^(0|[1-9]\d*)!$/)) {
    const numberString = match[1];
    const value = String(Algebrite.factorial(numberString));
    self.postMessage(['Result', [value]]);

    compute(value);
  }
}

self.addEventListener('message', (event) => {
  const input = event.data;
  compute(input);
}, false);
