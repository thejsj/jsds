import should from 'should';
import { insertionSort, t } from '../../lib/sorts/insertion-sort.js';

describe('Insertion Sort', () => {

  let arr;

  beforeEach(() => {
    arr = [3, 6, 7, 1, 4, 8, 9, 2, 5];
  });

  it('should throw an error when trying to add anything that\'s not an array', ()  => {
    insertionSort.bind(insertionSort, '2').should.throw();
    insertionSort.bind(insertionSort, 2).should.throw();
    insertionSort.bind(insertionSort, { hello: 2 }).should.throw();
    insertionSort.bind(insertionSort, undefined).should.throw();
    insertionSort.bind(insertionSort, null).should.throw();
  });

  it('should sort an array', ()  => {
    insertionSort(arr).should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should log execution time', ()  => {
    console.log("Time:" + t.timers.insertionSort.parse(t.timers.insertionSort.duration()));
  });


});