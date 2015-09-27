/*jshint mocha:true */
import Stack from '../../lib/stack/stack.js';
import should from 'should';

describe('Stack', () => {

  let stack;
  beforeEach(() => {
    stack = new Stack();
  });

  describe('push', () => {

    it('should stack values correctly', () => {
      stack.push(0);
      stack.push(1);
      stack.push(2);
      [...stack.values()].should.eql([2, 1, 0]);
      [...stack].should.eql([[0, 2], [1, 1], [2, 0]]);
    });

    it('should queue all types of values expect `undefined`', () => {
      stack.push(null);
      stack.push(true);
      stack.push(function () {
        return 4;
      });
      stack.push([3, 3]);
      stack.push({ pos: '2' });
      stack.push('1');
      stack.push(0);
      [...stack.values()].should.eql([0, '1', {pos: '2'}, [3, 3], function () { return 4; }, true, null]);
      [...stack.keys()].length.should.equal(7);
    });

    it('should throw an error when attempting to push a `undefined` value', () => {
      stack.push.bind(stack, undefined).should.throw();
    });

  });

  describe('pop', () => {

    it('should pop values correctly', () => {
      let obj = { pos: 2 };
      let arr = [3, 3];
      let func = function () {
        return 4;
      };
      stack.push(0);
      stack.push('1');
      stack.push(obj);
      stack.push(arr);
      stack.push(func);
      stack.push(true);
      stack.push(null);

      (stack.pop() === null).should.equal(true);
      stack.pop().should.equal(true);
      stack.pop()().should.equal(4);
      stack.pop().should.equal(arr);
      stack.pop().should.equal(obj);
      stack.pop().should.equal('1');
      stack.pop().should.equal(0);
    });

    it('should return undefined if there are no more values in the queue', () => {
      (stack.pop() === undefined).should.equal(true);
      stack.push(1);
      stack.pop().should.equal(1);
      (stack.pop() === undefined).should.equal(true);
    });

  });

  describe('Iterators', () => {

    // These are tested through the linked list
    it('iterators', () => {
      stack.push(4);
      stack.push(2);
      stack.push(0);
      [...stack].should.eql([[0,0], [1,2], [2,4]]);
      [...stack.entries()].should.eql([[0,0], [1,2], [2,4]]);
      [...stack.values()].should.eql([0, 2, 4]);
      [...stack.keys()].should.eql([0, 1, 2]);
    });

  });

});

