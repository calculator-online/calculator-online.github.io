/**
 * @param {BigInt} n A non-negative integer.
 */
function factorial(n) {
  let product = BigInt(1);
  for (let i = n; i > 1; i--) {
    product *= i;
  }
  return product;
}

self.addEventListener('message', (event) => {
  const input = event.data;

  let match;

  // Factorial
  if (match = input.match(/^(\d+)!$/)) {
    const n = BigInt(match[1]);
    const value = factorial(n);
    self.postMessage(['Result', [value]]);
    self.postMessage(true);
  }
}, false);
