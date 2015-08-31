import taser from 'taser';
import cloneDeep from 'lodash/lang/cloneDeep';
import forEach from 'lodash/collection/forEach';

const TrieNode = class TrieNode {

  constructor (value, parent) {
    this.value = value[0];
    this.child = null;
    this.next = null;
    this.parent = parent;
    this.isWord = false;
    if (value.length > 1) this._insertChild(value.substring(1));
    else this.isWord = true;
  }

  insert (value) {
    if (value[0] < this.value) {
      this._swap('next', value);
    } else if (value[0] > this.value) {
      return this._insertNext(value);
    }
    // Go on to next character
    if (value.length > 1) return this._insertChild(value.substring(1));
    else if (value.length === 1 && value[0] === this.value) this.isWord = true;
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
    let propertyNames = ['value', 'next', 'child', 'isWord', 'parent'];
    let properties = propertyNames.reduce((obj, property) => {
      obj[property] = this[property];
      return obj;
    }, {});
    // TODO: What should I do with the parent?
    this.value = value[0];
    this.next = null;
    this.child = null;
    // Update the new node
    this[property] = new TrieNode(properties.value);
    forEach(properties, (value, key) => {
      this[property][key] = value;
    });
  }

  _getNode(value, parent) {
    if (value[0] < this.value) return [null, null];
    if (value[0] > this.value) {
      if (this.next !== null) return this.next._getNode(value, this);
      return [null, null];
    }
    if (value[0] === this.value) {
      if (value.length === 1) {
        if (this.isWord) return [this, parent];
        return [null, null];
      }
      if (this.child === null && value.length > 1) return [null, null];
      if (this.child !== null && value.length > 1)
        return this.child._getNode(value.substring(1), this);
    }
  }

  contains (value) {
    if (this._getNode(value)[0] !== null) return true;
    return false;
  }

  remove (value) {
    let [node, parent] = this._getNode(value);
    if (node === false) return false;
    node.isWord = false;
    // TODO: Recursively go up the tree deleting parents
    // Remove nodes from tree if there are no children
    // Remove parent if there are no children
  }

};

const __node__ = Symbol('node');

const Trie = class Trie {

  constructor () {
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
    return cloneDeep(this[__node__]);
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
