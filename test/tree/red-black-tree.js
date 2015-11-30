/*global describe: true, it:true, beforeEach:true, xdescribe:true, xit: true */
/*jshint -W030 */
import should from 'should';
import RedBlackTree from '../../lib/tree/red-black-tree';

describe('RedBlackTree', () => {

  let tree;
  let sortNumbers = function sortNumbers (a,b) {
    return a - b;
  };

  beforeEach(() => {
    tree = new RedBlackTree(5, 'black');
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
      tree.validate().should.equal(true);
      tree.insert(8);
      tree.validate().should.equal(true);
      tree.getValues().sort().should.eql([5, 2, 8].sort());
    });

    it('should insert values into the binary tree (10 values)', () => {
      tree.insert(2);
      tree.validate().should.equal(true);
      tree.insert(8);
      tree.validate().should.equal(true);
      tree.insert(1);
      tree.validate().should.equal(true);
      tree.insert(0);
      tree.validate().should.equal(true);
      tree.insert(7);
      tree.validate().should.equal(true);
      tree.insert(100);
      tree.validate().should.equal(true);
      tree.insert(4);
      tree.validate().should.equal(true);
      tree.insert(16);
      tree.validate().should.equal(true);
      tree.insert(3);
      tree.validate().should.equal(true);
      tree.getValues().sort().should.eql([0, 1, 2, 3, 4, 5, 7, 8, 16, 100].sort());
    });

    it('should insert values into the tree correctly', () => {
      tree.insert(3);
      tree.validate().should.equal(true);
      tree.insert(7);
      tree.validate().should.equal(true);
      tree.insert(1);
      tree.validate().should.equal(true);
      tree.insert(2);
      tree.validate().should.equal(true);
      tree.insert(6);
      tree.validate().should.equal(true);
      tree.insert(8);
      tree.validate().should.equal(true);
      tree.getValues().should.eql([1, 2, 3, 5, 6, 7, 8]);
    });

    it('should set the root when necessary', () => {
      tree.insert(6);
      tree.validate().should.equal(true);
      tree.insert(7);
      tree.validate().should.equal(true);
      tree.insert(1);
      tree.validate().should.equal(true);
      tree.insert(2);
      tree.validate().should.equal(true);
      tree.insert(3);
      tree.validate().should.equal(true);
      tree.insert(4);
      tree.validate().should.equal(true);
      tree.getValues().should.eql([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should insert ordered values and always be valid', () => {
      let numbers = [];
      for (let i = 0; i < 500; i += 1) {
        numbers.push(i);
        tree.insert(i);
        tree.validate().should.equal(true);
      }
      tree.getValues().should.eql(numbers.sort((a, b) => a - b));
    });

    it('should insert random values and always be valid', () => {
      let numbers = [5];
      for (let i = 0; i < 500; i += 1) {
        numbers.push(Math.random());
        tree.insert(numbers[numbers.length - 1]);
        tree.validate().should.equal(true);
      }
      tree.getValues().should.eql(numbers.sort((a, b) => a - b));
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

  describe('Between', () => {
    it('should get all values between 4 and 6', () => {
      tree.insert(3);
      tree.insert(4);
      tree.insert(7);
      tree.insert(6);
      tree.between(4, 7).should.eql([ 4, 5, 6 ]);
    });

    it('should get all values between 2 and 8 in a 3 level tree', () => {
      tree.insert(0);
      tree.insert(2);
      tree.insert(1);
      tree.insert(3);
      tree.insert(4);
      tree.insert(10);
      tree.insert(7);
      tree.insert(6);
      tree.insert(8);
      tree.insert(9);
      tree.between(2, 8).should.eql([ 2, 3, 4, 5, 6, 7 ]);
    });
  });

  describe('forEach (Sorted)', () => {
    it('should iterate over the values in the correct order (sorted)', () => {
      tree.insert(4);
      tree.insert(6);
      tree.getValues().should.eql([4, 5, 6]);
    });

    it('should iterate over the values in the correct order (3 levels) (sorted)', () => {
      tree.insert(2);
      tree.insert(8);
      tree.insert(1);
      tree.insert(3);
      tree.insert(4);
      tree.insert(9);
      tree.insert(7);
      tree.insert(6);
      tree.getValues().should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
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
      tree.insert(4);
      tree.insert(6);
      tree.insert(3);
      tree.insert(7);
      tree.getValuesDepthFirst().should.eql([5, 4, 3, 6, 7]);
    });

    it('should traverse through the values in the correct order with multiple branches (One child)', () => {
      /*!
       *        5
       *    3        7
       *      2   6     8
       */
      tree.insert(3);
      tree.insert(7);
      tree.insert(2);
      tree.insert(6);
      tree.insert(8);
      tree.getValuesDepthFirst().should.eql([5, 3, 2, 7, 6, 8]);
    });
  });

  describe('forEach (Breadth First)', ()  => {
    it('should traverse through values breadth first', () => {
      /*!
       *                 5
       *         4                6
       *     3                         7
       */
      tree.insert(4);
      tree.insert(6);
      tree.insert(3);
      tree.insert(7);

      var values = [];
      tree.forEachBreadthFirst((value) => {
        values.push(value);
      });
      values.should.eql([5, 4, 6, 3, 7]);
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
      tree.getMinDepth().should.equal(2);
      tree.getMaxDepth().should.equal(3);
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
      tree.getMinDepth().should.equal(2);
    });

    it('should get the min depth on a 5 node tree', () => {
      tree.insert(1);
      tree.insert(2);
      tree.insert(3);
      tree.insert(4);
      tree.getMinDepth().should.equal(2);
    });
  });

  describe.only('Remove', ()  => {
    it('should remove values in a tree with one children', () => {
      tree.insert(4);
      tree.remove(4);
      tree.validate().should.equal(true);
      tree.getValues().should.eql([5]);
    });

    it('should remove values with no children', () => {
      tree.insert(4);
      tree.insert(6);
      tree.remove(4);
      tree.validate().should.equal(true);
      tree.getValues().should.eql([5, 6]);
    });

    it('should remove values with 1 child', () => {
      tree.insert(4);
      tree.insert(2);
      tree.insert(6);
      tree.remove(4);
      tree.validate().should.equal(true);
      tree.getValues().should.eql([2, 5, 6]);
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
      tree.validate().should.equal(true);
      tree.remove(3);
      tree.validate().should.equal(true);
      tree.getValues().should.eql([2, 4, 5, 6]);
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
      tree.validate().should.equal(true);
      tree.remove(1);
      tree.validate().should.equal(true);
      tree.getValues().should.eql([-1, 2, 3, 4, 5, 6]);
    });

    it('should remove the parent node', () => {
      tree.insert(4);
      tree.insert(6);
      tree.validate().should.equal(true);
      tree.remove(5);
      tree.validate().should.equal(true);
      tree.getValues().should.eql([4, 6]);
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

      tree.validate().should.equal(true);
      tree.remove(9);
      tree.validate().should.equal(true);
      tree.getValues().should.eql([1, 5, 6, 7, 8, 10, 11, 12]);
    });

    xit('should insert and remove ordered values and always be valid', () => {
      let numbers = [];
      for (let i = 0; i < 500; i += 1) {
        numbers.push(i);
        tree.insert(i);
        tree.validate().should.equal(true);
      }
      tree.getValues().should.eql(numbers.sort((a, b) => a - b));
      for (let i = 0; i < 500; i += 1) {
        tree.remove(i);
        tree.validate().should.equal(true);
      }
      tree.getValues().should.eql([]);
    });

    xit('should insert random values and always be valid', () => {
      let numbers = [5];
      for (let i = 0; i < 500; i += 1) {
        numbers.push(Math.random());
        tree.insert(numbers[numbers.length - 1]);
        tree.validate().should.equal(true);
      }
      tree.getValues().should.eql(numbers.sort((a, b) => a - b));
    });

  });

});
