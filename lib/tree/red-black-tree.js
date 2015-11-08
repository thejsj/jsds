/*jshint maxcomplexity:false, maxstatements:false */
import taser from 'taser';

const NIL = Symbol('NIL');
const TYPE = 'number';
const assertColor = taser({ type: 'string', values: ['red', 'black'] });

class RedBlackTreeNode {

  constructor (value, color, parent) {
    assertColor(color);
    this.value = value;
    this.color = color;
    this.parent = parent;
    if (value !== NIL) {
      this.left = new RedBlackTreeNode(NIL, 'black');
      this.right = new RedBlackTreeNode(NIL, 'black');
    } else {
      this.left = null;
      this.right = null;
    }
  }

  isRed () {
    return this.color === 'red';
  }

  isBlack () {
    return this.color === 'black';
  }

  setRed () {
    this.color = 'red';
  }

  setBlack () {
    this.color = 'black';
  }

  insert (value, parent, direction) {
    if (this.value === NIL) {
      parent[direction] = new RedBlackTreeNode(value, 'red', parent);
      return parent[direction].rebalance();
    }
    if (value < this.value) {
      if (this.left instanceof this.constructor) return this.left.insert(value, this, 'left');
      this.left = new this.constructor(value, 'red', this);
      return this.left.rebalance();
    }
    if (value > this.value) {
      if (this.right instanceof this.constructor) return this.right.insert(value, this, 'right');
      this.right = new this.constructor(value, 'red', this);
      return this.right.rebalance();
    }
    return false;
  }

  rebalance() {
    let parent = this.getParent();
    if (parent === null) {
      // Case #1: Node is root
      this.setBlack();
      return true;
    } else if (parent.isBlack()) {
      // Case #2: Parent is black
      return true;
    }
    // We can presume this tree has a grandparent, because the parent is not
    // black and the root of the tree always has to be black.
    let grandparent = this.getGrandparent();
    // NOTE: Not sure if we can presume there is an uncle?
    let uncle = this.getUncle();
    if (uncle !== null && uncle.value !== NIL && uncle.isRed()) {
      // Case #3 : Both parent an uncle are red
      parent.setBlack();
      uncle.setBlack();
      grandparent.setRed();
      return grandparent.rebalance();
    } else if (this === parent.right && parent === grandparent.left) {
      // Case #4: If the uncle is black and the node's value is between the parent
      // and the grand parent
      console.log('Case #4 Left', this.value);
      return parent.rotateLeft();
      // n = n.left // What does that mean?
    } else if (this === parent.left && parent === grandparent.right) {
      console.log('Case #4 Left', this.value);
      return parent.rotateRight();
      // n = n.right // What does that mean?
    } else {
      // Case #5: Node's value is left child of a left parent or right child of a 
      // right parent
      parent.setBlack();
      grandparent.setRed();
      if (this === parent.left) {
        return grandparent.rotateRight();
      } else {
        return grandparent.rotateLeft();
      }
    }
    return true;
  }

  rotateLeft () {
    let y = this.right;
    this.right = y.left;
    if (y.left === null) {
      y.left.parent = this;
    }
    y.parent = this.parent;
    if (this.parent === null) {
      return y; // Set as root
    } else if (this === this.parent.left) {
      this.parent.left = y;
    } else {
      this.parent.right = y;
    }
    y.left = this;
    this.parent = y;
    return true;
  }

  rotateRight () {
    let y = this.left;
    this.left = y.right;
    if (y.right === null) {
      y.right.parent = this;
    }
    y.parent = this.parent;
    if (this.parent === null) {
      return y; // Set as root
    } else if (this === this.parent.right) {
      this.parent.right = y;
    } else {
      this.parent.left = y;
    }
    y.right = this;
    this.parent = y;
    return true;
  }

  /**
   * Iterate over all values, in ascending order
   *
   * @param {Function}
   * @param {Number}
   * @return {Undefined}
   * @private
   */
  forEach (callback, level = 0) {
    let getValue = (x) => (x === null) ? null : x.value;
    if (this.left.value !== NIL) this.left.forEach(callback, level + 1);
    callback(this, level, getValue(this.left), getValue(this.right));
    if (this.right.value !== NIL) this.right.forEach(callback, level + 1);
    return;
  }

  /**
   * Get all values in the tree using one of the `forEach` methods
   *
   * @param {String}
   * @return {Array}
   * @private
   */
  getValues (method) {
    let values = [];
    this[method]((value) => {
      values.push(value);
    });
    return values;
  }

  /**
   * Iterate over all values, depth first.
   *
   * @param {Function}
   * @param {Number}
   * @return {Undefined}
   * @private
   */
  forEachDepthFirst (callback, level = 0) {
    let getValue = (x) => (x === null) ? null : x.value;
    callback(this, level, getValue(this.left), getValue(this.right));
    if (this.left !== null) this.left.forEachDepthFirst(callback, level + 1);
    if (this.right !== null) this.right.forEachDepthFirst(callback, level + 1);
    return;
  }

  /**
   * Iterate over all values in the tree, going in order of levels in ascending
   * order and then in order of values in ascending numerical order.
   *
   * @param {Function}
   * @return {Undefined}
   */
  forEachBreadthFirst (callback) {
    // NOTE: Naive implementation. Is there a faster way?
    // NOTE: Implement with a priority queue?
    let values = {};
    let maxLevel = 0;
    this.forEachDepthFirst((node, level, leftValue, rightValue) => {
      let value = node.value;
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

  /**
   * Check whether the tree contains a particular value
   *
   * @param {Number}
   * @return {Boolean}
   * @private
   */
  contains (value) {
    if (value === this.value) return true;
    if (value < this.value && this.left instanceof this.constructor)
      return this.left.contains(value);
    if (value > this.value && this.right instanceof this.constructor)
      return this.right.contains(value);
    return false;
  }

  getUncle () {
    let grandparent = this.getGrandparent();
    if (grandparent) {
      if (grandparent.left === this.parent && grandparent.right) {
        return grandparent.right;
      } else if (grandparent.left) {
        return grandparent.left;
      }
    }
    return null;
  }

  getGrandparent () {
    let parent = this.getParent();
    if (parent) return parent.getParent();
    return null;
  }

  getParent () {
     if (this.parent) return this.parent;
     return null;
  }

  print (indentation = 0) {
    let str = (this.value === NIL) ? 'NIL' : this.value;
    console.log(' -'.repeat(indentation), str, '(', this.color , ')');
    if (this.left !== null) this.left.print(indentation + 1);
    if (this.right !== null) this.right.print(indentation + 1);
  }

}

export default class RedBlackTree {

  constructor (value) {
    this.root = new RedBlackTreeNode(value, 'black');
  }

  insert (value) {
    taser([TYPE], value);
    if (this.root === null) {
      // Case #1: Node is the root
      this.root = new RedBlackTreeNode(value);
      return true;
    }
    let newRoot = this.root.insert(value, 'red', this);
    if (newRoot instanceof RedBlackTreeNode) {
       this.root = newRoot;
    }
  }

  remove (value) {
    taser([TYPE], value);
  }

  /**
   * Check whether the tree contains a particular value.
   *
   * @param {Number}
   * @return {Boolean}
   */
  contains (value) {
    return this.root.contains(value);
  }

  /**
   * Get all values in the tree, in ascending numberial order.
   *
   * @return {Array}
   */
  getValues () {
    return this.root.getValues('forEach');
  }

  /**
   * Get all values in the tree, starting with all the left most nodes in the tree.
   *
   * @return {Array}
   */
  getValuesDepthFirst () {
    return this.root.getValues('forEachDepthFirst');
  }

  /**
   * Get all values in the tree, in order of their level in ascending order,
   * followed by their value in ascending numerical order.
   *
   * @return {Array}
   */
  getValuesBreadthFirst () {
    return this.root.getValues('forEachBreadthFirst');
  }

  /**
   * Iterate over all values in the tree, going in ascending numerical order.
   *
   * @param {Function}
   * @return {Undefined}
   */
  forEach (callback) {
    taser(['function'], callback);
    return this.root.forEach(node => callback(node), 0);
  }

  /**
   * Iterate over all values in the tree, going always over the left side of
   * the tree.
   *
   * @param {Function}
   * @return {Undefined}
   */
  forEachDepthFirst (callback) {
    taser(['function'], callback);
    return this.root.forEachDepthFirst(node => callback(node));
  }

  /**
   * Iterate over all values in the tree, going in order of levels in ascending
   * order and then in order of values in ascending numerical order.
   *
   * @param {Function}
   * @return {Undefined}
   */
  forEachBreadthFirst (callback) {
    taser(['function'], callback);
    return this.root.forEachBreadthFirst(node => callback(node));
  }

  /**
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

  /**
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
    return Math.max(...[ getMaxDepth('left') + 1, getMaxDepth('right') + 1 ]);
  }

  /**
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
    return Math.min(...[ _getMinDepth('left') + 1, _getMinDepth('right') + 1 ]);
  }

  print () {
    this.root.print(0);
  }

  validate () {
    let err = null;
    // 1. A node is either red or black
    this.forEach((node) => {
      console.log('Node', node);
      if (!node.isBlack() && !node.isRed())  {
        err = new Error('Property #1: All node should be red or black.');
      }
    });
    if (err !== null) throw err;
    // 2. The root is always black
    if (!this.root.isBlack()) {
      throw new Error('Property #2: Root should always be black');
    }
    // 3. All leaves (NIL) are black
    this.forEach((node) => {
      if (node.value === NIL && !node.isBlack()) {
        err = new Error('Property #3: All nil nodes should be black');
      }
    });
    if (err !== null) throw err;
    // 4. If a node is red, then both its children are black
    this.forEach((node) => {
      if (node.isRed() && !node.left.isBlack() && !node.right.isBlack()) {
        err = new Error('Property #4: Red nodes should have two black children');
      }
    });
    if (err !== null) throw err;
    // 5. All paths should have the same number of black nodes
    let numberOfBlacksNodes = null;
    // Very inefficient way of checking this...
    let getNumberOfBlackParents = (node, count) => {
      if (node.isBlack()) count += 1;
      if (node.parent !== null) return getNumberOfBlackParents(node.parent, count);
      return count;
    };
    this.forEach((node) => {
      if (node.value === NIL) {
        let count = getNumberOfBlackParents(node, 0);
        if (numberOfBlacksNodes === null) {
          numberOfBlacksNodes = count;
        } else if (numberOfBlacksNodes !== count) {
          err = new Error(
            `Property #5: Same number of black nodes through` +
            ` all paths (${numberOfBlacksNodes}/${count})`
          );
        }
      }
    });
    if (err !== null) throw err;
    return true;
  }

    /**
   * Get the max value between two values.
   * Use a separate method instead of `Math.max`, so that it can be overwritten
   * for strings.
   *
   * @param {Number}
   * @param {Number}
   * @return {Number}
   * @private
   */
  _max (...args) {
    return Math.max(...args);
  }

  /**
   * Get the min value between two values.
   * Use a separate method instead of `Math.min`, so that it can be overwritten
   * for strings.
   *
   * @param {Number}
   * @param {Number}
   * @return {Number}
   * @private
   */
  _min (...args) {
    return Math.min(...args);
  }

}
