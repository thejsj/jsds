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
    // TODO: Simplify function
    if (value === this.value) {
      // If node has no children, delete the node and return
      if (this.left === null && this.right === null) {
        parent[direction] = null;
        return true;
      }
      // If node has 1 child, make that node the new node
      if (this.left === null || this.right === null) {
        if (this.left !== null) parent[direction] = this.left;
        if (this.right !== null) parent[direction] = this.right;
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
      biggerSide = ((leftDepth + rightDepth) <= 0) ? null : biggerSide;
      // Check if both children have no children
      if (biggerSide === null) {
        parent[direction] = this.left;
        parent[direction].right = this.right;
        return true;
      }
      // Get the min/max value for the biggerSide and remove it, so that it can
      // be set as the new value
      let minOrMax = (biggerSide === 'left') ? 'max' : 'min';
      let newNodeValue = Math[minOrMax].apply(null, this[biggerSide].getValues());
      this.remove(newNodeValue);
      this.value = newNodeValue;
      return true;
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
    this.forEach((value) => {
      values.push(value);
    });
    return values;
  }

  forEach (callback) {
    callback(this.value);
    if (this.left !== null) {
      //console.log('left', this, this.left);
      this.left.forEach(callback);
    }
    if (this.right !== null) {
      //console.log('right', this, this.right);
      this.right.forEach(callback);
    }
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
