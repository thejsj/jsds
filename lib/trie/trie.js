import taser from 'taser';
import { clone } from '../utils';

const TrieNode = class TrieNode {

  constructor (value) {
    this.value = value[0];
    this.child = null;
    this.next = null;
    if (value.length > 1) this._insertChild(value.substring(1));
  }

  insert (value) {
    if (value[0] < this.value) {
      this._swap('next', value);
    } else if (value[0] > this.value) {
      return this._insertNext(value);
    }
    // Go on to next character
    if (value.length > 1) return this._insertChild(value.substring(1));
  }

  _insertNext (value) {
    if (this.next !== null) return this.next.insert(value);
    this.next = new TrieNode(value);
    return true;
  }

  _insertChild (value) {
    if (this.child !== null) return this.child.insert(value);
    this.child = new TrieNode(value);
    return true;
  }

  _swap (property, value) {
    let _value = this.value;
    let _next = this.next;
    let _child = this.child;
    this.value = value[0];
    this.next = null;
    this.child = null;
    this[property]= new TrieNode(_value);
    this[property].child = _child;
    this[property].next = _next;
  }

  contains (value) {
    if (value[0] < this.value) return false;
    if (value[0] > this.value) {
      if (this.next !== null) return this.next.contains(value);
      return false;
    }
    if (value[0] === this.value) {
      if (value.length === 1) return true;
      if (this.child === null && value.length > 1) return false;
      if (this.child !== null && value.length > 1)
        return this.child.contains(value.substring(1));
    }
  }

  remove (value) {

  }

};

const __node__ = Symbol('node');

const Trie = class Trie {

  constructor (opts) {
    this[__node__] = null;
  }

  /*!
   * Insert a string into the trie.
   * Return `true` if the value was successfully inserted.
   *
   * @param {String}
   * @return {Boolean}
   */
  insert (value) {
    taser(['string'], value);
    if (this[__node__]) this[__node__].insert(value);
    else this[__node__] = new TrieNode(value);
  }

  /*!
   * Get a copy of the nodes in the trie as objects with `next` and `child`
   * properties
   *
   * @return {Object}
   */
  get () {
    // Return a copy of the nodes
    return clone(this[__node__]);
  }

  /*!
   * Check whether the trie contains the full string
   *
   * @param {String}
   * @return {Boolean}
   */
  contains (value) {
    taser(['string'], value);
    if (this[__node__] === null) return false;
    return this[__node__].contains(value);
  }

  /*!
   * Remove a string form the trie
   *
   * @param {String}
   * @return {Boolean}
   */
  remove (value) {
    taser(['string'], value);
    if (this[__node__] === null) return false;
    return this[__node__].remove(value);
  }

};

export default Trie;
