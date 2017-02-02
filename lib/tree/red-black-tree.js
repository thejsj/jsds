/*jshint maxcomplexity:false, maxstatements:false */
import colors from 'colors/safe';
import taser from 'taser';

const TYPE = 'number';
const assertColor = taser({ type: 'string', values: ['red', 'black'] });
let root = null;
var count = 0;

class RedBlackTreeNode {

  constructor (value, color, parent) {
    assertColor(color);
    this.id = count++;
    this.value = value;
    this.color = color;
    this.parent = parent;
    if (this.parent !== null) {
      this.originalParentValue = this.parent.value;
    } else {
      this.originalParentValue = null;
    }
    if (value !== null) {
      this.left = new RedBlackTreeNode(null, 'black', this);
      this.right = new RedBlackTreeNode(null, 'black', this);
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

  isLeaf () {
     return this.value === null && this.left === null && this.right === null;
  }

  setRed () {
    this.color = 'red';
  }

  setBlack () {
    this.color = 'black';
  }

  getParentDirection () {
    if (this.parent.left === this) return 'left';
    return 'right';
  }

  /**
   * Insert the value into through BST insertion
   *
   * @param {Number}
   * @param {RedBlackTreeNode}
   * @param {String}
   * @return {RedBlackTreeNode}
   */
  insert (value, parent, direction) {
    if (this.value === null) {
      parent[direction] = new RedBlackTreeNode(value, 'red', parent);
      return parent[direction].insertionCase1();
    }
    if (value < this.value) return this.left.insert(value, this, 'left');
    if (value > this.value) return this.right.insert(value, this, 'right');
    return null;
  }

  insertionCase1 () {
    // Case #1: Node is root
    if (this.parent === null) {
      this.setBlack();
      return null;
    }
    return this.insertionCase2();
  }

  insertionCase2 () {
    // Case #2: Parent is black
    if (this.parent && this.parent.isBlack()) {
      return null;
    }
    return this.insertionCase3();
  }

  insertionCase3 () {
    let parent = this.getParent();
    // We can presume this tree has a grandparent, because the parent is not
    // black and the root of the tree always has to be black.
    let grandparent = this.getGrandparent();
    // NOTE: Not sure if we can presume there is an uncle?
    let uncle = this.getUncle();
    if (uncle !== null && uncle.value !== null && uncle.isRed()) {
      // Case #3 : Both parent an uncle are red
      parent.setBlack();
      uncle.setBlack();
      grandparent.setRed();
      return grandparent.insertionCase1();
    }
    return this.insertionCase4();
  }

  insertionCase4 () {
    let parent = this.getParent();
    let grandparent = this.getGrandparent();
    let newRoot = null;
    if (this === parent.right && parent === grandparent.left) {
      // Case #4: If the uncle is black and the node's value is between the parent
      // and the grand parent
      newRoot = parent.rotateLeft();
      return this.left.insertionCase5(newRoot);
    } else if (this === parent.left && parent === grandparent.right) {
      newRoot = parent.rotateRight();
      return this.right.insertionCase5(newRoot);
    }
    return this.insertionCase5();
  }

  insertionCase5 (newRoot) {
    let parent = this.getParent();
    let grandparent = this.getGrandparent();
    // Case #5: Node's value is left child of a left parent or right child of a 
    // right parent
    parent.setBlack();
    grandparent.setRed();
    if (this === parent.left) {
      newRoot = grandparent.rotateRight();
    } else {
      newRoot = grandparent.rotateLeft();
    }
    return newRoot;
  }

  find (value) {
    if (value < this.value && this.left.value !== null)
      return this.left.find(value);
    if (value > this.value && this.right.value !== null)
      return this.right.find(value);
    if (value !== this.value)
      return null;
    return this;
  }

  getMin () {
    if (this.left !== null && this.left.value !== null)
      return this.left.getMin();
    return this;
  }

  remove (parentTree) {
    let z = this;
    let y = z;
    let yOriginalColor = y.color;
    console.log('yOriginalColor', yOriginalColor);
    let x;
    if (z.left.value === null) {
      console.log('#1');
      x = z.right;
      z.transplant(parentTree, z.right);
    } else if (z.right.value === null) {
      console.log('#2');
      x = z.left;
      z.transplant(parentTree, z.left);
    } else {
      y = z.right.getMin();
      yOriginalColor = y.color;
      x = y.right;
      if (y.parent === z) {
        x.parent = y;
      } else {
        y.transplant(parentTree, y.right);
        y.right = z.right;
        y.right.parent = y;
      }
      z.transplant(parentTree, y);
      y.left = z.left;
      y.left.parent = y;
      y.color = z.color;
    }
    if (yOriginalColor === 'black') {
      console.log('CASE 1');
      let newRoot = x.removeCase1(parentTree);
      if (newRoot) parentTree.root = newRoot;
    }
  }

  removeCase1 () {
    if (this.parent !== null) {
      return this.removeCase2();
    }
    return;
  }

  removeCase2 () {
    let sibling = this.getSibling();
    if (sibling.isRed()) {
      this.parent.setRed();
      sibling.setBlack();
      if (this === this.parent.left) {
        return this.parent.rotateLeft();
      } else {
        return this.parent.rotateRight();
      }
    }
    return this.removeCase3();
  }

  removeCase3 () {
    let sibling = this.getSibling();
    if (this.parent.isBlack() && sibling.isBlack() && sibling.left.isBlack() && sibling.right.isBlack()) {
      sibling.setRed();
      return this.parent.removeCase1();
    }
    return this.removeCase4();
  }

  removeCase4 () {
    let sibling = this.getSibling();
    if (this.parent.isRed() && sibling.isBlack() && sibling.left.isBlack() && sibling.right.isBlack()) {
      sibling.setRed();
      this.parent.setBlack();
      return;
    }
    return this.removeCase5();
  }

  removeCase5 () {
    let sibling = this.getSibling();
    if (this === this.parent.left && sibling.right.isBlack() && sibling.left.isRed()) {
      sibling.setRed();
      sibling.left.setBlack();
      let newRoot = sibling.rotateRight();
      if (newRoot) {
        console.log('NEW ROOT', newRoot);
      }
    } else if (this === this.parent.right && sibling.left.isBlack() && sibling.right.isRed()) {
      sibling.setRed();
      sibling.right.setBlack();
      let newRoot = sibling.rotateLeft();
      if (newRoot) {
        console.log('NEW ROOT', newRoot);
      }
    }
    return this.removeCase6();
  }

  removeCase6 () {
    let sibling = this.getSibling();
    sibling.color = this.parent.color;
    this.parent.setBlack();

    if (this === this.parent.left) {
      sibling.right.setBlack();
      return this.parent.rotateLeft();
    } else {
      sibling.left.setBlack();
      return this.parent.rotateRight();
    }
    return;
  }

  /**
   * Swap places in the tree for two nodes. This method will swap all values
   * in the node, except for values that reference other nodes in the tree (parent,
   * left, and right). The function returns what will be the equivalent `this`
   * which will be a different reference, but not the same value. The reason
   * we do this is because JavaScript. It's easier to switch the values than to
   * switch all 10 references (3 properties * 2 [parent/son] * 2 [this/node] - 2).
   *
   * @param {RedBlackTreeNode}
   * @return {RedBlackTreeNode}
   */
  transplant(parentTree, node) {
    if (this.parent === null) {
      parentTree.root = node;
    } else if (this === this.parent.left) {
      this.parent.left = node;
    } else if (this.parent.right) {
      this.parent.right = node;
    }
    node.parent = this.parent;
  }

  rotateLeft () {
    let y = this.right;
    let newRoot = null;
    this.right = y.left;
    this.right.parent = this;
    if (y.left !== null) {
      y.left.parent = this;
    }
    y.parent = this.parent;
    if (this.parent === null) {
      newRoot = y; // Set as root
    } else if (this === this.parent.left) {
      this.parent.left = y;
    } else {
      this.parent.right = y;
    }
    y.left = this;
    this.parent = y;
    return newRoot;
  }

  rotateRight () {
    let y = this.left;
    let newRoot = null;
    this.left = y.right;
    this.left.parent = this;
    if (y.right !== null) {
      y.right.parent = this;
    }
    y.parent = this.parent;
    if (this.parent === null) {
      newRoot = y; // Set as root
    } else if (this === this.parent.right) {
      this.parent.right = y;
    } else {
      this.parent.left = y;
    }
    y.right = this;
    this.parent = y;
    return newRoot;
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
    if (this.value !== null && this.left.value !== null) this.left.forEach(callback, level + 1);
    callback(this, level, getValue(this.left), getValue(this.right));
    if (this.value !== null && this.right.value !== null) this.right.forEach(callback, level + 1);
    return;
  }

  forEachWithNullNodes (callback, level = 0) {
    let getValue = (x) => (x === null) ? null : x.value;
    if (this.left !== null) this.left.forEachWithNullNodes(callback, level + 1);
    callback(this, level, getValue(this.left), getValue(this.right));
    if (this.right !== null) this.right.forEachWithNullNodes(callback, level + 1);
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
    this[method]((node) => {
      if (node.value !== null) values.push(node.value);
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
    callback(this, level, this.left, this.right);
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
    let nodes = {};
    let maxLevel = 0;
    this.forEachDepthFirst((node, level) => {
      if (nodes[level] === undefined) nodes[level] = [];
      nodes[level].push(node);
      maxLevel = Math.max(maxLevel, level);
    });
    for (let key = 0; key <= maxLevel; key += 1) {
      for (let i = 0; i < nodes[key].length; i += 1) {
        if (nodes[key][i].value !== null) {
          callback(nodes[key][i]);
        }
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
    if (this.value !== null && value < this.value && this.left instanceof this.constructor)
      return this.left.contains(value);
    if (this.value !== null && value > this.value && this.right instanceof this.constructor)
      return this.right.contains(value);
    return false;
  }

  /**
   * Get all values between two values
   *
   * @param {Number}
   * @param {Number}
   * @param {Array}
   * @return {Array}
   * @private
   */
  between (low, high, values) {
    let callIfNotNull = (side) => {
      if (this[side] !== null) return this[side].between(low, high, values);
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

  /**
   * Get the longest depth in the tree
   *
   * @return {Number}
   */
  getMaxDepth () {
    let getMaxDepth = (side) => {
      if (this[side].value === null) return 0;
      return this[side].getMaxDepth();
    };
    if (this === null || this.value === null) {
      return 1;
    }
    // Here we use `Math.max` because levels are always numbers
    return Math.max(...[ getMaxDepth('left') + 1, getMaxDepth('right') + 1 ]);
  }

  /**
   * Get the shortest depth in the tree
   *
   * @return {Number}
   */
  getMinDepth () {
    let getMinDepth = (side) => {
      if (this[side].value === null) return 0;
      return this[side].getMinDepth();
    };
    // Here we use `Math.min` because levels are always numbers
    return Math.min(...[ getMinDepth('left') + 1, getMinDepth('right') + 1 ]);
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

  getSibling () {
    if (this === this.parent.left) return this.parent.right;
    return this.parent.left;
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

  print (side, indentation = 0) {
    let parentValue = (this.getParent()) ? this.getParent().value : undefined;
    if (this.parent === null) console.log('-'.repeat(15));
    console.log(' -'.repeat(indentation), '#', this.id, ':', colors.green(this.value),
      '(', this.color , ') ',
      '[', parentValue, '] ',
      '{', ((side === 'left') ? colors.blue(side) : colors.magenta(side)), '}'
    );
    if (this.left !== null) this.left.print('left', indentation + 1);
    if (this.right !== null) this.right.print('right', indentation + 1);
  }

}

export default class RedBlackTree {

  constructor (value) {
    taser([TYPE, 'undefined'], value);
    this.root = null;
    if (value !== undefined) {
      this.root = new RedBlackTreeNode(value, 'black', null);
      root = this.root;
    }
  }

  insert (value) {
    taser([TYPE], value);
    if (this.root === null || this.root.value === null) {
      this.root = new RedBlackTreeNode(value, 'black', null);
      root = this.root;
      return true;
    }
    let newRoot = this.root.insert(value, 'red', this);
    if (newRoot instanceof RedBlackTreeNode) {
      this.root = newRoot;
      root = this.root;
    }
  }

  remove (value) {
    taser([TYPE], value);
    if (this.root === null) {
      return false;
    }
    let nodeToBeDeleted = this.root.find(value);
    return nodeToBeDeleted.remove(this);
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
    return this.root.forEach(node => callback(node.value), 0);
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
    return this.root.forEachDepthFirst(node => callback(node.value));
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
    return this.root.forEachBreadthFirst(node => callback(node.value));
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
    return this.root.between(low, high, []);
  }

  /**
   * Get the longest depth in the tree
   *
   * @return {Number}
   */
  getMaxDepth () {
    return this.root.getMaxDepth();
  }

  /**
   * Get the shortest depth in the tree
   *
   * @return {Number}
   */
  getMinDepth () {
    return this.root.getMinDepth();
  }

  print () {
    this.root.print(0);
  }

  validate () {
    let err = null;
    // 1. A node is either red or black
    this.root.forEachWithNullNodes((node) => {
      if (!node.isBlack() && !node.isRed())  {
        err = new Error('Property #1: All node should be red or black.');
      }
    });
    // 2. The root is always black
    if (!err && !this.root.isBlack()) {
      throw new Error('Property #2: Root should always be black');
    }
    // 3. All leaves (null) are black
    this.root.forEachWithNullNodes((node) => {
      if (!err && node.value === null && !node.isBlack()) {
        err = new Error('Property #3: All null nodes should be black');
      }
    });
    // 4. If a node is red, then both its children are black
    this.root.forEachWithNullNodes((node) => {
      if (!err && node.isRed() && (node.left.isRed() || node.right.isRed())) {
        err = new Error('Property #4: Red nodes should have two black children');
      }
    });
    // 5. All paths should have the same number of black nodes
    let numberOfBlacksNodes = null;
    // Very inefficient way of checking this...
    let getNumberOfBlackParents = (node, count) => {
      if (node.isBlack()) count += 1;
      if (node.parent !== null) return getNumberOfBlackParents(node.parent, count);
      return count;
    };
    this.root.forEachWithNullNodes((node) => {
      if (!err && node.value === null) {
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
    if (err !== null) {
      this.print();
      throw err;
    }
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
