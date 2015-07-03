let BinarySearchTreeArray = class BinarySearchTreeArray {

  constructor() {
    this.values = [];
  }

  _find (value, cb, lowIndex, highIndex) {
    console.log('values', this.values);
    if (this.values.length === 0) cb(null);
    if (lowIndex === undefined) lowIndex = 0;
    if (highIndex === undefined) highIndex = this.values.length - 1;
    let midIndex = Math.ceil((lowIndex + highIndex) / 2);
    console.log('Indexes:', lowIndex, midIndex, highIndex);
    console.log(this.values[lowIndex], '<', this.values[midIndex], '<', this.values[midIndex]);
    if (lowIndex === highIndex) {
      if (this.values[lowIndex] === value) cb(lowIndex, true);
      else cb(lowIndex, false, this.values[lowIndex]);
    } else if (this.values[lowIndex] <= value && value < this.values[midIndex]) {
      //this._find(value, cb, lowIndex, midIndex);
    } else {
      //this._find(value, cb, midIndex, highIndex);
    }
  }

  /*!
   * Add a new value to the tree
   * Returns true if inserted. Returns false if already present.
   *
   * @param {Number}
   * @return {Boolean}
   */
  add (value) {
    let found = false;
    this._find(value, (index, found, foundVal) => {
      if (!found) {
        this.values.splice(index, 0, value);
      }
    });
    return found;
  }

  /*!
   * Remove value from the tree
   *
   * @param {Number}
   */
  remove (value) {
    let found = false;
    this._find(value, (index, foundVal) => {
      console.log(foundVal, value, 'index:', index);
      if (foundVal === value) {
        found = true;
        this.values.splice(index, 1);
      }
    });
    return found;
  }

  /*!
   * Find value and return whether it was found or not
   *
   * @param {Boolean}
   */
  find () {
    let found = false;
    this._find(value, (index, foundVal) => {
      if (foundVal === value) {
        found = true;
      }
    });
    return found;
  }

  /*!
   * Rebalance the tree, in order to make it more efficient
   */
  rebalance () {

  }

};

module.exports = BinarySearchTreeArray;
