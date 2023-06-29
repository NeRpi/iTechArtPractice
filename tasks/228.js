//https://leetcode.com/problems/summary-ranges/

// You are given a sorted unique integer array nums.
//
// A range [a,b] is the set of all integers from a to b (inclusive).
//
// Return the smallest sorted list of ranges that cover all the numbers in the array exactly.
// That is, each element of nums is covered by exactly one of the ranges, and there is no integer
// x such that x is in one of the ranges but not in nums.
//
// Each range [a,b] in the list should be output as:
//
//      "a->b" if a != b
//      "a" if a == b

/**
 * @param {number[]} nums
 * @return {string[]}
 */

var summaryRanges = function (nums) {
    return nums.reduce((accumulator, value, currentIndex, array) => {
        if (value + 1 !== array[currentIndex + 1]) {
            if (accumulator.at(-1) !== value) accumulator.push(`${accumulator.pop()}->${value}`)
            else accumulator.push(`${accumulator.pop()}`);
            accumulator.push(array[currentIndex + 1]);
        }
        return accumulator;
    }, [nums[0]]).slice(0, -1);
};
