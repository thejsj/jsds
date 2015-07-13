import taser from 'taser';

/*!
 * TODO:
 * 1. Add time complexity for all methods
 * 2. Find best time to rebalance
 * 3. Add a `forEachBetween` method
 */
let BinarySearchTree = class BinarySearchTree {

  /*!
   * Constructor
   *
   * @param {Number}
   * @param {BinarySearchTree}
   * @param {Object}
   * @return {Undefined}
   */
  constructor (value, opts) {
    taser(['object', 'undefined'], opts);
    // Options
    opts = (opts === undefined) ? {} : opts;
    this.opts = {};
    this.opts.selfRebalance = (opts.selfRebalance === undefined) ? true : opts.selfRebalance;
    this.opts.type = (opts.type === undefined) ? 'number' : opts.type;
    // Values
    this.type = this.opts.type;
    taser([this.type], value);
    this.value = value;
    this.left = null;
    this.right = null;
  }

  /*!
   * Insert a value into the tree. Returns whether the value was inserted into
   * the tree. Returns false if the values was already in the tree.
   *
   * @param {Number}
   * @return {Boolean}
   */
  insert (value) {
    taser([this.type], value);
    return this._insert(value) && this._checkForRebalance();
  }

/*!
   * Remove a value from the tree. If the node has children, re-arrange the
   * tree. Returns whether the value was removed. Returns `false` if the value
   * never exited in the tree.
   *
   * @param {Number}
   * @return {Boolean}
   */
  remove (value) {
    taser([this.type], value);
    return this._remove(value) && this._checkForRebalance();
  }

 /*!
   * Check whether the tree contains a particular value.
   *
   * @param {Number}
   * @return {Boolean}
   */
  contains (value) {
    taser([this.type], value);
    return this._contains(value);
  }

  /*!
   * Get all values in the tree, in ascending numberial order.
   *
   * @return {Array}
   */
  getValues () {
    return this._getValues('_forEach');
  }

  /*!
   * Get all values in the tree, starting with all the left most nodes in the tree.
   *
   * @return {Array}
   */
  getValuesDepthFirst () {
    return this._getValues('forEachDepthFirst');
  }

  /*!
   * Get all values in the tree, in order of their level in ascending order,
   * followed by their value in ascending numerical order.
   *
   * @return {Array}
   */
  getValuesBreadthFirst () {
    return this._getValues('forEachBreadthFirst');
  }

  /*!
   * Iterate over all values in the tree, going in ascending numerical order.
   *
   * @param {Function}
   * @return {Undefined}
   */
  forEach (callback) {
    taser(['function'], callback);
    return this._forEach(value => callback(value));
  }

  /*!
   * Iterate over all values in the tree, going always over the left side of
   * the tree.
   *
   * @param {Function}
   * @return {Undefined}
   */
  forEachDepthFirst (callback) {
    taser(['function'], callback);
    return this._forEachDepthFirst(value => callback(value));
  }

  /*!
   * Iterate over all values in the tree, going in order of levels in ascending
   * order and then in order of values in ascending numerical order.
   *
   * @param {Function}
   * @return {Undefined}
   */
  forEachBreadthFirst (callback) {
    taser(['function'], callback);
    // NOTE: Naive implementation. Is there a faster way?
    // NOTE: Implement with a priority queue?
    let values = {};
    let maxLevel = 0;
    this._forEachDepthFirst((value, level, leftValue, rightValue) => {
      if (values[level] === undefined) values[level] = [];
      values[level].push(value);
      maxLevel = Math.max(maxLevel, level);
    });
    for (let key = 0; key <= maxLevel; key += 1) {
      for (let i = 0; i < values[key].length; i += 1) {
        callback(values[key][i]);
      }
    }
    return;
  }

  /*!
   * Get all values in the tree with values between two values. Min value is
   * open (<=). Max value is closed (>).
   *
   * @param {Number}
   * @param {Number}
   * @return {Array}
   */
  between (lowerValue, higherValue) {
    let low = this._min(lowerValue, higherValue);
    let high = this._max(lowerValue, higherValue);
    return this._between(low, high, []);
  }

  /*!
   * Get the longest depth in the tree
   *
   * @return {Number}
   */
  getMaxDepth () {
    let getMaxDepth = (side) => {
      if (this[side] === null) return 0;
      return this[side].getMaxDepth();
    };
    // Here we use `Math.max` because levels are always numbers
    return Math.max.apply(null, [ getMaxDepth('left') + 1, getMaxDepth('right') + 1 ]);
  }

  /*!
   * Get the shortest depth in the tree
   *
   * @return {Number}
   */
  getMinDepth () {
    let _getMinDepth = (side) => {
      if (this[side] === null) return 0;
      return this[side].getMinDepth();
    };
    // Here we use `Math.min` because levels are always numbers
    return Math.min.apply(null, [ _getMinDepth('left') + 1, _getMinDepth('right') + 1 ]);
  }

  /*!
   * Insert a value into the tree.
   *
   * @param {Number}
   * @return {Boolean}
   * @private
   */
  _insert (value) {
    if (this.value === null) this.value = value;
    if (value < this.value) {
      if (this.left instanceof BinarySearchTree) return this.left._insert(value);
      this.left = new this.constructor(value, this.opts);
      return true;
    }
    if (value > this.value) {
      if (this.right instanceof BinarySearchTree) return this.right._insert(value);
      this.right = new this.constructor(value, this.opts);
      return true;
    }
    return false;
  }

  /*!
   * Remove a value from the tree. If the node has children, re-arrange the tree
   *
   * @param {Number}
   * @param {BinarySearchTree}
   * @param {String}
   * @return {Boolean}
   * @private
   */
  _remove (value, parent, direction) {
    // TODO: Simplify function
    if (value === this.value) {
      // If node has no children, delete the node and return
      if (this.left === null && this.right === null) {
        if (parent) {
          parent[direction] = null;
          return true;
        }
        throw new Error('Binary Tree cannot be empty');
      }
      // If node has 1 child, make that node the new node
      if (this.left === null || this.right === null) {
        if (this.left !== null) {
          this.value = this.left.value;
          this.right = this.left.right;
          this.left = this.left.left;
        }
        if (this.right !== null) {
          this.value = this.right.value;
          this.left = this.right.left;
          this.right = this.right.right;
        }
        return true;
      }
      /*!
       * A node having two children is the most complex scenario. Basically,
       * we're going to promote a node in the child binary trees to be the new
       * node representing this value
       */
      // Get depth for both sides
      let leftDepth = (this.left === null) ? 0 : this.left.getMaxDepth();
      let rightDepth = (this.right === null) ? 0 : this.right.getMaxDepth();
      // Get side with deepest depth
      let biggerSide = (leftDepth > rightDepth) ? 'left' : 'right';
      // Get the min/max value for the biggerSide and remove it, so that it can
      // be set as the new value
      let minOrMax = (biggerSide === 'left') ? 'max' : 'min';
      let newNodeValue = this['_' + minOrMax].apply(null, this[biggerSide].getValues());
      this._remove(newNodeValue);
      this.value = newNodeValue;
      return true;
    }
    if (value < this.value && this.left instanceof BinarySearchTree)
      return this.left._remove(value, this, 'left');
    if (value > this.value && this.right instanceof BinarySearchTree)
      return this.right._remove(value, this, 'right');
    return false;
  }

  /*!
   * Check whether the tree contains a particular value
   *
   * @param {Number}
   * @return {Boolean}
   * @private
   */
  _contains (value) {
    if (value === this.value) return true;
    if (value < this.value && this.left instanceof BinarySearchTree)
      return this.left._contains(value);
    if (value > this.value && this.right instanceof BinarySearchTree)
      return this.right._contains(value);
    return false;
  }

  /*!
   * Get all values in the tree using one of the `_forEach` methods
   *
   * @param {String}
   * @return {Array}
   * @private
   */
  _getValues (method) {
    let values = [];
    this[method]((value) => {
      values.push(value);
    });
    return values;
  }

  /*!
   * Iterate over all values, in ascending order
   *
   * @param {Function}
   * @param {Number}
   * @return {Undefined}
   * @private
   */
  _forEach (callback, level) {
    level = (level !== undefined) ? level : 0;
    let getValue = (x) => (x === null) ? null : x.value;
    if (this.left !== null) this.left._forEach(callback, level + 1);
    callback(this.value, level, getValue(this.left), getValue(this.right));
    if (this.right !== null) this.right._forEach(callback, level + 1);
    return;
  }

  /*!
   * Iterate over all values, depth first.
   *
   * @param {Function}
   * @param {Number}
   * @return {Undefined}
   * @private
   */
  _forEachDepthFirst (callback, level) {
    level = (level !== undefined) ? level : 0;
    let getValue = (x) => (x === null) ? null : x.value;
    callback(this.value, level, getValue(this.left), getValue(this.right));
    if (this.left !== null) this.left._forEachDepthFirst(callback, level + 1);
    if (this.right !== null) this.right._forEachDepthFirst(callback, level + 1);
    return;
  }

  /*!
   * Get all values between two values
   *
   * @param {Number}
   * @param {Number}
   * @param {Array}
   * @return {Array}
   * @private
   */
  _between (low, high, values) {
    let callIfNotNull = (side) => {
      if (this[side] !== null) return this[side]._between(low, high, values);
      return [];
    };
    if (low <= this.value && this.value < high) {
      return values
        .concat(callIfNotNull('left'))
        .concat([this.value])
        .concat(callIfNotNull('right'));
    }
    if (this.value >= high && this.left !== null) {
      return values.concat(callIfNotNull('left'));
    }
    if (this.value < low && this.right !== null) {
      return values.concat(callIfNotNull('right'));
    }
    return [];
  }

  /*!
   * Get the max value between two values.
   * Use a separate method instead of `Math.max`, so that it can be overwritten
   * for strings.
   *
   * @param {Number}
   * @param {Number}
   * @return {Number}
   * @private
   */
  _max () {
    return Math.max.apply(null, [].slice.call(arguments));
  }

  /*!
   * Get the min value between two values.
   * Use a separate method instead of `Math.min`, so that it can be overwritten
   * for strings.
   *
   * @param {Number}
   * @param {Number}
   * @return {Number}
   * @private
   */
  _min () {
    return Math.min.apply(null, [].slice.call(arguments));
  }

  /*!
   * Check whether a tree needs rebalancing. If it does, then rebalance it.
   *
   * @return {Boolean}
   * @private
   */
  _checkForRebalance () {
    if (this.opts.selfRebalance && this.getMaxDepth() / 2 >= this.getMinDepth()) {
      this._rebalance();
      return true;
    }
    return false;
  }

  /*!
   * Rebalance the tree by getting all values and re-inserting them. Method is
   * called automatically by `_checkForRebalance`
   *
   * @return {Undefined}
   * @private
   */
  _rebalance () {
    // NOTE: Naive recursive implementation. Is there a faster way?
    let insertValues = (values) => {
      if (values.length === 0) return true;
      let middleIndex = Math.floor(values.length / 2);
      let middleValue = values.splice(middleIndex, 1)[0];
      let rightValues = values.splice(middleIndex, Infinity);
      let leftValues = values.slice();
      this._insert(middleValue);
      return insertValues(leftValues) && insertValues(rightValues);
    };
    let values = this.getValues(); // Linear operation
    this.value = null;
    this.left = null;
    this.right = null;
    insertValues(values); // Linear operation
  }
};

export default BinarySearchTree;
