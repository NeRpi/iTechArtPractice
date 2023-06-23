// https://leetcode.com/problems/minimum-number-of-operations-to-make-arrays-similar/

// You are given two positive integer arrays nums and target, of the same length.
//
// In one operation, you can choose any two distinct indices i and j where 0 <= i, j < nums.length and:
//
//     set nums[i] = nums[i] + 2 and
//     set nums[j] = nums[j] - 2.
//
// Two arrays are considered to be similar if the frequency of each element is the same.
//
// Return the minimum number of operations required to make nums similar to target.
// The test cases are generated such that nums can always be similar to target.

/**
 * @param {number[]} nums
 * @param {number[]} target
 * @return {number}
 */

function getCountUp(nums, target) {
    let countUp = 0;
    for (let i = 0; i <= nums.length; i++)
        if (nums[i] < target[i]) countUp += (target[i] - nums[i]) >> 1;
    return countUp;
}

var makeSimilar = function (nums, target) {
    const evenNums = nums.filter(num => (num & 1) === 0).sort((a, b) => a - b);
    nums = nums.filter(num => (num & 1) === 1).sort((a, b) => a - b);
    const evenTarget = target.filter(num => (num & 1) === 0).sort((a, b) => a - b);
    target = target.filter(num => (num & 1) === 1).sort((a, b) => a - b);
    return (getCountUp(evenNums, evenTarget) + getCountUp(nums, target));
};
