import taser from 'taser';

const assertNumberOrUndefined = taser(['number', 'undefined']);

const _decreaseKey_= Symbol('decreaseKey');
const _delete_ = Symbol('delete');
const _siftUp_ = Symbol('siftUp');
const _siftDown_ = Symbol('siftDown');

const BinaryMinHeap = class BinaryMinHeap {

 constructor (value) {
    assertNumberOrUndefined(value);
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert (value) {
    assertNumberOrUndefined(value);
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

  [_siftUp_] () {

  }

  [_siftDown_] () {

  }
};

export default BinaryMinHeap;
