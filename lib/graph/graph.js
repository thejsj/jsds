import taser from 'taser';

const isString = taser(['string']);
const isStringOrUndefined = taser(['string', 'undefined']);

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

  /**
   * Edges
   */

  hasEdge (key) {
    return this.edges[key] !== undefined;
  }

  addEdge (node, value) {
    this.edges[node.key] = {
      node: node,
      value: value
    };
  }

  removeEdge (key) {
    delete this.edges[key];
  }

  setEdgeValue (node, value) {
    this.edges[node.key].value = value;
  }

  getEdgeValue (node) {
    return this.edges[node.key].value;
  }

  /**
   * Graph Traversal
   */

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

  /**
   * Add new node to the graph
   *
   * @param {String}
   * @param {String/Undefined}
   * @param {String/Undefined}
   * @return {Boolean}
   */
  addNode (key, value, edgeKey) {
    isString(key);
    isStringOrUndefined(edgeKey);
    if (this[_nodes_][key] === undefined) {
      this[_nodes_][key] = new GraphNode(key, value);
      if (edgeKey !== undefined && this.containsNode(edgeKey)) {
        this[_nodes_][key].addEdge(this[_nodes_][edgeKey]);
        this[_nodes_][edgeKey].addEdge(this[_nodes_][key]);
      }
      return true;
    }
    throw new Error(`Node with key '${ key }' already exists`);
  }

  /**
   * Delete node from Graph
   *
   * @param {String}
   * @returns {Boolean}
   */
  removeNode (key) {
    isString(key);
    if (this[_nodes_][key] !== undefined) {
      let node = this[_nodes_][key];
      for(let edgeKey in node.edges) {
        if (node.edges.hasOwnProperty(edgeKey)) {
          // Delete edge in both directions
          this.removeEdge(key, edgeKey);
        }
      }
      delete this[_nodes_][key];
      return true;
    }
    throw new Error(`Node with key '${ key }' doesn't exist`);
  }
  
  /**
   * Check if there is a node with the specified key
   *
   * @param {String}
   * @returns {Boolean}
   */
  containsNode (key) {
    isString(key);
    return Object.keys(this[_nodes_]).includes(key);
  }

  /**
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
    throw new Error(`Node with key '${ key }' doesn't exist`);
  }

  /**
   * Set value on an existing node
   *
   * @param {String}
   * @param {Any}
   * @returns {Boolean}
   */
  setNodeValue (key, value) {
    isString(key);
    if (this[_nodes_][key] !== undefined) {
      return this[_nodes_][key].setValue(value);
    }
    throw new Error(`Node with key '${ key }' doesn't exist`);
  }

    /**
   * Remove existing edge
   *
   * @param {String}
   * @param {String}
   * @returns {Boolean}
   */
  addEdge (fromKey, toKey, value) {
    isString(fromKey);
    isString(toKey);
    let fromNode = this[_nodes_][fromKey];
    let toNode = this[_nodes_][toKey];
    if (fromKey === toKey) {
      throw new Error(`Node with key '${fromKey}' cannot add edge to itself`);
    }
    if (fromNode.hasEdge(toKey) || toNode.hasEdge(fromKey)) {
      throw new Error(`Nodes with keys '${fromKey}' and '${toKey}' already have edge`);
    }
    if (fromNode !== undefined && toNode !== undefined) {
      let fromEdgeAdded = fromNode.addEdge(toNode);
      let toEdgeAdded = toNode.addEdge(fromNode);
      if (value !== undefined) {
        this.setEdgeValue(fromKey, toKey, value);
      }
      return fromEdgeAdded && toEdgeAdded;
    }
    if (this[_nodes_][fromKey] === undefined) {
      throw new Error(`Node with key '${ fromKey }' doesn't exist`);
    }
    if (this[_nodes_][toKey] === undefined) {
      throw new Error(`Node with key '${ toKey }' doesn't exist`);
    }
  }

  /**
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
        let fromKeyDeleted = this[_nodes_][fromKey].removeEdge(toKey);
        let toKeyDeleted = this[_nodes_][toKey].removeEdge(fromKey);
        return fromKeyDeleted && toKeyDeleted;
      }
    }
    if (this[_nodes_][fromKey] === undefined) {
      throw new Error(`Node with key '${ fromKey }' doesn't exist`);
    }
    if (this[_nodes_][toKey] === undefined) {
      throw new Error(`Node with key '${ toKey }' doesn't exist`);
    }
  }

  /*
   * Check if two nodes have an edge between them
   *
   * @param {String}
   * @param {String}
   * @return {Boolean}
   */
  haveEdge (fromKey, toKey) {
    isString(fromKey);
    isString(toKey);
    if (this[_nodes_][fromKey] !== undefined && this[_nodes_][toKey] !== undefined) {
      return this[_nodes_][fromKey].hasEdge(toKey) && this[_nodes_][toKey].hasEdge(fromKey);
    }
    if (this[_nodes_][fromKey] === undefined) {
      throw new Error(`Node with key '${ fromKey }' doesn't exist`);
    }
    if (this[_nodes_][toKey] === undefined) {
      throw new Error(`Node with key '${ toKey }' doesn't exist`);
    }
  }

  /**
   * Get all keys for all edge nodes for a particular node
   *
   * @param {String}
   * @return {Array}
   */
  getAllEdges (key) {
    isString(key);
    if (this[_nodes_][key] !== undefined) {
      return Object.keys(this[_nodes_][key].edges);
    }
    throw new Error(`Node with key '${ key }' doesn't exist`);
  }

  /**
   * Check if there is a node with the specified key
   *
   * @param {String}
   * @param {String}
   * @returns {Boolean}
   */
  getEdgeValue (fromKey, toKey) {
    isString(fromKey);
    isString(toKey);
    let fromNode = this[_nodes_][fromKey];
    let toNode = this[_nodes_][toKey];
    if (fromNode !== undefined && toNode !== undefined) {
      if (fromNode.hasEdge(toKey) && toNode.hasEdge(fromKey)) {
        // It's ok to only do it on one side
        return fromNode.getEdgeValue(toNode);
      }
      throw new Error(`Edge between '${fromKey}' and '${toKey}' doesn't exist`);
    }
    if (fromNode === undefined) {
      throw new Error(`Node with key '${ fromKey }' doesn't exist`);
    }
    if (toNode === undefined) {
      throw new Error(`Node with key '${ toKey }' doesn't exist`);
    }
  }

  /**
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
    let fromNode = this[_nodes_][fromKey];
    let toNode = this[_nodes_][toKey];
    if (fromNode !== undefined && toNode !== undefined) {
      let from = fromNode.setEdgeValue(toNode, value);
      let to = toNode.setEdgeValue(fromNode, value);
      return from && to;
    }
    if (this[_nodes_][fromKey] === undefined) {
      throw new Error(`Node with key '${ fromKey }' doesn't exist`);
    }
    if (this[_nodes_][toKey] === undefined) {
      throw new Error(`Node with key '${ toKey }' doesn't exist`);
    }
  }

  *_traversalIterator (node, key) {
    let label = (new Date()).getTime() + '' + Math.random();
    let rootNodeKey = Object.keys(this[_nodes_])[0];
    let callbacks = [];
    if (rootNodeKey === undefined) return;
    let recurse = function* (node) {
      if (!node.isExplored(label)) {
        node.setExploredLabel(label);
        callbacks.push(node.removeExploredLabel.bind(node, label));
        if (key === undefined) {
          yield [node.key, node.value];
        } else {
          yield node[key];
        }
        for (let edgeKey of Object.keys(node.edges)) {
          yield *recurse(node.edges[edgeKey].node);
        }
      }
    };
    yield *recurse(this[_nodes_][rootNodeKey]);
    callbacks.forEach(fn => fn());
  }

  *_globalIterator (key) {
    for (let nodeKey of Object.keys(this[_nodes_])) {
      if (key === undefined) {
        yield [this[_nodes_][nodeKey].key, this[_nodes_][nodeKey].value];
      } else {
        yield this[_nodes_][nodeKey][key];
      }
    }
  }

  /**
   * Iterate over all key/value pairs in the graph, through depth-first traversal
   *
   * @yield {String}
   */
  *[Symbol.iterator]() {
    yield *this._globalIterator();
   }

  /**
   * Iterate over all values in the graph, through depth-first traversal
   *
   * @yield {String}
   */
  *values(nodeKey) {
    isStringOrUndefined(nodeKey);
    if (nodeKey) {
      let node = this[_nodes_][nodeKey];
      if (node === undefined) {
        throw new Error(`Node with key '${nodeKey}' doesn't exist`); 
      }
      yield *this._traversalIterator(node, 'value');
    } else {
      yield *this._globalIterator('value');
    }
  }

  /**
   * Iterate over all keys in the graph, through depth-first traversal
   *
   * @yield {String}
   */
  *keys(nodeKey) {
    isStringOrUndefined(nodeKey);
    if (nodeKey) {
      let node = this[_nodes_][nodeKey];
      if (node === undefined) {
        throw new Error(`Node with key '${nodeKey}' doesn't exist`); 
      }
      yield *this._traversalIterator(node, 'key');
    } else {
      yield *this._globalIterator('key');
    }
  }

  /**
   * Get all keys in the Graph
   *
   * @return {Array}
   */
  getAllKeys () {
    return Object.keys(this[_nodes_]);
  }

  /**
   * Get all values in the Graph
   *
   * @return {Array}
   */
  getAllValues() {
    return Object.keys(this[_nodes_]).map(node => node.value);
  }

  getPath (fromKey, toKey) {

  }

  getShortestPath (fromKey, toKey) {

  }

};

export default Graph;
