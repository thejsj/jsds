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
   * Get the max value between two values.
   *
   * @param {String}
   * @param {String}
   * @return {String}
   * @private
   */
  _max () {
    let args = [].slice.call(arguments).sort();
    return args[args.length - 1];
  }

  /*!
   * Get the min value between two values.
   *
   * @param {String}
   * @param {String}
   * @return {String}
   * @private
   */
  _min () {
    let args = [].slice.call(arguments);
    return args.sort()[0];
  }

};

export default BinarySearchStringTree;
