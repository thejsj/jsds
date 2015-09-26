import taser from 'taser';
import LinkedList from '../linked-list/linked-list.js';

const assertNotUndefined = function (value) {
  if (value === undefined) { // It would be nice if taser could take care of this
    throw new TypeError(`Values inserted into the linked list cannot be 'undefined'`);
  }
  return true;
};

const _entries_ = Symbol('entries');
const Queue = class Queue {

  constructor () {
    this[_entries_] = new LinkedList();
  }

  enqueue (val) {
    assertNotUndefined(val);
    this[_entries_].insert(val);
    return this[_entries_].length();
  }

  dequeue () {
    return this[_entries_].remove(0);
  }

  length() {
    return this[_entries_].length();
  }

  *[Symbol.iterator](){
    yield *this[_entries_].entries();
  }

  *entries(){
    yield *this[_entries_].entries();
  }

  *values(){
    yield *this[_entries_].values();
  }

  *keys(){
    yield *this[_entries_].keys();
  }

};

export default Queue;

