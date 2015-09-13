import taser from 'taser';

const isstring = taser(['string']);
const isstringorundefined = taser(['string', 'undefined']);

const DoublyLinkedList = class DoublyLinkedList {

  constructor () {

  }

  *[Symbol.iterator](){
    yield true;
  }

};

export default DoublyLinkedList;
