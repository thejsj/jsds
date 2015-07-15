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

};

const Trie = class Trie {

  constructor (opts) {
    this.node = null;
  }

  insert (value) {
    taser(['string'], value);
    if (this.node) this.node.insert(value);
    else this.node = new TrieNode(value);
  }

  contains () {

  }

};

export default Trie;
