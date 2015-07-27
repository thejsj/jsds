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
      trie.get().value.should.equal('a');
      trie.get().next.value.should.equal('b');
    });

    it('should create a trie with a node and a next node for two separate strings', () =>{
      trie.insert('b');
      trie.insert('a');
      trie.get().value.should.equal('a');
      trie.get().next.value.should.equal('b');
    });

    it('should create a trie with a node and a child node for a two character string', () => {
      trie.insert('ab');
      trie.get().value.should.equal('a');
      trie.get().child.value.should.equal('b');
    });

    it('should insert values into the trie in the correct `next` and `child` properties', () => {
      trie.insert('abc');
      trie.insert('ad');
      trie.get().value.should.equal('a');
      trie.get().child.value.should.equal('b');
      trie.get().child.child.value.should.equal('c');
      trie.get().child.next.value.should.equal('d');
    });

    it('should insert values correctly as nexts', () => {
      trie.insert('y');
      trie.insert('z');
      trie.insert('a');
      trie.insert('b');
      trie.insert('c');
      trie.get().value.should.equal('a');
      trie.get().next.value.should.equal('b');
      trie.get().next.next.value.should.equal('c');
      trie.get().next.next.next.value.should.equal('y');
      trie.get().next.next.next.next.value.should.equal('z');
    });

    it('should insert values correctly as nexts', () => {
      trie.insert('baby');
      trie.insert('bad');
      trie.insert('box');
      trie.insert('dad');
      trie.insert('dance');
      trie.get().value.should.equal('b');
      trie.get().child.value.should.equal('a');
      trie.get().child.child.value.should.equal('b');
      trie.get().child.child.child.value.should.equal('y');
      trie.get().next.value.should.equal('d');
      trie.get().next.child.value.should.equal('a');
      trie.get().next.child.child.value.should.equal('d');
      trie.get().next.child.child.next.value.should.equal('n');
      trie.get().next.child.child.next.child.value.should.equal('c');
      trie.get().next.child.child.next.child.child.value.should.equal('e');
    });

     it('should insert values correctly as nexts, even if they\'re not in the right order', () => {
      trie.insert('dance');
      trie.insert('box');
      trie.insert('dad');
      trie.insert('bad');
      trie.insert('baby');
      trie.get().value.should.equal('b');
      trie.get().child.value.should.equal('a');
      trie.get().child.child.value.should.equal('b');
      trie.get().child.child.child.value.should.equal('y');
      trie.get().next.value.should.equal('d');
      trie.get().next.child.value.should.equal('a');
      trie.get().next.child.child.value.should.equal('d');
      trie.get().next.child.child.next.value.should.equal('n');
      trie.get().next.child.child.next.child.value.should.equal('c');
      trie.get().next.child.child.next.child.child.value.should.equal('e');
    });

  });

  describe('Contains', () => {

    it('should correctly check if the trie contains a single value', () => {
      trie.insert('a');
      trie.contains('a').should.equal(true);
      trie.contains('b').should.equal(false);
    });

    it('should correctly check if the trie contains a two values', () => {
      trie.insert('ab');
      trie.contains('a').should.equal(false);
      trie.contains('ab').should.equal(true);
      trie.contains('ad').should.equal(false);
      trie.contains('abd').should.equal(false);
    });

    it('should correctly check for more complex strings', () => {
      trie.insert('dance');
      trie.insert('box');
      trie.insert('dad');
      trie.insert('bad');
      trie.insert('baby');
      trie.contains('box').should.equal(true);
      trie.contains('boxa').should.equal(false);
      trie.contains('dance').should.equal(true);
      trie.contains('dancy').should.equal(false);
      trie.contains('danc').should.equal(false);
    });

  });

  describe('Remove', () => {

    it('should remove values from the trie', () => {
      trie.insert('dance');
      trie.insert('danish');
      trie.insert('dan');
      trie.remove('dan');
      trie.contains('dance').should.equal(true);
      trie.contains('danish').should.equal(true);
      trie.contains('dan').should.equal(false);
    });

  });

});
