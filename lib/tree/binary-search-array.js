/*!
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

let taserNumber = taser(['number']);
const values = Symbol('values');

const BinarySearchArray = class BinarySearchArray {

  constructor() {
    this[values]= [];
  }

  /*!
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
  _find (value, cb, lowIndex, highIndex) {
    if (this[values].length === 0) {
      cb(null);
      return false;
    }
    if (lowIndex === undefined) lowIndex = 0;
    if (highIndex === undefined) highIndex = this[values].length - 1;
    let midIndex = Math.floor((lowIndex + highIndex) / 2);
    // If lowIndex and highIndex are the same, we've reached the bottom of the tree
    if (this[values][midIndex] === value) {
      if (cb) cb(midIndex, true);
      return true;
    }
    if (lowIndex >= highIndex) {
      // Check if our index matches our value
      // If our values don't match, check if it's bigger or smaller
      if (cb) cb(() => {
        // If our values is higher than the value in the array, add 1
        if (this[values][midIndex] < value) return midIndex + 1;
        else return midIndex;
      }(), false, this[values][midIndex]);
      return false;
    }
    // Decide whether to go left or right on the tree
    if (this[values][lowIndex] < value && value < this[values][midIndex]) {
      return this._find(value, cb, lowIndex, midIndex - 1);
    }
    return this._find(value, cb, midIndex + 1, highIndex);
  }

  /*!
   * Add a new value to the tree
   * Returns true if inserted. Returns false if already present.
   *
   * @param {Number}
   * @return {Boolean}
   */
  add (value) {
    taserNumber(value); // Make sure this is a Number
    return !this._find(value, (index, found, foundVal) => {
      if (!found) this[values].splice(index, 0, value);
    });
  }

  /*!
   * Remove value from the tree
   *
   * @param {Number}
   */
  remove (value) {
    taserNumber(value); // Make sure this is a Number
    return this._find(value, (index, found, foundVal) => {
      if (found) this[values].splice(index, 1);
    });
  }

  /*!
   * Find value and return whether it was found or not
   * Time Complexity: Logarithmic [O(log n)]
   *
   * @param {Boolean}
   */
  find (value) {
    taserNumber(value); // Make sure this is a Number
    return this._find(value);
  }

  /*!
   * Return a copy of the array of values
   *
   * @return {Array}
   */
  getValues () {
    return this[values].slice();
  }

};

export default BinarySearchArray;
