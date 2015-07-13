import taser from 'taser';

let Trie = class Trie {

  constructor (value, opts) {
    taser(['string', 'undefined', 'null'], value);
    if (typeof value === 'string') {
      console.log(value);
      this.value = value[0];
      if (value.substring(1).length > 0) {
        this.insert(value.substring(1));
      }
    }
  }

  insert (value) {
    taser(['string'], value);
    if (value.length > 0) {
      this.next = new Trie(value);
    }
  }

  contains () {

  }

};

export default Trie;
