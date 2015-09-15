import taser from 'taser';

const isstring = taser(['string']);
const isstringorundefined = taser(['string', 'undefined']);

const Queue = class Queue {

  constructor () {

  }

  enqueue () {

  }

  dequeue () {

  }

  *[Symbol.iterator](){
    yield true;
  }

};

export default Queue;

