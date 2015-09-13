import taser from 'taser';

const assertNumberOrUndefined = taser(['number', 'undefined']);
const assertNumber = taser(['number']);
const assertFunction = taser(['function']);
const assertNotUndefined = function (value) {
  if (value === undefined) { // It would be nice if taser could take care of this
    throw new TypeError(`Values inserted into the linked list cannot be 'undefined'`);
  }
  return true;
};

const LinkedListNode = class LinkedListNode {

  constructor (value) {
    this.value = value;
    this.next = null;
  }

  get (nodesLeft) {
    if (nodesLeft === 0) return this;
    if (this.next === null) return undefined; // Not found
    this.next.get(nodesLeft - 1);
  }

  find (fn) {
    if (fn(this.value) === true) return this.value;
    if (this.next === null) return undefined; // Not found
    this.next.find(fn);
  }

};

const _startNode_ = Symbol('startNode');
const _endNode_ = Symbol('startNode');
const _length_ = Symbol('length');

const LinkedList = class LinkedList {

  constructor () {
    this[_startNode_] = null;
    this[_endNode_] = null;
    this[_length_] = 0;
  }

  insert (value, index) {
    assertNotUndefined(value);
    assertNumberOrUndefined(index);
    let newNode = new LinkedListNode(value);
    if (index === undefined) { // Add it at the end
      if (this[_startNode_] === null && this[_endNode_] === null) {
        this[_startNode_] = newNode;
      } else {
        this[_endNode_].next = newNode;
      }
      return true;
    }
    // When index is specified
    let node = this.get(index);
    if (node === undefined) {
      throw new Error(`Value cannot be inserted at index '${index}'. Index does not exist.`);
    }
    let next = null;
    if (node.next) next = node.next;
    node.next = newNode;
    if (next !== null) newNode.next = next;
    return true;
  }

  remove (index) {
    assertNumber(index);
    let node = this.get(index - 1);
    if (node === undefined) {
      throw new Error(`Value cannot be set at index '${index}'. Index does not exist.`);
    }
    let next = null;
    if (node.next !== null) {
      if (node.next.next !== null) next = node.next;
   }
    if (next === null) {
      node.next = null;
      return true;
    }
    node.next = next;
    return true;
  }

  get (index) {
    assertNumber(index);
    return this[_startNode_].get(index);
  }

  contains (value) {
    assertNotUndefined(value);
    return this[_startNode_].find(nodeValue => value === nodeValue) !== undefined;
  }

  find (fn) {
    assertFunction(fn);
    return this[_startNode_].find(fn);
  }

  setValue (index, value) {
    assertNumber(index);
    assertNotUndefined(value);
    let node = this.get(index);
    if (node === undefined) {
      throw new Error(`Value cannot be set at index '${index}'. Index does not exist.`);
    }
    node.value = value;
    return true;
  }

  length () {
    return this[_length_];
  }

  *[Symbol.iterator](){
    function* recurse (node) {
      yield node.value;
      if (node.next !== null) yield *recurse(node.next);
    }
    if (this[_startNode_] !== null) {
      yield *recurse(this[_startNode_]);
    }
  }

};

export default LinkedList;
