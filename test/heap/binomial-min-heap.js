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
      expect([...tree.entries()]).to.deep.equal([[20, 'hello']])
    })

    it('should insert two key/value pairs', () => {
      tree.insert(30, 'wow')
      expect([...tree.entries()]).to.deep.equal([[20, 'hello'], [30, 'wow']])
    })
  })

  describe('Find Minimum', () => {

  })

  describe('Merge', () => {

  })

  describe('Delete Minimum', () => {

  })

  describe('Decrease Key', () => {

  })

  describe('Delete', () => {

  })
})
