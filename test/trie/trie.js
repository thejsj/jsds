/*jshint mocha:true */
import Trie from '../../lib/trie/trie';
import should from 'should';

describe('Trie', () => {

  let trie;
  beforeEach(() => {
    trie = new Trie();
  });

  describe('Init', () => {



  });

  describe('Insert', () => {

    it('should create a trie with a node and a next node for two separate strings', () =>{
      trie.insert('a');
      trie.insert('b');
      trie.node.value.should.equal('a');
      trie.node.next.value.should.equal('b');
    });

    it('should create a trie with a node and a next node for two separate strings', () =>{
      trie.insert('b');
      trie.insert('a');
      trie.node.value.should.equal('a');
      trie.node.next.value.should.equal('b');
    });

    it('should create a trie with a node and a child node for a two character string', () => {
      trie.insert('ab');
      trie.node.value.should.equal('a');
      trie.node.child.value.should.equal('b');
    });

    it('should insert values into the trie in the correct `next` and `child` properties', () => {
      trie.insert('abc');
      trie.insert('ad');
      trie.node.value.should.equal('a');
      trie.node.child.value.should.equal('b');
      trie.node.child.child.value.should.equal('c');
      trie.node.child.next.value.should.equal('d');
    });

    it('should insert values correctly as nexts', () => {
      trie.insert('y');
      trie.insert('z');
      trie.insert('a');
      trie.insert('b');
      trie.insert('c');
      trie.node.value.should.equal('a');
      trie.node.next.value.should.equal('b');
      trie.node.next.next.value.should.equal('c');
      trie.node.next.next.next.value.should.equal('y');
      trie.node.next.next.next.next.value.should.equal('z');
    });

    it('should insert values correctly as nexts', () => {
      trie.insert('baby');
      trie.insert('bad');
      trie.insert('box');
      trie.insert('dad');
      trie.insert('dance');
      trie.node.value.should.equal('b');
      trie.node.child.value.should.equal('a');
      trie.node.child.child.value.should.equal('b');
      trie.node.child.child.child.value.should.equal('y');
      trie.node.next.value.should.equal('d');
      trie.node.next.child.value.should.equal('a');
      trie.node.next.child.child.value.should.equal('d');
      trie.node.next.child.child.next.value.should.equal('n');
      trie.node.next.child.child.next.child.value.should.equal('c');
      trie.node.next.child.child.next.child.child.value.should.equal('e');
    });

     it('should insert values correctly as nexts, even if they\'re not in the right order', () => {
      trie.insert('dance');
      trie.insert('box');
      trie.insert('dad');
      trie.insert('bad');
      trie.insert('baby');
      trie.node.value.should.equal('b');
      trie.node.child.value.should.equal('a');
      trie.node.child.child.value.should.equal('b');
      trie.node.child.child.child.value.should.equal('y');
      trie.node.next.value.should.equal('d');
      trie.node.next.child.value.should.equal('a');
      trie.node.next.child.child.value.should.equal('d');
      trie.node.next.child.child.next.value.should.equal('n');
      trie.node.next.child.child.next.child.value.should.equal('c');
      trie.node.next.child.child.next.child.child.value.should.equal('e');
    });

  });

});
