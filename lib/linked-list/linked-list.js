/*jshint maxstatements:35 */
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

  find (fn, index) {
    if (fn(this.value) === true) return [index, this.value];
    if (this.next === null) return [null, undefined]; // Not found
    return this.next.find(fn, index + 1);
  }

};

const _head_ = Symbol('head');
const _tail_ = Symbol('head');
const _get_ = Symbol('get');
const _length_ = Symbol('length');
const _iterator_ = Symbol('iterator');

const LinkedList = class LinkedList {

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
  insert (value, index) { // add, push
    assertNotUndefined(value);
    assertNumberOrUndefined(index);
    let newNode = new LinkedListNode(value);
    if (index === undefined) { // Add it at the end
      if (this[_head_] === null && this[_tail_] === null) {
        this[_head_] = newNode;
      } else {
        this[_tail_].next = newNode;
      }
      this[_length_] += 1;
      this[_tail_] = newNode;
      return true;
    }
    if (index === 0) {
      let next = null;
      if (this[_head_] !== null) {
        next = this[_head_];
      }
      this[_head_] = newNode;
      this[_head_].next = next;
      if (this[_tail_]) {
        this[_tail_] = newNode;
      }
      this[_length_] += 1;
      return true;
    }
    // When index is specified
    if (this.length() < index) {
      throw new Error(`Value cannot be inserted at index '${index}'. Index does not exist.`);
    }
    let node = this[_get_](index - 1);
    let next = null;
    if (node.next) next = node.next;
    node.next = newNode;
    if (next !== null) newNode.next = next;
    this[_length_] += 1;
    return true;
  }

  /*!
   * Remove a value from the list. If no index is passed, delete the last element.
   *
   * @param {Number, undefined}
   * @returns {Boolean}
   */
  remove (index) { // pop
    assertNumberOrUndefined(index);
    let queryIndex, node, next = null, returnNode;
    if (index === undefined) index = this.length() - 1;
    // If there is only one node left
    if (index === 0) {
      if (this.length() === 0) {
        return undefined;
      }
      returnNode = this[_head_];
      if (this.length() === 1) {
        this[_head_] = null;
        this[_tail_] = null;
        this[_length_] = 0;
        return returnNode.value;
      }
      this[_head_] = this[_head_].next;
      this[_length_] -= 1;
      return returnNode.value;
    }
    queryIndex = index - 1;
    if (index < 1) queryIndex = 0;
    node = this[_get_](queryIndex); // Get the parent node of the node we want to remove
    if (node === undefined || node.next === null) {
      throw new Error(`Value cannot be set at index '${index}'. Index does not exist.`);
    }
    returnNode = node.next;
    if (node.next !== null && node.next.next !== null) {
      next = node.next.next;
    }
    if (next === null) {
      node.next = null;
      this[_tail_] = node;
    } else {
      node.next = next;
    }
    this[_length_] -= 1;
    return returnNode.value;
  }

  [_get_] (index) {
    return this[_head_].get(index);
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
  contains (value) { // includes
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

  /*!
   * Iterator through all values and indexes
   *
   * @yield {Array}
   */
  *[Symbol.iterator](){
    yield *this[_iterator_]();
  }

  /*!
   * Iterator through all values and indexes in the list, starting at the end of the list
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

  /*!
   * Return an array of all values in the list
   *
   * @returns {Array}
   */
  toArray () {
     return [...this.values()];
  }

};

export default LinkedList;
