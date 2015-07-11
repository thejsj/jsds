import taser from 'taser';
import BinarySearchTree from './binary-search-tree';

let BinarySearchStringTree = class BinarySearchStringTree extends BinarySearchTree {

  /*!
   * Constructor
   *
   * @param {String}
   * @param {BinarySearchTree}
   * @param {Object}
   * @return {Undefined}
   */
  constructor (value, opts) {
    taser(['object', 'undefined'], opts);
    opts = (opts === undefined) ? {} : opts;
    opts.type = 'string';
    super(value, opts);
  }

  /*!
   * Get all values in the tree with values between two values. Min value is
   * open (<=). Max value is closed (>).
   *
   * @param {String}
   * @param {Number}
   * @return {Array}
   */
  between (lowerValue, higherValue) {
    let low = [lowerValue, higherValue].sort()[0];
    let high = [lowerValue, higherValue].sort()[1];
    return this._between(low, high, []);
  }



};

export default BinarySearchStringTree;
