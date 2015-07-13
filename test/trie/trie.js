/*jshint mocha:true */
import Trie from '../../lib/trie/trie';
import should from 'should';

describe('Trie', () => {

  let trie;
  beforeEach(() => {
    trie = new Trie('abc');
  });

  describe('Init', () => {

    it('should create a trie from a string', () =>{
      trie.value.should.equal('a');
      trie.next.value.should.equal('b');
      trie.next.next.value.should.equal('c');
    });

  });

  describe('Insert', () => {

    it('should insert values into the trie in the correct `next` and `child` properties', () => {
      trie.insert('ac');

    });

  });

});
