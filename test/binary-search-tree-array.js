require('should');

let BinarySearchTreeArray = require('../lib/binary-search-tree-array');

describe('Binary search tree (implemented with an array)', () => {

  let biTree = new BinarySearchTreeArray();

  it('should add elements to the tree', () => {
    biTree.add(1);
    biTree.add(2);
    biTree.add(3);
    biTree.add(4);
    biTree.add(5);
    biTree.values.should.eql([1, 2, 3, 4, 5]);
  });

  xit('should remove elements from the tree', () => {
    biTree.remove(4);
    biTree.remove(2);
    biTree.values.should.eql([1, 3, 5]);
  });

  xit('should find elements in the tree', () => {
    biTree.add(0.5);
    biTree.add(1.5);
    biTree.add(2);
    biTree.add(2.5);
    biTree.add(3.5);
    biTree.add(4.5);
    biTree.find(1).should.equal(true);
    biTree.find(6).should.equal(false);
    biTree.find(0).should.equal(false);
    biTree.find(3).should.equal(true);
    biTree.find(3.1).should.equal(false);
  });

});
