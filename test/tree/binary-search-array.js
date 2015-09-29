/*global describe: true, it:true, beforeEach: true */
import should from 'should';
import BinarySearchArray from '../../lib/tree/binary-search-array';

describe('BinarySearchArray (binary tree implemented with an array)', () => {

  let biTree;

  beforeEach(() => {
    biTree = new BinarySearchArray();
  });

  describe('Add', () => {

    it('should throw an error when trying to add anything that\'s not a number', ()  => {
      biTree.add.bind(biTree, '2').should.throw();
      biTree.add.bind(biTree, [2]).should.throw();
      biTree.add.bind(biTree, { hello: 2 }).should.throw();
      biTree.add.bind(biTree, undefined).should.throw();
      biTree.add.bind(biTree, null).should.throw();
    });

    it('should add one element to the tree', () => {
      biTree.add(1);
      biTree.getValues().should.eql([1]);
    });

    it('should add two elements to the tree (Second one bigger)', () => {
      biTree.add(1);
      biTree.add(2);
      biTree.getValues().should.eql([1, 2]);
    });

    it('should add two elements to the tree (Second one smaller)', () => {
      biTree.add(1);
      biTree.add(0);
      biTree.getValues().should.eql([0, 1]);
    });

    it('should add elements to the tree', () => {
      biTree.add(1);
      biTree.add(2);
      biTree.add(3);
      biTree.add(4);
      biTree.add(5);
      biTree.getValues().should.eql([1, 2, 3, 4, 5]);
    });

    it('should return true or false if the element was added to the tree or not', () => {
      let inserted = biTree.add(1);
      let inserted2 = biTree.add(1);
      inserted.should.equal(true);
      inserted2.should.equal(false);
    });

  });

  describe('Remove', ()  => {

    it('should throw an error when trying to remove anything that\'s not a number', ()  => {
      biTree.remove.bind(biTree, '2').should.throw();
      biTree.remove.bind(biTree, [2]).should.throw();
      biTree.remove.bind(biTree, { hello: 2 }).should.throw();
      biTree.remove.bind(biTree, undefined).should.throw();
      biTree.remove.bind(biTree, null).should.throw();
    });

    it('should remove one element from the tree', () => {
      biTree.add(1);
      biTree.remove(1);
      biTree.getValues().should.eql([]);
    });

    it('should remove the first element from the tree', () => {
      biTree.add(1);
      biTree.add(2);
      biTree.remove(1);
      biTree.getValues().should.eql([2]);
    });

    it('should remove elements from the tree', () => {
      biTree.add(1);
      biTree.add(2);
      biTree.add(3);
      biTree.add(4);
      biTree.add(5);
      let removed1 = biTree.remove(4);
      let removed2 = biTree.remove(2);
      biTree.getValues().should.eql([1, 3, 5]);
    });

    it('should remove elements from the tree', () => {
      biTree.add(1);
      biTree.add(2);
      biTree.add(3);
      biTree.add(4);
      biTree.add(5);
      let removed1 = biTree.remove(4);
      let removed2 = biTree.remove(2);
      let removed3 = biTree.remove(2);
      let removed4 = biTree.remove(4);
      removed1.should.equal(true);
      removed2.should.equal(true);
      removed3.should.equal(false);
      removed4.should.equal(false);
    });

  });

  describe('Find', () => {

    it('should throw an error when trying to find anything that\'s not a number', ()  => {
      biTree.find.bind(biTree, '2').should.throw();
      biTree.find.bind(biTree, [2]).should.throw();
      biTree.find.bind(biTree, { hello: 2 }).should.throw();
      biTree.find.bind(biTree, undefined).should.throw();
      biTree.find.bind(biTree, null).should.throw();
    });

    it('should find elements in the tree', () => {
      biTree.add(0.5);
      biTree.add(1);
      biTree.add(1.5);
      biTree.add(2);
      biTree.add(2.5);
      biTree.add(3);
      biTree.add(3.5);
      biTree.add(4.5);
      biTree.find(1).should.equal(true);
      biTree.find(6).should.equal(false);
      biTree.find(0).should.equal(false);
      biTree.find(3).should.equal(true);
      biTree.find(3.1).should.equal(false);
    });
  });

  describe('Iterators', () => {

    it('should get all entries when using the default iterator', () => {
      biTree.add(0);
      biTree.add(2);
      biTree.add(4);
      [...biTree].should.eql([[0, 0], [1, 2], [2, 4]]);
    });

  });
});
