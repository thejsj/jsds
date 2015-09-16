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
    return this.next.get(nodesLeft - 1);
  }

  find (fn) {
    if (fn(this.value) === true) return this.value;
    if (this.next === null) return undefined; // Not found
    return this.next.find(fn);
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
      this[_length_] += 1;
      this[_endNode_] = newNode;
      return true;
    }
    // When index is specified
    if (this.length() < index) {
      throw new Error(`Value cannot be inserted at index '${index}'. Index does not exist.`);
    }
    let node = this._get(index - 1);
    let next = null;
    if (node.next) next = node.next;
    node.next = newNode;
    if (next !== null) newNode.next = next;
    this[_length_] += 1;
    return true;
  }

  remove (index) {
    assertNumberOrUndefined(index);
    if (index === undefined) index = this.length() - 1;
    // If there is only one node left
    if (index === 0 && this.length() === 1) {
      this[_startNode_] = null;
      this[_endNode_] = null;
      this[_length_] = 0;
      return true;
    }
    let queryIndex = index - 1;
    if (index < 1) queryIndex = 0;
    let node = this._get(queryIndex); // Get the parent node of the node we want to remove
    if (node === undefined || node.next === null) {
      throw new Error(`Value cannot be set at index '${index}'. Index does not exist.`);
    }
    let next = null;
    if (node.next !== null) {
      if (node.next.next !== null) next = node.next;
    }
    if (next === null) {
      node.next = null;
      this[_length_] -= 1;
      return true;
    }
    node.next = next;
    this[_length_] -= 1;
    return true;
  }

  _get (index) {
    return this[_startNode_].get(index);
  }

  get (index) {
    assertNumber(index);
    if (this[_startNode_] === null) return undefined;
    let node = this._get(index);
    if (node === undefined) return undefined;
    return node.value;
  }

  set (index, value) {
    assertNumber(index);
    assertNotUndefined(value);
    let node = this._get(index);
    if (node === undefined) {
      throw new Error(`Value cannot be set at index '${index}'. Index does not exist.`);
    }
    node.value = value;
    return true;
  }

  length () {
    return this[_length_];
  }

  contains (value) {
    assertNotUndefined(value);
    let findResult = this[_startNode_].find(nodeValue => nodeValue === value) !== undefined;
    return findResult;
  }

  find (fn) {
    assertFunction(fn);
    return this[_startNode_].find(fn);
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
