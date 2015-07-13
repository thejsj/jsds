/*global describe: true, it:true, beforeEach:true */
import should from 'should';
import BinarySearchStringTree from '../../lib/tree/binary-search-string-tree';

describe('BinarySearchStringTree', () => {

  let tree;
  let sortNumbers = function sortNumbers (a,b) {
    return a - b;
  };

  beforeEach(() => {
    tree = new BinarySearchStringTree('j', { selfRebalance: false });
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

  describe('forEach (Sorted)', () => {
    it('should iterate over the values in the correct order (sorted)', () => {
      tree.insert('c');
      tree.insert('p');
      tree.insert('b');
      tree.getValues().should.eql(['b', 'c', 'j', 'p']);
    });

    it('should iterate over the values in the correct order (3 levels) (sorted)', () => {
      tree.insert('c');
      tree.insert('p');
      tree.insert('b');
      tree.insert('a');
      tree.insert('o');
      tree.insert('z');
      tree.insert('g');
      tree.insert('yano');
      tree.insert('d');
      tree.getValues().should.eql([ 'a', 'b', 'c', 'd', 'g', 'j', 'o', 'p', 'yano', 'z' ]);
    });
  });

  describe('forEach (Depth First)', () => {
    it('should traverse through the values in the correct order (One child)', () => {
      /*!
       *              j
       *          a
       *            b
       *              c
       *                d
       */
      tree.insert('a');
      tree.insert('b');
      tree.insert('c');
      tree.insert('d');
      tree.getValuesDepthFirst().should.eql(['j', 'a', 'b', 'c', 'd']);
    });

    it('should traverse through the values in the correct order (One child)', () => {
      /*!
       *        j
       *    c        o
       * a    b   n     p
       */
      tree.insert('c');
      tree.insert('o');
      tree.insert('a');
      tree.insert('b');
      tree.insert('n');
      tree.insert('p');
      tree.getValuesDepthFirst().should.eql(['j', 'c', 'a', 'b', 'o', 'n', 'p']);
    });
  });

  describe('forEach (Breadth First)', ()  => {
    it('should traverse through values breadth first', () => {
      /*!
       *                 j
       *         c                p
       *     b       d       o         q
       *  a
       */
      tree.insert('c');
      tree.insert('d');
      tree.insert('b');
      tree.insert('a');

      tree.insert('p');
      tree.insert('o');
      tree.insert('q');

      var values = [];
      tree.forEachBreadthFirst((value) => {
        values.push(value);
      });
      values.should.eql(['j', 'c', 'p', 'b', 'd', 'o', 'q', 'a']);
    });
  });

  describe('getMaxDepth', () => {
    it('should get the max depth on a 2 node tree', () => {
      tree.insert('a');
      tree.getMaxDepth().should.equal(2);
    });

    it('should get the max depth on a 5 node tree', () => {
      tree.insert('a');
      tree.insert('b');
      tree.insert('c');
      tree.insert('d');
      tree.getMinDepth().should.equal(1);
      tree.getMaxDepth().should.equal(5);
    });

  });

  describe('getMinDepth', ()  => {
    it('should get the min depth for a 1 node tree', () => {
      tree.getMinDepth().should.equal(1);
    });

    it('should get the min depth for a 7 node tree', () => {
      tree.insert('c');
      tree.insert('d');
      tree.insert('b');
      tree.insert('a');

      tree.insert('p');
      tree.insert('o');
      tree.insert('q');
      tree.getMinDepth().should.equal(3);
    });

    it('should get the min depth on a 5 node tree', () => {
      tree.insert('a');
      tree.insert('b');
      tree.insert('c');
      tree.insert('d');
      tree.getMinDepth().should.equal(1);
    });
  });

  describe('Remove', ()  => {
    it('should remove values with no children', () => {
      tree.insert('a');
      tree.insert('b');
      tree.remove('a');
      tree.getValues().should.eql(['b', 'j']);
    });

    it('should remove values with 1 child', () => {
      tree.insert('a');
      tree.insert('b');
      tree.insert('c');
      tree.remove('a');
      tree.getValues().should.eql(['b', 'c', 'j']);
    });

    it('should remove values with 2 children', () => {
      /*            j
       *      b         o
       *   a    c
       */
      tree.insert('b');
      tree.insert('a');
      tree.insert('c');
      tree.insert('o');
      tree.remove('b');
      tree.getValues().should.eql(['a', 'c', 'j', 'o']);
    });

    it('should remove values with 2 children and sub children', () => {
      /*           j
       *      b         o
       *   a     d
       *       c    f
       */
      tree.insert('b');
      tree.insert('o');
      tree.insert('a');
      tree.insert('d');
      tree.insert('c');
      tree.insert('f');
      tree.remove('b');
      tree.getValues().should.eql(['a', 'c', 'd', 'f', 'j', 'o']);
    });

    it('should remove the parent node', () => {
      tree.insert('a');
      tree.insert('z');
      tree.remove('j');
      tree.getValues().should.eql(['a', 'z']);
    });

    it('should remove values with 3 children and sub children', () => {
      /*           j
       *      a                 o
       *                 m             q
       *              l    n        p     r
       */
      tree.insert('a');
      tree.insert('o');
      tree.insert('m');
      tree.insert('q');
      tree.insert('l');
      tree.insert('n');
      tree.insert('p');
      tree.insert('r');

      tree.remove('o');
      tree.getValues().should.eql(['a', 'j', 'l', 'm', 'n', 'p', 'q', 'r']);
    });
  });

  describe('Rebalancing', ()  => {

    beforeEach(() => {
      // Enable automatic rebalancing
      tree = new BinarySearchStringTree('j');
    });

    it('should have all the same values after rebalancing', () => {
      tree.insert('e');
      tree.insert('d');
      tree.insert('b');
      tree.insert('a');
      tree._rebalance(); // Force rebalance. Private method. This might change.
      tree.getValues().should.eql(['a', 'b', 'd', 'e', 'j']);
    });

    it('should rebalance itself if maxDepth is 2x the minDepth', () => {
      tree.insert('d');
      tree.insert('f');
      tree.insert('c'); // Rebalance (c, d, f, d)
      tree.insert('b');
      tree.insert('a');
      tree.insert('e');
      /*!
       *        d
       *    b       f
       *  a   c   e   j
       */
      tree.getValuesDepthFirst().should.eql(['d', 'b', 'a', 'c', 'f', 'e', 'j']);
    });

  });

});
