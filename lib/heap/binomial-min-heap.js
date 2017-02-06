const _roots_ = Symbol('_roots_')
const _attemptMerge_ = Symbol('_attemptMerge_')

const BinomialHeapTree = class BinomialHeapTree {

  constructor (key, value) {
    this.key = key
    this.value = value
    this.children = []
    this.maxChildren = 0
  }

  getOrder () {
    return this.maxChildren
  }

  addSubTree (tree) {
    if (tree.getOrder() !== this.getOrder()) {
      throw new Error('Cannot add subtree of different order.')
    }
    this.children[tree.getOrder()] = tree
    this.maxChildren = tree.getOrder() + 1
  }

  validate () {
    // Key is lower than keys of all children
    const keys = this.children.map(x => x.key)
    if (Math.min.apply(null, keys) < this.key) {
      throw new Error('One of the keys of the parent is not set', { parentKey: this.key, keys })
    }
    // A binomial tree of order K whose chidlren are roots of a binomal tree of order
    // k-1, k-2...
    const k = this.getOrder()
    for (let i = 0; i < k; i += 1) {
      let childMax = this.children[i].getMaxChildren()
      if (childMax !== k) {
        throw new Error('Tree does not follow the binomial order', { k, childMax })
      }
    }
    if (this.children.length > 0) {
      return this.children.every(child => child.validate())
    }
    return true
  }

  getNumberOfNodes () {
    return this.children.reduce((total, x) => total + 1, 0) + 1
  }

  *[Symbol.iterator] () {
     yield *this.entries()
  }

  *entries () {
    yield [this.key, this.value]
    for (let child of this.children.values()) {
      yield *child.entries()
    }
  }

  *values () {
    yield this.value
    for (let child of this.children.values()) {
      yield *child.values()
    }
  }

  *keys () {
    yield this.key
    for (let child of this.children.values()) {
      yield *child.keys()
    }
  }
}

const BinomialMinHeap = class BinomialMinHeap {

  constructor (key, value) {
    this[_roots_] = {}
    if (key && value) {
      this.insert(key, value)
    }
  }

  merge (binomialHeap) {
    return
  }

  validate () {
    return Object.values(this[_roots_]).every(child => child.validate())
  }

  insert (key, value) {
    let newTree = new BinomialHeapTree(key, value)
    return this[_attemptMerge_](newTree)
  }

  [_attemptMerge_] (newTree) {
    if (!this[_roots_][newTree.getOrder()]) {
      this[_roots_][newTree.getOrder()] = newTree
      return
    }
    let prev = this[_roots_][newTree.getOrder()]
    // Delete this tree because we're assigning it somewhere else
    delete this[_roots_][newTree.getOrder()]
    if (prev.key <= newTree.key) {
      prev.addSubTree(newTree)
      return this[_attemptMerge_](prev)
    }
    newTree.addSubTree(prev)
    return this[_attemptMerge_](newTree)
  }

  findMin () {

  }

  deleteMin () {

  }

  decreaseKey (key, newKeyValue) {

  }

  delete (key) {

  }

  *[Symbol.iterator] () {
     yield *this.entries()
  }

  *entries () {
    for (let key of Object.keys(this[_roots_]).values()) {
      yield *this[_roots_][key].entries()
    }
  }

  *values () {
    for (let key of Object.keys(this[_roots_]).values()) {
      yield *this[_roots_][key].values()
    }
  }

  *keys () {
    for (let key of Object.keys(this[_roots_]).values()) {
      yield *this[_roots_][key].keys()
    }
  }
}

export default BinomialMinHeap
