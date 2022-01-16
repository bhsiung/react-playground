type Triplet = [number, number, number];

export function threeSum(nums: number[]): number[][] {
  //  i  j ->         <-k
  //  0  1  2 3 4 5 6 7 8
  // -5 -2 -1 0 0 1 1 2 3
  nums.sort((a, b) => a - b);
  const snapshots = new Set<string>();
  const results: Triplet[] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    let j = i + 1;
    let k = nums.length - 1;
    console.log('for', i, j, k);
    while (j < k) {
      console.log('while', i, j, k);
      let sum = nums[i] + nums[j] + nums[k];
      const triplet: Triplet = [nums[i], nums[j], nums[k]];
      const tripletString = JSON.stringify(triplet);
      if (sum === 0) {
        if (!snapshots.has(tripletString)) {
          snapshots.add(tripletString);
          results.push(triplet);
        }
        k--
        j++
      } else if (sum > 0) {
        k--;
      } else {
        // sum < 0
        j++;
      }
    }
  }
  return results;
}
// console.log(threeSum([-5, -2, -1, 0, 0, 1, 1, 2, 3]))
// console.log(threeSum([1, 2, -3, 9]));
// console.log(threeSum([-2,0,1,1,2]))
console.log(threeSum([-1,0,1,2,-1,-4]))
