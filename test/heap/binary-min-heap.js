/*global describe: true, it:true, beforeEach:true */
import should from 'should';
import BinaryMinHeap from '../../lib/heap/binary-min-heap.js';

describe.only('BinaryMinHeap', () => {

  let binaryMinHeap;
  beforeEach(() => {
    binaryMinHeap = new BinaryMinHeap();
  });

  describe('Insert', () => {

    it('should insert a single value', () => {
      binaryMinHeap.insert(1);
      [...binaryMinHeap].should.eql([[0,1]]);
    });

    it('should insert multiple values and keep the min values at the top', () => {
      binaryMinHeap.insert(100);
      [...binaryMinHeap.values()][0].should.equal(100);
      binaryMinHeap.insert(10);
      [...binaryMinHeap.values()][0].should.equal(10);
      binaryMinHeap.insert(5);
      [...binaryMinHeap.values()][0].should.equal(5);
      binaryMinHeap.insert(7);
      [...binaryMinHeap.values()][0].should.equal(5);
      binaryMinHeap.insert(1);
      [...binaryMinHeap.values()][0].should.equal(1);
      binaryMinHeap.insert(2);
      [...binaryMinHeap.values()][0].should.equal(1);
    });

  });

});
