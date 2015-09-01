import taser from 'taser';
import cloneDeep from 'lodash/lang/cloneDeep';
import forEach from 'lodash/collection/forEach';

const TrieNode = class TrieNode {

  constructor (value, parent, relationship) {
    this.value = value[0];
    this.child = null;
    this.next = null;
    this.parent = {
      node: parent,
    };
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
    this.next = new TrieNode(value, this, 'next');
    return true;
  }

  _insertChild (value) {
    if (this.child !== null) return this.child.insert(value);
    this.child = new TrieNode(value, this, 'child');
    return true;
  }

  _swap (property, value) {
    // When swapping, the parent will stay the same. All other properties,
    // will be swapped
    let propertyNames = ['value', 'next', 'child', 'isWord'];
    let properties = propertyNames.reduce((obj, property) => {
      obj[property] = this[property];
      return obj;
    }, {});
    this.value = value[0];
    this.next = null;
    this.child = null;
    // this.parent = this.parent;

    // Update the new node
    this[property] = new TrieNode(properties.value, this, property);
    forEach(properties, (value, key) => {
      this[property][key] = value;
    });
  }

  _getNode(value) {
    if (value[0] < this.value) return null;
    if (value[0] > this.value) {
      if (this.next !== null) return this.next._getNode(value);
      return null;
    }
    if (value[0] === this.value) {
      if (value.length === 1) {
        if (this.isWord) return this;
        return null;
      }
      if (this.child === null && value.length > 1) return null;
      if (this.child !== null && value.length > 1)
        return this.child._getNode(value.substring(1));
    }
  }

  _removeIfVoid() {
    let parent = this.parent.node;
    // Remove a word of totally void
    if (!this.isWord && this.child === null && this.next === null) {
      if (parent !== null) {
        parent[this.parent.relationship] = null;
        return parent._removeParent();
      }
      return true;
    }
    // Remove a word and swap references if there is a `next`
    if (!this.word && this.child == null) {
      if (parent !== null) {
        // Swap references
        parent[this.parent.relationship] = this.next;
        return parent._removeParent();
      }
      return true;
    }
    return true;
  }

  contains (value) {
    if (this._getNode(value) !== null) return true;
    return false;
  }

  remove (value) {
    let node = this._getNode(value);
    if (node === false) return false;
    node.isWord = false;
    // Recursively delete nodes
    this._removeIfVoid();
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
    else this[__node__] = new TrieNode(value, null, null);
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

  /*!
   * Iterate over all words in the trie
   *
   * @yield {String}
   */
  *[Symbol.iterator]() {
    let recurse = function* (node, string) {
      if (node.isWord) yield string + node.value;
      if (node.child) yield *recurse(node.child, string + node.value);
      if (node.next) yield *recurse(node.next, string);
    };
    yield *recurse(this[__node__], '');
  }

};

export default Trie;
