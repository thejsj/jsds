/*jshint mocha:true */
import LinkedList from '../../lib/linked-list/linked-list.js';
import should from 'should';

describe.only('LinkedList', () => {

  let linkedList;
  beforeEach(() => {
    linkedList = new LinkedList();
  });

  describe('insert', () => {

    it('should insert items', () => {
      linkedList.insert('1');
      linkedList.insert('2');
      linkedList.insert('3');
      linkedList.get(0).should.equal('1');
      linkedList.get(1).should.equal('2');
      linkedList.get(2).should.equal('3');
    });

    it('should insert items at a specified index', () => {
      linkedList.insert('1');
      linkedList.insert('2');
      linkedList.insert('3', 2);
      linkedList.get(0).should.equal('1');
      linkedList.get(1).should.equal('2');
      linkedList.get(2).should.equal('3');
      linkedList.insert('wow', 1);
      linkedList.get(1).should.equal('wow');
    });

    it('should throw errors when something is insert at an un-existing index', () => {
      linkedList.insert('1');
      linkedList.insert('2');
      linkedList.insert.bind(linkedList, '3', 3).should.throw();
      linkedList.insert.bind(linkedList, '3', 4).should.throw();
      linkedList.insert('2', 2);
      linkedList.get(2).should.equal('2');
    });

  });

  describe('get', () => {

    it('should get values correctly', () => {
      linkedList.insert([1, 2]);
      linkedList.insert({ hello: 'world' });
      linkedList.get(0).should.eql([1, 2]);
      linkedList.get(1).should.eql({ hello: 'world' });
    });

    it('should return undefined if there is not value in the index', () => {
      linkedList.insert(1);
      linkedList.insert(2);
      linkedList.get(1).should.equal(2);
      (linkedList.get(3) === undefined).should.equal(true);
    });

  });

  describe('set', () => {

    it('should set the value of an already inserted node', () => {
      linkedList.insert(1);
      linkedList.get(0).should.equal(1);
      linkedList.set(0, 2);
      linkedList.get(0).should.equal(2);
    });

    it('should throw an error if the index doesn\'t exist', () => {
      linkedList.insert(1);
      linkedList.get(0).should.equal(1);
      linkedList.set.bind(linkedList, 1, 2).should.throw();
    });

  });

  describe('remove', () => {

    it('should correctly remove nodes', () => {
      linkedList.insert('1');
      linkedList.insert('2');
      linkedList.get(0).should.equal('1');
      linkedList.get(1).should.equal('2');
      linkedList.remove();
      linkedList.get(0).should.equal('1');
      (linkedList.get(1) === undefined).should.equal(true);
      linkedList.remove();
      (linkedList.get(0) === undefined).should.equal(true);
    });

    it('should should throw an error if trying to remove a non-existing node', () => {
      linkedList.insert('1');
      linkedList.get(0).should.equal('1');
      linkedList.insert('2');
      linkedList.get(0).should.equal('1');
      linkedList.get(1).should.equal('2');
      linkedList.insert('3');
      linkedList.get(0).should.equal('1');
      linkedList.get(1).should.equal('2');
      linkedList.get(2).should.equal('3');
      linkedList.remove(2);
    });

  });

  describe('length', () => {

    it('should correctly return the length', () => {
      linkedList.length().should.equal(0);
      linkedList.insert('1');
      linkedList.length().should.equal(1);
      linkedList.insert('2');
      linkedList.length().should.equal(2);
      linkedList.remove(0);
      linkedList.length().should.equal(1);
      linkedList.remove(0);
      linkedList.length().should.equal(0);
    });

  });


  describe('contains', () => {

    it('should check if a value is contained', () => {
      var arr = [1, 2, 3];
      var obj = { hello : 'world' };
      linkedList.insert('1');
      linkedList.insert(2);
      linkedList.insert(arr);
      linkedList.insert(obj);
      linkedList.contains('1').should.equal(true);
      linkedList.contains(1).should.equal(false);
      linkedList.contains(2).should.equal(true);
      linkedList.contains('2').should.equal(false);
      linkedList.contains(arr).should.equal(true);
      linkedList.contains(obj).should.equal(true);
      linkedList.contains({ hello: 'world' }).should.equal(false);
    });

  });

  describe('find', () => {

  });

  describe('[Symbol.iterator]', () => {

  });

});


