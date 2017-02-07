// import 'should'
const expect = require('chai').expect
const BinomialMinHeap = require('../../lib/heap/binomial-min-heap')

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

  })

  describe('Decrease Key', () => {

  })

  describe('Delete', () => {

  })
})
