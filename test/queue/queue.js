/*jshint mocha:true */
import Queue from '../../lib/queue/queue.js';
import should from 'should';

describe('Queue', () => {

  let queue;
  beforeEach(() => {
    queue = new Queue();
  });

  describe('queue', () => {

    it('should queue values correctly', () => {
      queue.enqueue(0);
      queue.enqueue(1);
      queue.enqueue(2);
      [...queue.values()].should.eql([0, 1, 2]);
      [...queue].should.eql([[0, 0], [1, 1], [2, 2]]);
    });

    it('should queue all types of values expect `undefined`', () => {
      queue.enqueue(0);
      queue.enqueue('1');
      queue.enqueue({ pos: '2' });
      queue.enqueue([3, 3]);
      queue.enqueue(function () {
        return 4;
      });
      queue.enqueue(true);
      queue.enqueue(null);
      [...queue.values()].should.eql([0, '1', {pos: '2'}, [3, 3], function () { return 4; }, true, null]);
      [...queue.keys()].length.should.equal(7);
    });

    it('should throw an error when attempting to enqueue a `undefined` value', () => {
      queue.enqueue.bind(queue, undefined).should.throw();
    });

  });

  describe('dequeue', () => {

    it('should dequeue values correctly', () => {
      let obj = { pos: 2 };
      let arr = [3, 3];
      let func = function () {
        return 4;
      };
      queue.enqueue(0);
      queue.enqueue('1');
      queue.enqueue(obj);
      queue.enqueue(arr);
      queue.enqueue(func);
      queue.enqueue(true);
      queue.enqueue(null);
      queue.dequeue().should.equal(0);
      queue.dequeue().should.equal('1');
      queue.dequeue().should.equal(obj);
      queue.dequeue().should.equal(arr);
      queue.dequeue()().should.equal(4);
      queue.dequeue().should.equal(true);
      (queue.dequeue() === null).should.equal(true);
    });

    it('should return undefined if there are no more values in the queue', () => {
      (queue.dequeue() === undefined).should.equal(true);
      queue.enqueue(1);
      queue.dequeue().should.equal(1);
      (queue.dequeue() === undefined).should.equal(true);
    });

  });

  describe('Iterators', () => {

    // These are tested through the linked list
    it('iterators', () => {
      queue.enqueue(0);
      queue.enqueue(2);
      queue.enqueue(4);
      [...queue].should.eql([[0,0], [1,2], [2,4]]);
      [...queue.entries()].should.eql([[0,0], [1,2], [2,4]]);
      [...queue.values()].should.eql([0, 2, 4]);
      [...queue.keys()].should.eql([0, 1, 2]);
    });

  });

});

