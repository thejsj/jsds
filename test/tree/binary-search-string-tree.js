/*global describe: true, it:true, beforeEach:true */
import should from 'should';
import BinarySearchStringTree from '../../lib/tree/binary-search-string-tree';

describe('BinarySearchStringTree', () => {

  let tree;
  let sortNumbers = function sortNumbers (a,b) {
    return a - b;
  };

  beforeEach(() => {
    tree = new BinarySearchStringTree("j", undefined, { selfRebalance: false });
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
      tree.insert('a');
      tree.insert('z');
      tree.getValues().sort().should.eql(['a', 'j', 'z'].sort());
    });

    it('should insert values into the binary tree (10 values)', () => {
      tree.insert('c');
      tree.insert('p');
      tree.insert('b');
      tree.insert('a');
      tree.insert('o');
      tree.insert('z');
      tree.insert('g');
      tree.insert('y');
      tree.insert('d');
      tree.insert('do it');
      tree.getValues().sort().should.eql(['a', 'b', 'c', 'd', 'do it', 'g', 'j', 'o', 'p', 'y', 'z'].sort());
    });
  });

  describe('Contains', ()  => {
    it('should check if the tree contains a certain value', () => {
      tree.insert('c');
      tree.insert('p');
      tree.insert('b');
      tree.insert('a');
      tree.insert('o');
      tree.insert('z');
      tree.insert('g');
      tree.insert('yano');
      tree.insert('d');
      tree.contains('e').should.equal(false);
      tree.contains('yano').should.equal(true);
      tree.contains('b').should.equal(true);
      tree.contains('o').should.equal(true);
      tree.contains('0').should.equal(false);
    });
  });

  describe('Between', () => {
    it('should get all values between "c" and "z"', () => {
      tree.insert('c');
      tree.insert('p');
      tree.insert('b');
      tree.insert('a');
      tree.between('c', 'z').should.eql([ 'c', 'j', 'p']);
    });

    it('should get all values between "c" and "yb" in a 3 level tree', () => {
      tree.insert('c');
      tree.insert('p');
      tree.insert('b');
      tree.insert('a');
      tree.insert('o');
      tree.insert('z');
      tree.insert('g');
      tree.insert('yano');
      tree.insert('d');
      tree.between('c', 'yb').should.eql([ 'c', 'd', 'g', 'j', 'o', 'p', 'yano' ]);
    });
  });

  xdescribe('forEach (Sorted)', () => {
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

  xdescribe('forEach (Depth First)', () => {
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
      tree.getValuesDepthFirst().should.eql([5, 1, 2, 3, 4]);
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
      tree.getValuesDepthFirst().should.eql([5, 3, 1, 2, 7, 6, 8]);
    });
  });

  xdescribe('forEach (Breadth First)', ()  => {
    it('should traverse through values breadth first', () => {
      /*!
       *                 5
       *         3                7
       *     1       4       6         8
       *  0
       */
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
      values.should.eql([5, 3, 7, 1, 4, 6, 8, 0]);
    });
  });

  xdescribe('getMaxDepth', () => {
    it('should get the max depth on a 2 node tree', () => {
      tree.insert(4);
      tree.getMaxDepth().should.equal(2);
    });

    it('should get the max depth on a 5 node tree', () => {
      tree.insert(1);
      tree.insert(2);
      tree.insert(3);
      tree.insert(4);
      tree.getMinDepth().should.equal(1);
      tree.getMaxDepth().should.equal(5);
    });

  });

  xdescribe('getMinDepth', ()  => {
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

    it('should get the min depth on a 5 node tree', () => {
      tree.insert(1);
      tree.insert(2);
      tree.insert(3);
      tree.insert(4);
      tree.getMinDepth().should.equal(1);
    });
  });

  xdescribe('Remove', ()  => {
    it('should remove values with no children', () => {
      tree.insert(4);
      tree.insert(6);
      tree.remove(4);
      tree.getValues().should.eql([5, 6]);
    });

    it('should remove values with 1 child', () => {
      tree.insert(4);
      tree.insert(2);
      tree.insert(6);
      tree.remove(4);
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
      tree.remove(3);
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
      tree.remove(1);
      tree.getValues().should.eql([-1, 2, 3, 4, 5, 6]);
    });

    it('should remove the parent node', () => {
      tree.insert(4);
      tree.insert(6);
      tree.remove(5);
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

      tree.remove(9);
      tree.getValues().should.eql([1, 5, 6, 7, 8, 10, 11, 12]);
    });
  });

  xdescribe('Rebalancing', ()  => {

    beforeEach(() => {
      // Enable automatic rebalancing
      tree = new BinarySearchStringTree(5);
    });

    it('should have all the same values after rebalancing', () => {
      tree.insert(4);
      tree.insert(3);
      tree.insert(2);
      tree.insert(1);
      tree._rebalance(); // Force rebalance. Private method. This might change.
      tree.getValues().should.eql([1, 2, 3, 4, 5]);
    });

    it('should rebalance itself if maxDepth is 2x the minDepth', () => {
      tree.insert(4);
      tree.insert(6);
      tree.insert(3); // Rebalance (4, 3, 5)
      tree.insert(2);
      tree.insert(1);
      tree.insert(5);
      tree.insert(7);
      /*!
       *        4
       *    2       6
       *  1   3   5   7
       */
      tree.getValuesDepthFirst().should.eql([4, 2, 1, 3, 6, 5, 7]);
    });

  });

});
