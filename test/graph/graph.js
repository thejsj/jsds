/*jshint mocha:true */
import Graph from '../../lib/graph/graph';
import should from 'should';

describe.only('Graph', () => {

  let graph;
  beforeEach(() => {
    graph = new Graph();
  });

  describe('addNode', () => {

    it('should insert a single node into the graph', () => {
      graph.addNode('hello', 1);
      graph.getAllKeys().should.eql(['hello']);
    });

    it('should insert a three nodes into the graph', () => {
      graph.addNode('hello', 1);
      graph.addNode('wow', 1, 'hello');
      graph.addNode('great', 1, 'hello');
      graph.getAllKeys().sort().should.eql(['great', 'hello', 'wow'].sort());
    });

    it('should insert a five nodes into the graph, connected to each other', () => {
      graph.addNode('1', 1);
      graph.addNode('2', 1, '1');
      graph.addNode('3', 1, '2');
      graph.addNode('4', 1, '3');
      graph.addNode('5', 1, '4');
      graph.addEdge('1', '5');
      graph.getAllKeys().sort().should.eql(['1', '2', '3', '4', '5'].sort());
    });

  });

  describe('containsNode', () => {

  });

  describe('removeNode', () => {

  });

  describe('Edges', () => {

    describe('addEdge', () => {

    });

    describe('removeEdge', () => {

    });

    describe('setEdgeValue/getEdgeValue', () => {

    });

  });


  describe('Iterators', () => {

  });

});
