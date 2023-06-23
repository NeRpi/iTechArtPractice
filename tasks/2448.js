// https://leetcode.com/problems/minimum-cost-to-make-array-equal/

// You are given two 0-indexed arrays nums and cost consisting each of n positive integers.
//
// You can do the following operation any number of times:
//
//      Increase or decrease any element of the array nums by 1.
//
// The cost of doing one operation on the ith element is cost[i].
//
// Return the minimum total cost such that all the elements of the array nums become equal.


/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
var minCost = function (nums, cost) {
    let pairArray = nums.map((num, index) => [num, cost[index]]);
    pairArray.sort((a, b) => a[0] - b[0]);
    let left = 0;
    let right = pairArray.length - 1;
    let resultCost = 0
    while (left !== right) {
        if (pairArray[left][1] < pairArray[right][1]) {
            resultCost += pairArray[left][1] * (pairArray[left + 1][0] - pairArray[left][0]);
            pairArray[left + 1][1] += pairArray[left++][1];
        } else {
            resultCost += pairArray[right][1] * (pairArray[right][0] - pairArray[right - 1][0])
            pairArray[right - 1][1] += pairArray[right--][1];
        }
    }
    return resultCost;
}
