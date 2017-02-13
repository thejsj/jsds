/*global describe: true, it:true, beforeEach:true, xit:true */
import should from 'should';
import BinaryMaxHeap from '../../lib/heap/binary-max-heap.js';

describe('BinaryMaxHeap', () => {

  let binaryMaxHeap;
  beforeEach(() => {
    binaryMaxHeap = new BinaryMaxHeap();
  });

  describe('Insert', () => {

    it('should insert a single value', () => {
      binaryMaxHeap.insert(1);
      [...binaryMaxHeap.keys()].should.eql([1]);
    });

    it('should insert multiple values and keep the max values at the top', () => {
      binaryMaxHeap.insert(2);
      [...binaryMaxHeap.keys()][0].should.equal(2);
      binaryMaxHeap.insert(1);
      [...binaryMaxHeap.keys()][0].should.equal(2);
      binaryMaxHeap.insert(7);
      [...binaryMaxHeap.keys()][0].should.equal(7);
      binaryMaxHeap.insert(5);
      [...binaryMaxHeap.keys()][0].should.equal(7);
      binaryMaxHeap.insert(10);
      [...binaryMaxHeap.keys()][0].should.equal(10);
      binaryMaxHeap.insert(100);
      [...binaryMaxHeap.keys()][0].should.equal(100);
      [...binaryMaxHeap.keys()].sort().should.eql([1, 10, 100, 2, 5, 7]);
    });

    it('should return the inserted value', () => {
      binaryMaxHeap.insert(2).should.equal(2);
      binaryMaxHeap.insert(5).should.equal(5);
      binaryMaxHeap.insert(100).should.equal(100);
      binaryMaxHeap.insert(7).should.equal(7);
      binaryMaxHeap.insert(10).should.equal(10);
      binaryMaxHeap.insert(1).should.equal(1);
    });

    it('should handle duplicates', () => {
      binaryMaxHeap.insert(1, 0).should.equal(1);
      binaryMaxHeap.insert(1, 1).should.equal(1);
      binaryMaxHeap.insert(1, 2).should.equal(1);
      binaryMaxHeap.insert(1, 3).should.equal(1);
      binaryMaxHeap.insert(1, 4).should.equal(1);
      [...binaryMaxHeap.values()].sort().should.eql([0, 1, 2, 3, 4].sort());
    });

  });

  describe('Pop', () => {

    it('should pop a value from the heap', () => {
      binaryMaxHeap.insert(7);
      binaryMaxHeap.insert(1);
      binaryMaxHeap.insert(100);
      binaryMaxHeap.insert(10);
      binaryMaxHeap.insert(2);
      binaryMaxHeap.insert(5);
      [...binaryMaxHeap.keys()][0].should.equal(100);
      [...binaryMaxHeap.keys()].sort().should.eql([1, 10, 100, 2, 5, 7]);
      // Remove
      binaryMaxHeap.pop();
      [...binaryMaxHeap.keys()][0].should.equal(10);
      [...binaryMaxHeap.keys()].sort().should.eql([1, 10, 2, 5, 7]);
      binaryMaxHeap.pop();
      [...binaryMaxHeap.keys()][0].should.equal(7);
      [...binaryMaxHeap.keys()].sort().should.eql([1, 2, 5, 7]);
      binaryMaxHeap.pop();
      [...binaryMaxHeap.keys()][0].should.equal(5);
      [...binaryMaxHeap.keys()].sort().should.eql([1, 2, 5]);
      binaryMaxHeap.pop();
      [...binaryMaxHeap.keys()][0].should.equal(2);
      [...binaryMaxHeap.keys()].sort().should.eql([1, 2]);
    });

    it('should return the popped key', () => {
      binaryMaxHeap.insert(1);
      binaryMaxHeap.insert(7);
      binaryMaxHeap.insert(10);
      binaryMaxHeap.insert(5);
      binaryMaxHeap.insert(100);
      binaryMaxHeap.insert(2);
      [...binaryMaxHeap.keys()].sort().should.eql([1, 10, 100, 2, 5, 7]);
      // Remove
      binaryMaxHeap.pop().should.equal(100);
      binaryMaxHeap.pop().should.equal(10);
      binaryMaxHeap.pop().should.equal(7);
      binaryMaxHeap.pop().should.equal(5);
      [...binaryMaxHeap.keys()].sort().should.eql([1, 2]);
    });

    it('should return correctly pop and return the value of the entry', () => {
      let obj = { hello: 'world' };
      let arr = [1, 2, 3];
      binaryMaxHeap.insert(100, arr);
      binaryMaxHeap.insert(10, undefined);
      binaryMaxHeap.insert(5, obj);
      binaryMaxHeap.insert(7, 888);
      binaryMaxHeap.insert(2, 'hello');
      binaryMaxHeap.insert(1, true);
      [...binaryMaxHeap.keys()].sort().should.eql([1, 10, 100, 2, 5, 7]);
      // Remove
      binaryMaxHeap.popValue().should.equal(arr);
      (binaryMaxHeap.popValue() === undefined).should.equal(true);
      binaryMaxHeap.popValue().should.equal(obj);
      binaryMaxHeap.popValue().should.equal(888);
      [...binaryMaxHeap.keys()].sort().should.eql([1, 2]);
    });

  });

  describe('Associated Values', () => {

    it('should associate a value with a key', () => {
      let obj = { hello: 'world' };
      let arr = [1, 2, 3];
      binaryMaxHeap.insert(2, undefined);
      ([...binaryMaxHeap.values()][0] === undefined).should.equal(true);
      binaryMaxHeap.insert(1, true);
      ([...binaryMaxHeap.values()][0] === undefined).should.equal(true);
      binaryMaxHeap.insert(7, obj);
      [...binaryMaxHeap.values()][0].should.equal(obj);
      binaryMaxHeap.insert(5, 888);
      [...binaryMaxHeap.values()][0].should.equal(obj);
      binaryMaxHeap.insert(10, 'hello');
      [...binaryMaxHeap.values()][0].should.equal('hello');
      binaryMaxHeap.insert(100, arr);
      [...binaryMaxHeap.values()][0].should.equal(arr);
      [...binaryMaxHeap.keys()].sort().should.eql([1, 10, 100, 2, 5, 7]);
    });

  });

  describe('Basic Operations', () => {

    describe('size', () => {
      it('should correctly determine the size of the heap', () => {
        binaryMaxHeap.insert(0, true);
        binaryMaxHeap.insert(-1);
        binaryMaxHeap.insert(1);
        binaryMaxHeap.size().should.equal(3);
      });
    });

    describe('getMaxKey', () => {
      it('should correctly get max key', () => {
        let max = 100;
        for(let i; i < 100; i += 1) {
          let key = Math.random() * 200;
          max = Math.max(key, max);
          binaryMaxHeap.insert(key);
          binaryMaxHeap.getMaxKey().should.equal(max);
        }
      });
    });

    describe('getMaxValue', () => {
      it('should correctly get max value', () => {
        let max = 100;
        for(let i; i < 100; i += 1) {
          let key = Math.random() * 100;
          max = Math.max(key, max);
          binaryMaxHeap.insert(key, '--' + key + '--');
          binaryMaxHeap.getMaxValue().should.equal('--' + max + '--');
        }
      });
    });

  });

  describe('Iterators', () => {

    it('should get all the values in the heap in no particular order', () => {
       let func = function () {};
       binaryMaxHeap.insert(-100, true);
       binaryMaxHeap.insert(1.23423, false);
       binaryMaxHeap.insert(999999999999999, '8');
       binaryMaxHeap.insert(8, func);
       [...binaryMaxHeap.values()].sort().should.eql([true, false, '8', func].sort());
    });

    it('should get all the keys in the heap in no particular order', () => {
       let func = function () {};
       binaryMaxHeap.insert(-100, true);
       binaryMaxHeap.insert(1.23, false);
       binaryMaxHeap.insert(9999, '8');
       binaryMaxHeap.insert(8, func);
       [...binaryMaxHeap.keys()].sort().should.eql([-100, 1.23, 8, 9999].sort());
    });

    it('should get all the entries in the heap in no particular order', () => {
       let func = function () {};
       binaryMaxHeap.insert(-100, true);
       binaryMaxHeap.insert(1.23, false);
       binaryMaxHeap.insert(9999, '8');
       binaryMaxHeap.insert(8, func);
       let result = [[-100, true], [1.23, false], [9999, '8'], [8, func]];
       [...binaryMaxHeap.entries()].sort().should.eql(result.sort());
       [...binaryMaxHeap].sort().should.eql(result.sort());
    });
  });

});
