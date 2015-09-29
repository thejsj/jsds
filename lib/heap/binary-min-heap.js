import taser from 'taser';

const assertNumberOrUndefined = taser(['number', 'undefined']);

const _values_ = Symbol('values');
const _getParentIndex_ = Symbol('getParentIndex');
const _getLeftChildIndex_ = Symbol('getLeftChildIndex');
const _getRightChildIndex_ = Symbol('getRightChildIndex');
const _decreaseKey_= Symbol('decreaseKey');
const _delete_ = Symbol('delete');
const _siftUp_ = Symbol('siftUp');
const _siftDown_ = Symbol('siftDown');

const BinaryMinHeap = class BinaryMinHeap {

 constructor (value) {
    assertNumberOrUndefined(value);
    this[_values_] = [];
  }

  [_getParentIndex_] (index) {
    return (index - 1) / 2;
  }

  [_getLeftChildIndex_] (index) {
    return 2 * index + 1;
  }

  [_getRightChildIndex_] (index) {
    return 2 * index + 2;
  }

  insert (value) {
    assertNumberOrUndefined(value);
    this[_values_].push(value);
    console.log(this[_values_]);
    let swapParentAndChild = (index) => {
      if (index === 0) return true;
      console.log('swapParentAndChild', index);
      let parentIndex = this[_getParentIndex_](index);
      let parentValue = this[_values_][parentIndex];
      // If heap is unordered
      console.log('parentValue', parentValue);
      console.log('value', this[_values_][index]);
      if (this[_values_][index] < parentValue) { // Min goes on top
        let leftIndex = this[_getLeftChildIndex_](parentIndex);
        let rightIndex = this[_getRightChildIndex_](parentIndex);
        let leftValue = this[_values_][leftIndex];
        let rightValue = this[_values_][rightIndex];
        if (leftValue !== undefined && rightValue !== undefined) {
          if (leftValue < rightValue) { // Min goes on top
            return this[_siftUp_](leftIndex);
          } else {
            return this[_siftUp_](rightIndex);
          }
        }
        if (leftValue !== undefined && rightValue === undefined) {
          return this[_siftUp_](leftIndex);
        }
        return true;
      }
      return true;
    };
    return swapParentAndChild(this[_values_].length - 1);
  }

  pop () {
  }

  remove (value) {
    assertNumberOrUndefined(value);
  }

  contains (value) {
    assertNumberOrUndefined(value);
  }

  getMin () {
  }

  peek () {
  }

  replace (value) {
    assertNumberOrUndefined(value);
  }

  size () {
  }

  [_decreaseKey_] () {

  }

  [_siftUp_] (index) {
    console.log('_siftUp_', index);
    let parentIndex = this[_getParentIndex_](index);
    let parentValue = this[_values_][parentIndex];
    let childValue = this[_values_][index];
    this[_values_][parentIndex] = childValue;
    this[_values_][index] = childValue;
  }

  [_siftDown_] () {

  }

  *[Symbol.iterator] () {
     yield *this[_values_].entries();
  }

  *entries () {
     yield *this[_values_].entries();
  }

  *values () {
     yield *this[_values_].values();
  }

  *keys () {
     yield *this[_values_].keys();
  }
};

export default BinaryMinHeap;
