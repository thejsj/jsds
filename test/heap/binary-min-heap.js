/*global describe: true, it:true, beforeEach:true, xit:true */
import should from 'should';
import BinaryMinHeap from '../../lib/heap/binary-min-heap.js';

describe('BinaryMinHeap', () => {

  let binaryMinHeap;
  beforeEach(() => {
    binaryMinHeap = new BinaryMinHeap();
  });

  describe('Insert', () => {

    it('should insert a single value', () => {
      binaryMinHeap.insert(1);
      [...binaryMinHeap.keys()].should.eql([1]);
    });

    it('should insert multiple values and keep the min values at the top', () => {
      binaryMinHeap.insert(100);
      [...binaryMinHeap.keys()][0].should.equal(100);
      binaryMinHeap.insert(10);
      [...binaryMinHeap.keys()][0].should.equal(10);
      binaryMinHeap.insert(5);
      [...binaryMinHeap.keys()][0].should.equal(5);
      binaryMinHeap.insert(7);
      [...binaryMinHeap.keys()][0].should.equal(5);
      binaryMinHeap.insert(1);
      [...binaryMinHeap.keys()][0].should.equal(1);
      binaryMinHeap.insert(2);
      [...binaryMinHeap.keys()][0].should.equal(1);
      [...binaryMinHeap.keys()].sort().should.eql([1, 10, 100, 2, 5, 7]);
    });

    it('should return the inserted value', () => {
      binaryMinHeap.insert(100).should.equal(100);
      binaryMinHeap.insert(10).should.equal(10);
      binaryMinHeap.insert(5).should.equal(5);
      binaryMinHeap.insert(7).should.equal(7);
      binaryMinHeap.insert(1).should.equal(1);
      binaryMinHeap.insert(2).should.equal(2);
    });

    it('should handle duplicates', () => {
      binaryMinHeap.insert(1, 0).should.equal(1);
      binaryMinHeap.insert(1, 1).should.equal(1);
      binaryMinHeap.insert(1, 2).should.equal(1);
      binaryMinHeap.insert(1, 3).should.equal(1);
      binaryMinHeap.insert(1, 4).should.equal(1);
      [...binaryMinHeap.values()].sort().should.eql([0, 1, 2, 3, 4].sort());
    });

  });

  describe('Pop', () => {

    it('should pop a value from the heap', () => {
      binaryMinHeap.insert(100);
      binaryMinHeap.insert(10);
      binaryMinHeap.insert(5);
      binaryMinHeap.insert(7);
      binaryMinHeap.insert(1);
      binaryMinHeap.insert(2);
      [...binaryMinHeap.keys()][0].should.equal(1);
      [...binaryMinHeap.keys()].sort().should.eql([1, 10, 100, 2, 5, 7]);
      // Remove
      binaryMinHeap.pop();
      [...binaryMinHeap.keys()][0].should.equal(2);
      [...binaryMinHeap.keys()].sort().should.eql([10, 100, 2, 5, 7]);
      binaryMinHeap.pop();
      [...binaryMinHeap.keys()][0].should.equal(5);
      [...binaryMinHeap.keys()].sort().should.eql([10, 100, 5, 7]);
      binaryMinHeap.pop();
      [...binaryMinHeap.keys()][0].should.equal(7);
      [...binaryMinHeap.keys()].sort().should.eql([10, 100, 7]);
      binaryMinHeap.pop();
      [...binaryMinHeap.keys()][0].should.equal(10);
      [...binaryMinHeap.keys()].sort().should.eql([10, 100]);
    });

    it('should return the popped key', () => {
      binaryMinHeap.insert(100);
      binaryMinHeap.insert(10);
      binaryMinHeap.insert(5);
      binaryMinHeap.insert(7);
      binaryMinHeap.insert(1);
      binaryMinHeap.insert(2);
      [...binaryMinHeap.keys()].sort().should.eql([1, 10, 100, 2, 5, 7]);
      // Remove
      binaryMinHeap.pop().should.equal(1);
      binaryMinHeap.pop().should.equal(2);
      binaryMinHeap.pop().should.equal(5);
      binaryMinHeap.pop().should.equal(7);
      [...binaryMinHeap.keys()].sort().should.eql([10, 100]);
    });

    it('should return correctly pop and return the value of the entry', () => {
      let obj = { hello: 'world' };
      let arr = [1, 2, 3];
      binaryMinHeap.insert(100, true);
      binaryMinHeap.insert(10, 'hello');
      binaryMinHeap.insert(5, 888);
      binaryMinHeap.insert(7, obj);
      binaryMinHeap.insert(2, undefined);
      binaryMinHeap.insert(1, arr);
      [...binaryMinHeap.keys()].sort().should.eql([1, 10, 100, 2, 5, 7]);
      // Remove
      binaryMinHeap.popValue().should.equal(arr);
      (binaryMinHeap.popValue() === undefined).should.equal(true);
      binaryMinHeap.popValue().should.equal(888);
      binaryMinHeap.popValue().should.equal(obj);
      [...binaryMinHeap.keys()].sort().should.eql([10, 100]);
    });

  });

  describe('Associated Values', () => {

    it('should associate a value with a key', () => {
      let obj = { hello: 'world' };
      let arr = [1, 2, 3];
      binaryMinHeap.insert(100, true);
      [...binaryMinHeap.values()][0].should.equal(true);
      binaryMinHeap.insert(10, 'hello');
      [...binaryMinHeap.values()][0].should.equal('hello');
      binaryMinHeap.insert(7, obj);
      [...binaryMinHeap.values()][0].should.equal(obj);
      binaryMinHeap.insert(5, 888);
      [...binaryMinHeap.values()][0].should.equal(888);
      binaryMinHeap.insert(2, undefined);
      ([...binaryMinHeap.values()][0] === undefined).should.equal(true);
      binaryMinHeap.insert(1, arr);
      [...binaryMinHeap.values()][0].should.equal(arr);
      [...binaryMinHeap.keys()].sort().should.eql([1, 10, 100, 2, 5, 7]);
    });

  });

  describe('Basic Operations', () => {

    describe('size', () => {
      it('should correctly determine the size of the heap', () => {
        binaryMinHeap.insert(0, true);
        binaryMinHeap.insert(-1);
        binaryMinHeap.insert(1);
        binaryMinHeap.size().should.equal(3);
      });
    });

    describe('getMinKey', () => {
      it('should correctly get min key', () => {
        let min = -100;
        for(let i; i < 100; i += 1) {
          let key = Math.random();
          min = Math.min(key, min);
          binaryMinHeap.insert(key);
          binaryMinHeap.getMinKey().should.equal(min);
        }
      });
    });

    describe('getMinValue', () => {
      it('should correctly get min value', () => {
        let min = -100;
        for(let i; i < 100; i += 1) {
          let key = Math.random();
          min = Math.min(key, min);
          binaryMinHeap.insert(key, '--' + key + '--');
          binaryMinHeap.getMinValue().should.equal('--' + min + '--');
        }
      });
    });

  });

  describe('Iterators', () => {

    it('should get all the values in the heap in no particular order', () => {
       let func = function () {};
       binaryMinHeap.insert(-100, true);
       binaryMinHeap.insert(1.23423, false);
       binaryMinHeap.insert(999999999999999, '8');
       binaryMinHeap.insert(8, func);
       [...binaryMinHeap.values()].sort().should.eql([true, false, '8', func].sort());
    });

    it('should get all the keys in the heap in no particular order', () => {
       let func = function () {};
       binaryMinHeap.insert(-100, true);
       binaryMinHeap.insert(1.23, false);
       binaryMinHeap.insert(9999, '8');
       binaryMinHeap.insert(8, func);
       [...binaryMinHeap.keys()].sort().should.eql([-100, 1.23, 8, 9999].sort());
    });

    it('should get all the entries in the heap in no particular order', () => {
       let func = function () {};
       binaryMinHeap.insert(-100, true);
       binaryMinHeap.insert(1.23, false);
       binaryMinHeap.insert(9999, '8');
       binaryMinHeap.insert(8, func);
       let result = [[-100, true], [1.23, false], [9999, '8'], [8, func]];
       [...binaryMinHeap.entries()].sort().should.eql(result.sort());
       [...binaryMinHeap].sort().should.eql(result.sort());
    });
  });

});
