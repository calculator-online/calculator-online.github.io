/**
 * @param {BigInt} number An integer greater than 1.
 */
 function factor(number) {
  let n = number;
  const primeFactors = [];
  let count;

  for (count = 0n; n % 2n === 0n; n /= 2n) {
    count++;
  }
  if (count !== 0n) {
    primeFactors.push([2n, count]);
  }

  for (count = 0n; n % 3n === 0n; n /= 3n) {
    count++;
  }
  if (count !== 0n) {
    primeFactors.push([3n, count]);
  }

  const sqrt_n = isqrt(n);
  for (let i = 5n; i <= sqrt_n; i += 4n) {
    for (count = 0n; n % i === 0n; n /= i) {
      count++;
    }
    if (count !== 0n) {
      primeFactors.push([i, count]);
    }

    i += 2n;

    for (count = 0n; n % i === 0n; n /= i) {
      count++;
    }
    if (count !== 0n) {
      primeFactors.push([i, count]);
    }
  }

  if (n !== 1n) {
    primeFactors.push([n, 1n]);
  }

  return primeFactors;
}

/**
 * @param {BigInt} number A non-negative integer.
 */
function factorial(number) {
  let n = number;
  let product = 1n;
  for (; n > 1n; n--) {
    product *= n;
  }
  return product;
}

/**
 * @see {@link https://github.com/Aisse-258/bigint-isqrt}
 * @param {BigInt} number A non-negative integer.
 */
function isqrt(number) {
  if (number < 2n) {
    return number;
  }

  if (number < 16n) {
    return BigInt(Math.floor(Math.sqrt(Number(number))));
  }
  
  let x1;

  if (number < (1n << 52n)) {
    x1 = BigInt(Math.floor(Math.sqrt(Number(number)))) - 3n;
  } else {
    x1 = (1n << 52n) - 2n;
  }

  let x0 = -1n;

  while (x0 !== x1 && x0 !== x1 - 1n) {
    x0 = x1;
    x1 = (number / x0 + x0) >> 1n;
  }

  return x0;
}
