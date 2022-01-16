const permutateCache = new Map();
export function permutate(digits: number[]): number[][] {
  const cache = permutateCache.get(digits);
  if (cache) {
    return cache;
  }

  const results: number[][] = [];
  if (digits.length <= 1) {
    results.push(digits);
  } else {
    for (let i = 0; i < digits.length; i++) {
      const clonedDigits = [...digits];
      clonedDigits.splice(i, 1);
      const subResults = permutate(clonedDigits);
      for (let subDigits of subResults) {
        results.push([digits[i], ...subDigits]);
      }
    }
  }

  permutateCache.set(digits, results);
  return results;
}

function test(...args: number[]): boolean {
  if (args.length === 4) {
    const [a, b, c, d] = args;
    return (
      test(a + b, c, d) ||
      test(a - b, c, d) ||
      test(a * b, c, d) ||
      (b !== 0 && test(a / b, c, d)) ||
      test(a, b + c, d) ||
      test(a, b - c, d) ||
      test(a, b * c, d) ||
      (c !== 0 && test(a, b / c, d)) ||
      test(a, b, c + d) ||
      test(a, b, c - d) ||
      test(a, b, c * d) ||
      (d !== 0 && test(a, b, c / d))
    );
  } else if (args.length === 3) {
    const [a, b, c] = args;
    return test(a + b, c) || test(a - b, c) || test(a * b, c) || (b && test(a / b, c)) || test(a, b + c) || test(a, b - c) || test(a, b * c) || (c !== 0 && test(a, b / c));
  } else if (args.length === 2) {
    const [a, b] = args;
    return test(a + b) || test(a - b) || test(a * b) || (b !== 0 && test(a / b))
  } else {
    console.log(args)
    return Math.abs(args[0] - 24) < 0.01;
  }
}

function ans(testCase: number[]): boolean {
  const permutation = permutate(testCase);
  for (let combo of permutation) {
    if (test(...combo)) return true;
  }
  return false;
}
console.log(ans([2,3,4]));
