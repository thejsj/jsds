/*global describe: true, it:true, beforeEach:true */
import should from 'should';
import BinarySearchTree from '../lib/binary-search-tree';

describe('BinarySearchTree', () => {

  let tree;
  let sortNumbers = function sortNumbers (a,b) {
    return a - b;
  };

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

  xdescribe('forEach (Breadth First)', ()  => {
    it('should traverse through values breadth first', () => {
      tree.insert(3);
      tree.insert(4);
      tree.insert(1);
      tree.insert(0);

      tree.insert(7);
      tree.insert(6);
      tree.insert(8);

      var values = [];
      tree.forEachBreadthFirst((value) => {
        values.push(value);
      });
      values.should.eql([5, 3, 7, 4, 1, 6, 8, 0]);
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

  describe('getMinDepth', ()  => {
    it('should get the min depth for a 1 node tree', () => {
      tree.getMinDepth().should.equal(1);
    });

    it('should get the min depth for a 7 node tree', () => {
      tree.insert(3);
      tree.insert(4);
      tree.insert(1);

      tree.insert(7);
      tree.insert(6);
      tree.insert(8);
      tree.insert(9);
      tree.getMinDepth().should.equal(3);
    });
  });

  describe('Remove', ()  => {
    it('should remove values with no children', () => {
      tree.insert(4);
      tree.insert(6);
      tree.remove(4);
      tree.getValues().sort().should.eql([5, 6]);
    });

    it('should remove values with 1 child', () => {
      tree.insert(4);
      tree.insert(2);
      tree.insert(6);
      tree.remove(4);
      tree.getValues().sort().should.eql([2, 5, 6]);
    });

    it('should remove values with 2 children', () => {
      /*            5
       *      3         6
       *   2    4
       */
      tree.insert(3);
      tree.insert(4);
      tree.insert(2);
      tree.insert(6);
      tree.remove(3);
      tree.getValues().sort().should.eql([2, 4, 5, 6]);
    });

    it('should remove values with 2 children and sub children', () => {
      /*           5
       *      1         6
       *   -1    3
       *       2  4
       */
      tree.insert(1);
      tree.insert(6);
      tree.insert(-1);
      tree.insert(3);
      tree.insert(2);
      tree.insert(4);
      tree.remove(1);
      tree.getValues().sort().should.eql([-1, 2, 3, 4, 5, 6]);
    });

    it('should remove the parent node', () => {
      tree.insert(4);
      tree.insert(6);
      tree.remove(5);
      tree.getValues().sort().should.eql([4, 6]);
    });

    it('should remove values with 3 children and sub children', () => {
      /*           5
       *      1                 9
       *                 7             11
       *              6    8        10    12
       */
      tree.insert(1);
      tree.insert(9);
      tree.insert(7);
      tree.insert(6);
      tree.insert(8);
      tree.insert(11);
      tree.insert(10);
      tree.insert(12);

      tree.remove(9);
      tree.getValues().sort(sortNumbers).should.eql([1, 5, 6, 7, 8, 10, 11, 12]);
    });
  });

  describe('Rebalancing', ()  => {

  });

});
