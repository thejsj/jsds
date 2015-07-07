/*global describe: true, it:true */
import should from 'should';
import { bubbleSort, t } from '../../lib/sorts/bubble-sort';

describe('Bubble Sort', () => {

  let arr;

  beforeEach(() => {
    arr = [3, 6, 7, 1, 4, 8, 9, 2, 5];
  });

  it('should throw an error when trying to add anything that\'s not an array', ()  => {
    bubbleSort.bind(bubbleSort, '2').should.throw();
    bubbleSort.bind(bubbleSort, 2).should.throw();
    bubbleSort.bind(bubbleSort, { hello: 2 }).should.throw();
    bubbleSort.bind(bubbleSort, undefined).should.throw();
    bubbleSort.bind(bubbleSort, null).should.throw();
  });

  it('should sort an array', ()  => {
    let arr = [3, 6, 7, 1, 4, 8, 9, 2, 5];
    bubbleSort(arr).should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should log execution time', ()  => {
    console.log("Time:" + t.timers.bubbleSort.parse(t.timers.bubbleSort.duration()));
  });

});