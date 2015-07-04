/*global describe: true, it:true, beforeEach:true */
import should from 'should';
import BinarySearchTree from '../lib/binary-search-tree';

describe('BinarySearchTree', () => {

  let tree;

  beforeEach(() => {
    tree = new BinarySearchTree(5);
  });

  describe('Init', ()  => {
    it('should have the relevant methods', () => {
      tree.insert.should.be.a.function;
      tree.remove.should.be.a.function;
      tree.contains.should.be.a.function;
      tree.getValues.should.be.a.function;
    });
  });

  describe('Insert', ()  => {
    it('should insert values into the binary tree (3 values)', () => {
      tree.insert(2);
      tree.insert(8);
      tree.getValues().sort().should.eql([5, 2, 8].sort());
    });

    it('should insert values into the binary tree (10 values)', () => {
      tree.insert(2);
      tree.insert(8);
      tree.insert(1);
      tree.insert(0);
      tree.insert(7);
      tree.insert(100);
      tree.insert(4);
      tree.insert(16);
      tree.insert(3);
      tree.getValues().sort().should.eql([0, 1, 2, 3, 4, 5, 7, 8, 16, 100].sort());
    });
  });

  describe('Contains', ()  => {
    it('should check if the tree contains a certain value', () => {
      tree.insert(2);
      tree.insert(8);
      tree.insert(1);
      tree.insert(0);
      tree.insert(7);
      tree.insert(100);
      tree.insert(4);
      tree.insert(16);
      tree.insert(3);
      tree.contains(200).should.equal(false);
      tree.contains(100).should.equal(true);
      tree.contains(7).should.equal(true);
      tree.contains(0).should.equal(true);
      tree.contains(6).should.equal(false);
    });
  });

  describe('forEach (Depth First)', () => {
    it('should traverse through the values in the correct order (One child)', () => {
      /*!
       *              5
       *          1
       *            2
       *              3
       *                4
       */
      tree.insert(1);
      tree.insert(2);
      tree.insert(3);
      tree.insert(4);
      tree.getValues().should.eql([5, 1, 2, 3, 4]);
    });

    it('should traverse through the values in the correct order (One child)', () => {
      /*!
       *        5
       *    3        7
       * 1    2   6     8
       */
      tree.insert(3);
      tree.insert(7);
      tree.insert(1);
      tree.insert(2);
      tree.insert(6);
      tree.insert(8);
      tree.getValues().should.eql([5, 3, 1, 2, 7, 6, 8]);
    });
  });

  describe('getMaxDepth', () => {
    it('should get the max depth on a 2 node tree', () => {
      tree.insert(4);
      tree.getMaxDepth().should.equal(2);
    });

    it('should get the max depth on a 5 node tree', () => {
      tree.insert(1);
      tree.insert(2);
      tree.insert(3);
      tree.insert(4);
      tree.getMaxDepth().should.equal(5);
    });
  });

  describe('Remove', ()  => {
    it('should remove values', () => {
      tree.insert(4);
      tree.insert(3);
      tree.insert(0);
      tree.insert(2);
      tree.remove(2);
      tree.remove(3);
      tree.getValues().sort().should.eql([0, 4, 5].sort());
    });
  });


  describe('Breadth First Traversal', ()  => {

  });

  describe('Rebalancing', ()  => {

  });

});
