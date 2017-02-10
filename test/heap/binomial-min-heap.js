// import 'should'
const expect = require('chai').expect
const BinomialMinHeap = require('../../lib/heap/binomial-min-heap')
const BinomialHeapTree = require('../../lib/heap/binomial-min-heap').BinomialHeapTree

describe('Binomail Min Heap', () => {
  let tree

  beforeEach(() => {
    tree = new BinomialMinHeap(20, 'hello')
  })

  describe('Insert', () => {
    it('should insert one key/value pair', () => {
      expect(tree.validate()).to.equal(true)
      expect([...tree.entries()]).to.deep.equal([[20, 'hello']])
    })

    it('should insert two key/value pairs', () => {
      tree.insert(30, 'wow')
      expect(tree.validate()).to.equal(true)
      expect([...tree.entries()]).to.deep.equal([[20, 'hello'], [30, 'wow']])
    })

    it('should insert 20 key/value pairs', () => {
      let nums = [20]
      for (let i = 0; i < 20; i += 1) {
        let n = Math.random() * 100
        nums.push(n)
        tree.insert(n, 'wow')
        expect(tree.validate()).to.equal(true)
      }
      expect([...tree.keys()].sort()).to.deep.equal(nums.sort())
    })
  })

  describe('InsertTree', () => {
    it('should insert two key/value pairs', () => {
      let subTree = new BinomialHeapTree(30, 'wow')
      tree.insertTree(subTree)
      expect(tree.validate()).to.equal(true)
      expect([...tree.entries()]).to.deep.equal([[20, 'hello'], [30, 'wow']])
    })

    it('should insert 20 key/value pairs', () => {
      let nums = [20]
      for (let i = 0; i < 20; i += 1) {
        let n = Math.random() * 100
        nums.push(n)
        let subTree = new BinomialHeapTree(n, 'wow')
        tree.insertTree(subTree)
        expect(tree.validate()).to.equal(true)
      }
      expect([...tree.keys()].sort()).to.deep.equal(nums.sort())
    })
  })

  describe('Find Minimum', () => {
    it('should find the min with one key/value pair', () => {
      expect(tree.validate()).to.equal(true)
      expect(tree.findMin()).to.deep.equal([20, 'hello'])
    })

    it('should find the min with three key/value pairs', () => {
      expect(tree.validate()).to.equal(true)
      tree.insert(10, 'wow')
      expect(tree.validate()).to.equal(true)
      tree.insert(30, 'wow')
      expect(tree.peek()).to.deep.equal([10, 'wow'])
    })

    it('should find the min with 20 key/value pairs', () => {
      let min = [20]
      for (let i = 0; i < 20; i += 1) {
        let n = Math.floor(Math.random() * 1000)
        min = Math.min(n, min)
        expect(tree.validate()).to.equal(true)
        tree.insert(n, 'hello')
      }
      expect(tree.peek()).to.deep.equal([min, 'hello'])
    })
  })

  describe('Delete Minimum', () => {
    it('should delete the min one key/value pair', () => {
      expect(tree.validate()).to.equal(true)
      expect(tree.peek()).to.deep.equal([20, 'hello'])
      expect(tree.pop()).to.deep.equal([20, 'hello'])
      expect([...tree.keys()].sort()).to.deep.equal([])
    })

    it('should delete the min three key/value pairs', () => {
      expect(tree.validate()).to.equal(true)
      tree.insert(10, 'wow')
      expect(tree.validate()).to.equal(true)
      tree.insert(30, 'wow')
      expect(tree.peek()).to.deep.equal([10, 'wow'])
      expect(tree.pop()).to.deep.equal([10, 'wow'])
      expect([...tree.keys()].sort()).to.deep.equal([20, 30])
      expect(tree.pop()).to.deep.equal([20, 'hello'])
      expect([...tree.keys()].sort()).to.deep.equal([30])
    })

    it('should delete the min 20 key/value pairs', () => {
      let tree = new BinomialMinHeap()
      let nums = []
      for (let i = 20; i < 20; i += Math.floor(Math.random())) {
        nums.push(i)
        expect(tree.validate()).to.equal(true)
        tree.insert(i, 'hello')
      }
      for (let i = 0; i < nums.length; i += i) {
        expect(tree.pop()).to.deep.equal([i, 'hello'])
        nums.shift()
        expect([...tree.keys()].sort()).to.deep.equal(nums)
      }
    })
  })

  describe('Merge', () => {
    it('should merge two simple trees', () => {
      let tree1 = new BinomialMinHeap(1, 'hello')
      let tree2 = new BinomialMinHeap(2, 'wow')
      tree2.merge(tree1)
      tree2.validate()
    })

    it('should merge two trees with one child', () => {
      let tree1 = new BinomialMinHeap(1, 'hello')
      tree1.insert(5, 'great')
      let tree2 = new BinomialMinHeap(2, 'wow')
      tree2.insert(6, 'great')
      tree2.merge(tree1)
      tree2.validate()
    })

    it('should merge thress trees with different children', () => {
      let tree1 = new BinomialMinHeap(3, 'hello')
      tree1.insert(5, 'great')
      tree1.insert(0, 'no')
      let tree2 = new BinomialMinHeap(2, 'wow')
      tree2.insert(6, 'great')
      tree2.insert(1, 'great')
      let tree3 = new BinomialMinHeap(2, 'wow')
      tree3.insert(6, 'great')
      tree3.insert(7, 'great')
      tree2.merge(tree1)
      tree2.validate()
      tree2.merge(tree3)
      tree2.validate()
    })

    it('should merge many trees with many children', () => {
      let tree = new BinomialMinHeap()
      let keys = []
      for (let i = 0; i < 10; i += 1) {
        let newTree = new BinomialMinHeap()
        for (let ii = 0; ii <= 10; ii += 1) {
          keys.push(ii)
          newTree.insert(ii, 'ii-' + ii)
        }
        tree.merge(newTree)
        tree.validate()
      }
      expect([...tree.keys()].sort()).to.deep.equal(keys.sort())
    })
  })

  /**
   * This operation does not make much sense under the current API for this
   * heap because it requires a reference to the tree/node getting decreased
   * with references to its children and parent, which are all currently hidden
   * from the user. If the API for this is changed in order to force the `insert`
   * function to provide a tree and the reference to that tree is kept, then
   * this operation would be possible in O(log n)
   */
  xdescribe('Decrease Key', () => {})

  /**
   * This operation depends on the 'decrease key' method
   */
  describe('Delete', () => {})
})
