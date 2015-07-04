import taser from 'taser';

let BinarySearchTree = class BinarySearchTree {

  constructor (value, parent) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert (value) {
    if (value < this.value) {
      if (this.left instanceof BinarySearchTree) return this.left.insert(value);
      this.left = new BinarySearchTree(value);
      return true;
    }
    if (value > this.value) {
      if (this.right instanceof BinarySearchTree) return this.right.insert(value);
      this.right = new BinarySearchTree(value);
      return true;
    }
    return false;
  }

  remove (value, parent, direction) {
    if (value === this.value) {
      // If node has no children, delete the node and return
      if (this.left === null && this.right === null) {
        delete parent[direction];
        return true;
      }
      // If node has 1 child, make that node the new node
      if (this.left === null || this.right === null) {
        if (this.left === null) parent[direction] = this.right;
        if (this.right === null) parent[direction] = this.left;
        return true;
      }
      /*!
       * A node having two children is the most complex scenario. Basically,
       * we're going to promote a node in the child binary trees to be the new
       * node representing this value
       */
      // Get depth for both sides
      let leftDepth = this.left.getDepth();
      let rightDepth = this.right.getDepth();
      // Get minimum of side with deepest depth
      // Make a new binary tree with that value
      // Remove the value from the sourceBinary Tree
      // Add both binary trees to new binary tree

    }
    if (value < this.value && this.left instanceof BinarySearchTree)
      return this.left.remove(value, this, 'left');
    if (value > this.value && this.right instanceof BinarySearchTree)
      return this.right.remove(value, this, 'right');
    return false;
  }

  contains (value) {
    if (value === this.value) return true;
    if (value < this.value && this.left instanceof BinarySearchTree)
      return this.left.contains(value);
    if (value > this.value && this.right instanceof BinarySearchTree)
      return this.right.contains(value);
    return false;
  }

  getValues () {
    let values = [];
    this.forEach((value)  => {
      values.push(value);
    });
    return values;
  }

  forEach (callback) {
    callback(this.value);
    if (this.left !== null) this.left.forEach(callback);
    if (this.right !== null) this.right.forEach(callback);
  }

  breadthFirstForEach () {

  }

  getMaxDepth () {
    let getMaxDepth = (side) => {
      if (this[side] === null) return 0;
      return this[side].getMaxDepth();
    };
    return Math.max.apply(null, [ getMaxDepth('left') + 1, getMaxDepth('right') + 1 ]);
  }

  getMinDepth () {

  }

  _rebalance () {

  }

};

export default BinarySearchTree;
