import taser from 'taser';

const isString = taser(['string', 'number']);
const isStringOrUndefined = taser(['string', 'number', 'undefined']);

const GraphNode = class GraphNode {

  constructor (key, value) {
    this.key = key;
    this.value = value;
  }

  getValue (value) {

  }

  setValue (value) {

  }

  hasEdge (key) {

  }

  insertEdge (key, value) {

  }

  removeEdge (key) {

  }

  removeAllEdges () {

  }

};

const _nodes_ = Symbol('nodes');
const _keys_ = Symbol('keys');

const Graph = class Graph  {

  constructor () {
    this[_nodes_] = {};
  }

  /*!
   * Add new node to the graph
   *
   * @param {String}
   * @param {String/Undefined}
   * @param {String/Undefined}
   * @return {Boolean}
   */
  addNode (key, value, edgeKey) {
    isString(key);
    isStringOrUndefined(value);
    isStringOrUndefined(edgeKey);
    if (this[_nodes_][key] === undefined) {
      this[_nodes_][key] = new GraphNode(key, value);
      if (edgeKey !== undefined) return this.insertEdge(key, edgeKey);
      return true;
    }
    throw new Error('Node with key `' + key + '` already exists');
  }

  /*!
   * Delete node from Graph
   *
   * @param {String}
   * @returns {Boolean}
   */
  deleteNode (key) {
    isString(key);
    if (this[_nodes_][key] !== undefined) {
      this[_nodes_][key].removeAllEdges();
      delete this[_nodes_][key];
      return true;
    }
    throw new Error('Node with key `' + key + '` does not exist');
  }

  /*!
   * Get value of a node
   *
   * @param {String}
   * @returns {Boolean}
   */
  getNodeValue (key) {
    isString(key);
    if (this[_nodes_][key] !== undefined) {
      return this[_nodes_][key].getValue();
    }
    throw new Error('Node with key `' + key + '` does not exist');
  }

  /*!
   * Set value on an existing node
   *
   * @param {String}
   * @param {Any}
   * @returns {Boolean}
   */
  setNodeValue (key, value) {
    isString(key);
    isStringOrUndefined(value);
    if (this[_nodes_][key] !== undefined) {
      return this[_nodes_][key].setValue(value);
    }
    throw new Error('Node with key `' + key + '` does not exist');
  }

  /*!
   * Check if there is a node with the specified key
   *
   * @param {String}
   * @returns {Boolean}
   */
  containsNode (key) {
    isString(key);
    return Object.keys(this[_nodes_]).includes(key);
  }

  /*!
   * Check if there is a node with the specified key
   *
   * @param {String}
   * @returns {Boolean}
   */
  getEdgeValue (fromKey, toKey) {
    isString(fromKey);
    isString(toKey);
    if (this[_nodes_][fromKey] !== undefined && this[_nodes_][toKey] !== undefined) {
      if (this[_nodes_][fromKey].hasEdge(toKey)) {
        // It's ok to only do it on one side
        return this[_nodes_][fromKey].getEdgeValue(toKey);
      }
    }
    throw new Error('Node with key `' + fromKey + '` does not exist');
  }

  /*!
   * Set value on an edge
   *
   * @param {String}
   * @returns {Boolean}
   */
  setEdgeValue (fromKey, toKey, value) {
    isString(fromKey);
    isString(toKey);
    isStringOrUndefined(value);
    if (this[_nodes_][fromKey] !== undefined && this[_nodes_][toKey] !== undefined) {
      return this[_nodes_][fromKey].setEdgeValue(toKey, value) && this[_nodes_][toKey].setEdgeValue(fromKey, value);
    }
    throw new Error('Node with key `' + fromKey + '` does not exist');
  }

  /*!
   * Remove existing edge
   *
   * @param {String}
   * @returns {Boolean}
   */
  removeEdge (fromKey, toKey) {
    isString(fromKey);
    isString(toKey);
    if (this[_nodes_][fromKey] !== undefined && this[_nodes_][toKey] !== undefined) {
      if (this[_nodes_][fromKey].hasEdge(toKey)) {
        return this[_nodes_][fromKey].removeEdge(toKey) && this[_nodes_][toKey].removeEdge(fromKey);
      }
    }
    throw new Error('Node with key `' + fromKey + '` does not exist');
  }

  getPath (fromKey, toKey) {

  }

  getShortestPath (fromKey, toKey) {

  }


};

export default Graph;
