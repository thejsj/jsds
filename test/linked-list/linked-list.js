/*jshint mocha:true */
import LinkedList from '../../lib/linked-list/linked-list.js';
import should from 'should';

describe('LinkedList', () => {

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

    it('should throw an error if trying to remove a non-existing node', () => {
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
      linkedList.remove.bind(linkedList, 2).should.throw();
    });

    it('should remove elements at the correct index', () => {
      linkedList.insert('1');
      linkedList.get(0).should.equal('1');
      linkedList.insert('2');
      linkedList.get(0).should.equal('1');
      linkedList.get(1).should.equal('2');
      linkedList.insert('3');
      linkedList.get(0).should.equal('1');
      linkedList.get(1).should.equal('2');
      linkedList.get(2).should.equal('3');
      linkedList.remove(1);
      linkedList.get(0).should.equal('1');
      linkedList.get(1).should.equal('3');
      linkedList.remove(0);
      linkedList.get(0).should.equal('3');
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

    it('should find entries', () => {
      var arr = [1, 2, 3];
      var obj = { hello : 'world' };
      linkedList.insert('1');
      linkedList.insert(2);
      linkedList.insert(arr);
      linkedList.insert(obj);
      linkedList.find(val => typeof val === 'string').should.equal('1');
      linkedList.find(val => val > 1).should.equal(2);
    });

    it('should return `undefined` if nothing is found', () => {
      linkedList.insert('1');
      linkedList.insert('2');
      (undefined === linkedList.find(val => typeof val === 'string')).should.equal(false);
      (undefined === linkedList.find(val => typeof val === 'number')).should.equal(true);
    });
  });

  describe('Iterators', () => {

    describe('entries', () => {

      it('should get all entries', () => {
        linkedList.insert(0);
        linkedList.insert(2);
        linkedList.insert(4);
        linkedList.insert(6);
        linkedList.insert(8);
        linkedList.remove();
        [...linkedList].should.eql([[0,0], [1,2], [2,4], [3,6]]);
        [...linkedList.entries()].should.eql([[0,0], [1,2], [2,4], [3,6]]);
      });

      it('should give back an empty array if there are no entries', () => {
        [...linkedList].should.eql([]);
      });

    });

    describe('keys', () => {

      it('should get all entries', () => {
        linkedList.insert(0);
        linkedList.insert(2);
        linkedList.insert(4);
        linkedList.insert(6);
        linkedList.insert(8);
        [...linkedList.keys()].should.eql([0, 1, 2, 3, 4]);
        linkedList.remove();
        [...linkedList.keys()].should.eql([0, 1, 2, 3]);
        linkedList.insert(10);
        [...linkedList.keys()].should.eql([0, 1, 2, 3, 4]);
      });

    });

    describe('values', () => {

      it('should get all entries', () => {
        linkedList.insert(0);
        linkedList.insert(2);
        linkedList.insert(4);
        linkedList.insert(6);
        linkedList.insert(8);
        [...linkedList.values()].should.eql([0, 2, 4, 6, 8]);
        linkedList.remove();
        [...linkedList.values()].should.eql([0, 2, 4, 6]);
        linkedList.insert(10);
        [...linkedList.values()].should.eql([0, 2, 4, 6, 10]);
      });

    });

  });

});


