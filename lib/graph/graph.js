import taser from 'taser';

const isString = taser(['string', 'number']);
const isStringOrUndefined = taser(['string', 'number', 'undefined']);

const GraphNode = class GraphNode {

  constructor (key, value) {
    this.key = key;
    this.value = value;
    this.edges = {};
    this.traversalLables = {};
  }

  getValue (value) {
    return this.value;
  }

  setValue (value) {
    this.value = value;
  }

  hasEdge (key) {
    return this.edges[key] !== undefined;
  }

  addEdge (key, node) {
    this.edges[key] = node;
  }

  removeEdge (key) {
    delete this.edges[key];
  }

  removeAllEdges () {
    for(let key of this.edges.keys()) {
      delete this.edges[key];
    }
  }

  setExploredLabel (label) {
    this.traversalLables[label] = true;
  }

  isExplored (label) {
    return this.traversalLables[label] === true;
  }

  removeExploredLabel (label) {
    delete this.traversalLables[label];
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
      if (edgeKey !== undefined && this.containsNode(edgeKey)) {
        this[_nodes_][key].addEdge(edgeKey, this[_nodes_][edgeKey]);
        this[_nodes_][edgeKey].addEdge(key, this[_nodes_][key]);
      }
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
   * Remove existing edge
   *
   * @param {String}
   * @param {String}
   * @returns {Boolean}
   */
  addEdge (fromKey, toKey) {
    isString(fromKey);
    isString(toKey);
    let fromNode = this[_nodes_][fromKey];
    let toNode = this[_nodes_][toKey];
    if (fromNode !== undefined && toNode !== undefined) {
      return fromNode.addEdge(toKey, toNode) && toNode.addEdge(fromKey, fromNode);
    }
    throw new Error('Node with key `' + fromKey + '` does not exist');
  }

  /*!
   * Remove existing edge
   *
   * @param {String}
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

  /*!
   * Check if there is a node with the specified key
   *
   * @param {String}
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
   * @param {String}
   * @param {Any}
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
   * Iterate over all key/value pairs in the graph, through depth-first traversal
   *
   * @yield {String}
   */
  *[Symbol.iterator]() {
    let label = (new Date()).getTime() + '' + Math.random();
    let rootNodeKey = Object.keys(this[_nodes_])[0];
    if (rootNodeKey === undefined) return;
    let recurse = function* (node) {
      if (!node.isExplored(label)) {
        node.setExploredLabel(label);
        yield [node.key, node.value];
        for (let key of Object.keys(node.edges)) {
          yield *recurse(node.keys[key]);
        }
      }
    };
    yield *recurse(this[_nodes_][rootNodeKey]);
  }

  /*!
   * Iterate over all values in the graph, through depth-first traversal
   *
   * @yield {String}
   */
  *values() {
    let label = (new Date()).getTime() + '' + Math.random();
    let rootNodeKey = Object.keys(this[_nodes_])[0];
    if (rootNodeKey === undefined) return;
    let recurse = function* (node) {
      if (!node.isExplored(label)) {
        node.setExploredLabel(label);
        yield node.value;
        for (let key of Object.keys(node.edges)) {
          yield *recurse(node.keys[key]);
        }
      }
    };
    yield *recurse(this[_nodes_][rootNodeKey]);
  }

  /*!
   * Iterate over all keys in the graph, through depth-first traversal
   *
   * @yield {String}
   */
  *keys() {
    let label = (new Date()).getTime() + '' + Math.random();
    let rootNodeKey = Object.keys(this[_nodes_])[0];
    if (rootNodeKey === undefined) return;
    let recurse = function* (node) {
      if (!node.isExplored(label)) {
        node.setExploredLabel(label);
        yield node.key;
        for (let key of Object.keys(node.edges)) {
          yield *recurse(node.edges[key]);
        }
      }
    };
    yield *recurse(this[_nodes_][rootNodeKey]);
  }

  /*!
   * Get all keys in the Graph
   *
   * @return {Array}
   */
  getAllKeys () {
    let keys = [];
    for (let key of this.keys()) {
      keys.push(key);
    }
    return keys;
  }

  /*!
   * Get all values in the Graph
   *
   * @return {Array}
   */
  getAllValues() {
    let values = [];
    for (let value of this.values()) {
      values.push(value);
    }
    return values;
  }

  getPath (fromKey, toKey) {

  }

  getShortestPath (fromKey, toKey) {

  }


};

export default Graph;
