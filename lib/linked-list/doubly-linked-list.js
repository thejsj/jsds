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

  constructor (value, prev) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }

  get (nodesLeft) {
    if (nodesLeft === 0) return this;
    if (this.next === null) return undefined; // Not found
    return this.next.get(nodesLeft - 1);
  }

  find (fn, index) {
    if (fn(this.value) === true) return [index, this.value];
    if (this.next === null) return [null, undefined]; // Not found
    return this.next.find(fn, index + 1);
  }

};

const _startNode_ = Symbol('startNode');
const _endNode_ = Symbol('startNode');
const _length_ = Symbol('length');
const _iterator_ = Symbol('iterator');

const DoublyLinkedList = class DoublyLinkedList {

  constructor () {
    this[_startNode_] = null;
    this[_endNode_] = null;
    this[_length_] = 0;
  }


  /*!
   * Insert a value into the linked list. Optionally pass and index at which the 
   * value will be inserted.
   *
   * @param {String, Number, Array, Object, null}
   * @param {Number, undefined}
   * @returns {Boolean}
   */
  insert (value, index) {
    assertNotUndefined(value);
    assertNumberOrUndefined(index);
  }

  /*!
   * Remove a value from the list. If no index is passed, delete the last element.
   *
   * @param {Number, undefined}
   * @returns {Boolean}
   */
  remove (index) {
    assertNumberOrUndefined(index);
  }

  _get (index) {
    return this[_startNode_].get(index);
  }

  /*!
   * Get the value for an entry in the list, given the index of the element.
   * Returns undefined if not value is defined at that index.
   *
   * @param {Number}
   * @returns {String, Number, Boolean, Object, Array, null}
   */
  get (index) {
    assertNumber(index);
    if (this[_startNode_] === null) return undefined;
    let node = this._get(index);
    if (node === undefined) return undefined;
    return node.value;
  }

  /*!
   * Set the value of an element at a particular index
   *
   * @param {Number}
   * @param {Not Undefined}
   * @return {Boolean}
   */
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

  /*!
   * Get the length of the list
   *
   * @returns {Number}
   */
  length () {
    return this[_length_];
  }

  /*!
   * Check whether the list contains a particular value
   *
   * @return {Boolean}
   */
  contains (value) {
    assertNotUndefined(value);
    return this[_startNode_].find(nodeValue => nodeValue === value)[1] !== undefined;
  }

  /*!
   * Find a value in the list, through a function
   *
   * @param {Function}
   * @return {Not Undefined}
   */
  find (fn) {
    assertFunction(fn);
    return this[_startNode_].find(fn)[1];
  }

  /*!
   * Find a value in the list and get its index, through a function
   *
   * @param {Function}
   * @return {Number}
   */
  findByIndex (fn) {
    assertFunction(fn);
    return this[_startNode_].find(fn)[0];
  }

  *[_iterator_](indexOrValue){
    function* recurse (node, index) {
      if (indexOrValue === undefined) yield [index, node.value];
      if (indexOrValue === 'value') yield node.value;
      if (indexOrValue === 'index') yield index;
      if (node.next !== null) yield *recurse(node.next, index + 1);
    }
    if (this[_startNode_] !== null) {
      yield *recurse(this[_startNode_], 0);
    }
  }

  /*!
   * Iterator through all values and indexes
   *
   * @yield {Array}
   */
  *[Symbol.iterator](){
    yield *this[_iterator_]();
  }

  /*!
   * Iterator through all values and indexes in the list
   *
   * @yield {Array}
   */
  *entries(){
    yield *this[_iterator_]();
  }

  /*!
   * Iterator through all values in the list
   *
   * @yield {NotUndefined}
   */
  *values(){
    yield *this[_iterator_]('value');
  }

  /*!
   * Iterator through all indexes in the list
   *
   * @yield {Number}
   */
  *keys(){
    yield *this[_iterator_]('index');
  }

};

export default DoublyLinkedList;
