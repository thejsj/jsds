/**
 * Questions:
 * 1. Wouldn't is just be faster to have an always sorted array and use `indexOf`
 * 2. What is the time complexity for finding and appending/removing a value (O(log n) + O(n))
 * 3. Would this actually be faster than just doing it natively?
 *
 * Advantages:
 * 1. Value lookup is O(log n)
 * 2. No need for rebalancing
 * 3. Items stored in ordered array provides cheap exporting
 *
 * Disadvantages:
 * 1. Items stored in an array, provide linear appending and removal
 */

import taser from 'taser';

let assertNumber = taser(['number']);
const _values_ = Symbol('values');
const _find_ = Symbol('find');

const BinarySearchArray = class BinarySearchArray {

  constructor() {
    this[_values_]= [];
  }

  /**
   * Recursively go through the tree and find a value
   * Returns if found
   * Time Complexity: Logarithmic [O(log n)]
   *
   * @param {Number}
   * @param {Function}
   * @param {Number}
   * @param {Number}
   * @return {Boolean}
   */
  [_find_] (value, cb, lowIndex, highIndex) {
    if (this[_values_].length === 0) {
      cb(null);
      return false;
    }
    if (lowIndex === undefined) lowIndex = 0;
    if (highIndex === undefined) highIndex = this[_values_].length - 1;
    let midIndex = Math.floor((lowIndex + highIndex) / 2);
    // If lowIndex and highIndex are the same, we've reached the bottom of the tree
    if (this[_values_][midIndex] === value) {
      if (cb) cb(midIndex, true);
      return true;
    }
    if (lowIndex >= highIndex) {
      // Check if our index matches our value
      // If our values don't match, check if it's bigger or smaller
      if (cb) {
        cb(() => { // Self-executing anonymous function
          // If our values is higher than the value in the array, add 1
          if (this[_values_][midIndex] < value) return midIndex + 1;
          else return midIndex;
        }(), false, this[_values_][midIndex]);
      }
      return false;
    }
    // Decide whether to go left or right on the tree
    if (this[_values_][lowIndex] < value && value < this[_values_][midIndex]) {
      return this[_find_](value, cb, lowIndex, midIndex - 1);
    }
    return this[_find_](value, cb, midIndex + 1, highIndex);
  }

  /**
   * Add a new value to the tree
   * Returns true if inserted. Returns false if already present.
   *
   * @param {Number}
   * @return {Boolean}
   */
  add (value) {
    assertNumber(value); // Make sure this is a Number
    return !this[_find_](value, (index, found, foundVal) => {
      if (!found) this[_values_].splice(index, 0, value);
    });
  }

  /**
   * Remove value from the tree
   *
   * @param {Number}
   */
  remove (value) {
    assertNumber(value); // Make sure this is a Number
    return this[_find_](value, (index, found, foundVal) => {
      if (found) this[_values_].splice(index, 1);
    });
  }

  /**
   * Find value and return whether it was found or not
   * Time Complexity: Logarithmic [O(log n)]
   *
   * @param {Boolean}
   */
  find (value) {
    assertNumber(value); // Make sure this is a Number
    return this[_find_](value);
  }

  /**
   * Return a copy of the array of values
   *
   * @return {Array}
   */
  getValues () {
    return this[_values_].slice();
  }

  /**
   * Yield all entries in tree
   *
   * @yield {Array}
   */
  *[Symbol.iterator] () {
     yield *this[_values_].entries();
  }

  /**
   * Yield all entries in tree
   *
   * @yield {Array}
   */
  *entries () {
     yield *this[_values_].entries();
  }

  /**
   * Yield all values in tree
   *
   * @yield {Array}
   */
  *values () {
     yield *this[_values_].values();
  }

  /**
   * Yield all values in tree
   *
   * @yield {Array}
   */
  *keys () {
     yield *this[_values_].keys();
  }
};

export default BinarySearchArray;
