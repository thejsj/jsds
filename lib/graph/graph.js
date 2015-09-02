import taser from 'taser';

const stringOrNumber = taser(['string', 'number']);
const stringOrNumberOrUndefined = taser(['string', 'number', 'undefined']);

const GraphNode = class GraphNode {

  constructor (value) {
    this.value = value;
  }

};

const _nodes_ = Symbol('nodes');
const _keys_ = Symbol('keys');

const Graph = class Graph  {

  constructor () {
    this[_nodes_] = {};
    this[_keys_] = new Set();
  }

  insert (key, edgeKey) {
    stringOrNumber(key);
    stringOrNumberOrUndefined(edgeKey);
    this[_nodes_][key] = new GraphNode(key);
    this[_keys_].add(key);
    if (edgeKey !== undefined) return this.insertEdge(key, edgeKey);
    return true;
  }

  remove (key) {
    this[_keys_].delete(key);
    this[_nodes_][key].removeAllEdges();
    delete this[_nodes_][key];
  }

  contains (key) {
    return this[_keys_].has(key) && this[_nodes_][key] !== undefined;
  }

  containsEdge (fromKey, toKey) {

  }

  insertEdge (fromKey, toKey) {
    stringOrNumber(fromKey);
    stringOrNumber(toKey);
  }

  removeEdge (fromKey, toKey) {

  }

};

export default Graph;
