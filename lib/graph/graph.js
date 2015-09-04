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

  /*! 
   * Add new node to the graph
   * 
   * @param {String/Number}
   * @param {String/Number/Undefined}
   * @param {String/Number/Undefined}
   */
  add (key, value, edgeKey) {
    stringOrNumber(key);
    stringOrNumberOrUndefined(value);
    stringOrNumberOrUndefined(edgeKey);
    this[_nodes_][key] = new GraphNode(key);
    this[_keys_].add(key);
    if (edgeKey !== undefined) return this.insertEdge(key, edgeKey);
    return true;
  }

  delete (key) {
    this[_keys_].delete(key);
    this[_nodes_][key].removeAllEdges();
    delete this[_nodes_][key];
  }

  getNodeValue (key) {

  }

  setNodeValue (key, value) {

  }

  contains (key) {
    return this[_keys_].has(key) && this[_nodes_][key] !== undefined;
  }

  getEdgeValue (fromKey, toKey) {

  }

  setEdgeValue (fromKey, toKey, value) {
    stringOrNumber(fromKey);
    stringOrNumber(toKey);
  }

  removeEdge (fromKey, toKey) {

  }

  getPath (fromKey, toKey) {

  }

  getShortestPath (fromKey, toKey) {

  }


};

export default Graph;
