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

  getDesc (nodesLeft) {
    if (nodesLeft === 0) return this;
    if (this.prev === null) return undefined; // Not found
    return this.prev.get(nodesLeft - 1);
  }

  find (fn, index) {
    if (fn(this.value) === true) return [index, this.value];
    if (this.next === null) return [null, undefined]; // Not found
    return this.next.find(fn, index + 1);
  }

};

const _head_ = Symbol('head');
const _tail_ = Symbol('head');
const _length_ = Symbol('length');
const _get_ = Symbol('get');
const _getDesc_ = Symbol('getDesc');
const _iterator_ = Symbol('iterator');
const _iteratorDesc_ = Symbol('iteratorDesc');

const DoublyLinkedList = class DoublyLinkedList {

  constructor () {
    this[_head_] = null;
    this[_tail_] = null;
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
    // TODO: Add insert logic
  }

  /*!
   * Remove a value from the list. If no index is passed, delete the last element.
   *
   * @param {Number, undefined}
   * @returns {Boolean}
   */
  remove (index) {
    assertNumberOrUndefined(index);
    // TODO: Add remove logic
  }

  [_get_] (index) {
    return this[_head_].get(index);
  }

  [_getDesc_] (index) {
    // NOTE: index needs to be inveresed
    return this[_tail_].getDesc(index);
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
    // TODO: Accommodate for indexes that are close to the tail
    if (this[_head_] === null) return undefined;
    let node = this[_get_](index);
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
    let node = this[_get_](index);
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
    return this[_head_].find(nodeValue => nodeValue === value)[1] !== undefined;
  }

  /*!
   * Find a value in the list, through a function
   *
   * @param {Function}
   * @return {Not Undefined}
   */
  find (fn) {
    assertFunction(fn);
    return this[_head_].find(fn)[1];
  }

  /*!
   * Find a value in the list through a function, starting at the end of the list
   *
   * @param {Function}
   * @return {Not Undefined}
   */
  findLast (fn) {
    assertFunction(fn);
    return this[_tail_].findLast(fn)[1];
  }

  /*!
   * Find a value in the list and get its index through a function, starting at the end of the list
   *
   * @param {Function}
   * @return {Number}
   */
  findLastByIndex (fn) {
    assertFunction(fn);
    return this[_tail_].findLast(fn)[0];
  }

  /*!
   * Find a value in the list and get its index, through a function
   *
   * @param {Function}
   * @return {Number}
   */
  findByIndex (fn) {
    assertFunction(fn);
    return this[_head_].find(fn)[0];
  }

  *[_iterator_](indexOrValue){
    function* recurse (node, index) {
      if (indexOrValue === undefined) yield [index, node.value];
      if (indexOrValue === 'value') yield node.value;
      if (indexOrValue === 'index') yield index;
      if (node.next !== null) yield *recurse(node.next, index + 1);
    }
    if (this[_head_] !== null) {
      yield *recurse(this[_head_], 0);
    }
  }

  *[_iteratorDesc_](indexOrValue){
    function* recurse (node, index) {
      if (indexOrValue === undefined) yield [index, node.value];
      if (indexOrValue === 'value') yield node.value;
      if (indexOrValue === 'index') yield index;
      if (node.prev == null) yield *recurse(node.prev, index - 1);
    }
    if (this[_tail_] !== null) {
      yield *recurse(this[_tail_], this.length() - 1);
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
   * Iterator through all values and indexes in the list, starting at the end of the list
   *
   * @yield {Array}
   */
  *entriesDesc(){
    yield *this[_iteratorDesc_]();
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
   * Iterator through all values in the list, starting at the end of the list
   *
   * @yield {NotUndefined}
   */
  *valuesDesc(){
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

  /*!
   * Iterator through all indexes in the list, starting at the end of the list
   *
   * @yield {Number}
   */
  *keysDesc(){
    yield *this[_iteratorDesc_]('index');
  }

  /*!
   * Return an array of all values in the list
   *
   * @returns {Array}
   */
  toArray () {
     return [...this.values()];
  }

 /*!
   * Return an array of all values in the list in descending order
   *
   * @returns {Array}
   */
  toArrayDesc () {
     return [...this.valuesDesc()];
  }

};

export default DoublyLinkedList;
