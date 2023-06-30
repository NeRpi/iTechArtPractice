// https://leetcode.com/problems/longest-arithmetic-subsequence/

// Given an array nums of integers, return the length of the longest arithmetic subsequence in nums.
//
// Note that:
//      A subsequence is an array that can be derived from another array by deleting some or no elements
//      without changing the order of the remaining elements.
//
//      A sequence seq is arithmetic if seq[i + 1] - seq[i] are all the same value
//      (for 0 <= i < seq.length - 1).

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestArithSeqLength = function (nums) {
  const uniqNums = nums.filter((value, index, array) => array.indexOf(value) === index);
  let maxValue = uniqNums.reduce((res, value) => Math.max(res, nums.filter((val) => val === value).length), 0);
  if (maxValue >= uniqNums.length) return maxValue;
  let dict = {};
  let currentValue, value;
  for (let i = 0; i < nums.length; i++) {
    currentValue = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      value = nums[j];
      const difference = value - currentValue;
      const currentDict = dict[difference];
      if (difference) {
        if (currentDict) currentDict[value] = Math.max(currentDict[value] || 2, (currentDict[currentValue] || 1) + 1);
        else dict[difference] = { [value]: 2 };
        maxValue = Math.max(dict[difference][value], maxValue);
      }
    }
  }
  return maxValue;
};
