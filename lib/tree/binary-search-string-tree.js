import taser from 'taser';
import binarySearchTreeConstructor from './binary-search-tree-constructor';

export default class BinarySearchStringTree extends binarySearchTreeConstructor('string') {

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

}
