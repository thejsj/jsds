import taser from 'taser';
import BinarySearchTree from './binary-search-tree';

const BinarySearchStringTree = class BinarySearchStringTree extends BinarySearchTree {

  /**
   * Constructor
   *
   * @param {String}
   * @param {BinarySearchTree}
   * @param {Object}
   * @return {Undefined}
   */
  constructor (value, opts = {}) {
    taser(['object', 'undefined'], opts);
    opts.type = 'string';
    super(value, opts);
  }

  /**
   * Get the max value between two values.
   *
   * @param {String}
   * @param {String}
   * @return {String}
   * @private
   */
  _max (...args) {
    return args.sort()[args.length - 1];
  }

  /**
   * Get the min value between two values.
   *
   * @param {String}
   * @param {String}
   * @return {String}
   * @private
   */
  _min (...args) {
    return args.sort()[0];
  }

};

export default BinarySearchStringTree;
