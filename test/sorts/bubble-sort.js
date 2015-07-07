/*global describe: true, it:true */
import should from 'should';
import bubbleSort from '../../lib/sorts/bubble-sort';

describe('Bubble Sort', () => {

  it('should sort an array', ()  => {
    let arr = [3, 6, 7, 1, 4, 8, 9, 2, 5];
    bubbleSort(arr).should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  });

});