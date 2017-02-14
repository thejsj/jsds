import taser from 'taser'

const isString = taser(['string'])
const isStringOrUndefined = taser(['string', 'undefined'])

const GraphNode = class GraphNode {

  constructor (key, value) {
    this.key = key
    this.value = value
    this.edges = {}
    this.traversalLables = {}
  }

  getValue (value) {
    return this.value
  }

  setValue (value) {
    this.value = value
  }

  /**
   * Edges
   */

  hasEdge (key) {
    return this.edges[key] !== undefined
  }

  addEdge (node, value) {
    this.edges[node.key] = {
      node, value
    }
  }

  removeEdge (key) {
    delete this.edges[key]
  }

  setEdgeValue (node, value) {
    this.edges[node.key].value = value
  }

  getEdgeValue (node) {
    return this.edges[node.key].value
  }

  /**
   * Graph Traversal
   */

  setExploredLabel (label) {
    this.traversalLables[label] = true
  }

  isExplored (label) {
    return this.traversalLables[label] === true
  }

  removeExploredLabel (label) {
    delete this.traversalLables[label]
  }

}

const _nodes_ = Symbol('nodes')
const _lastInsertedNodeKey_ = Symbol('_lastInsertedNodeKey_')
const _traversalIterator_ = Symbol('_traversalIterator_')
const _globalIterator_ = Symbol('_globalIterator_')

const Graph = class Graph  {

  constructor () {
    this[_nodes_] = {}
  }

  /**
   * Add new node to the graph
   *
   * @param {String}
   * @param {String/Undefined}
   * @param {String/Undefined}
   * @return {Boolean}
   */
  addNode (key, value, edgeNodeKey) {
    isString(key)
    isStringOrUndefined(edgeNodeKey)
    if (this[_nodes_][key]) {
      throw new Error(`Node with key ${key} already exists`)
    }
    let node = new GraphNode(key, value)
    this[_nodes_][key] = node
    this[_lastInsertedNodeKey_] = key
    if (edgeNodeKey) {
      this.addEdge(key, edgeNodeKey)
    }
  }

  /**
   * Delete node from Graph
   *
   * @param {String}
   * @returns {Boolean}
   */
  removeNode (key) {
    Object.keys(this[_nodes_][key].edges).forEach(edgeKey => {
      if (this[_lastInsertedNodeKey_] === key) {
        this[_lastInsertedNodeKey_] = edgeKey
      }
      this[_nodes_][key].removeEdge(edgeKey)
      this[_nodes_][edgeKey].removeEdge(key)
    })

    delete this[_nodes_][key]
  }

  /**
   * Check if there is a node with the specified key
   *
   * @param {String}
   * @returns {Boolean}
   */
  containsNode (key) {
    isString(key)
    return !!this[_nodes_][key]
  }

  /**
   * Get value of a node
   *
   * @param {String}
   * @returns {Boolean}
   */
  getNodeValue (key) {
  }

  /**
   * Set value on an existing node
   *
   * @param {String}
   * @param {Any}
   * @returns {Boolean}
   */
  setNodeValue (key, value) {
  }

  /**
   * Add edge
   *
   * @param {String}
   * @param {String}
   * @param {Any}
   * @returns {Boolean}
   */
  addEdge (fromKey, toKey, value) {
    if (fromKey === toKey) {
      throw new Error('Cannot add key to itself')
    }
    if (!this[_nodes_][fromKey] || !this[_nodes_][toKey]) {
      throw new Error('Nodes not found')
    }
    if (this[_nodes_][fromKey].edges[toKey]) {
      throw new Error('Edge already exists')
    }
    this[_nodes_][fromKey].addEdge(this[_nodes_][toKey], value)
    this[_nodes_][toKey].addEdge(this[_nodes_][fromKey], value)
    return
  }

  /**
   * Remove existing edge
   *
   * @param {String}
   * @param {String}
   * @returns {Boolean}
   */
  removeEdge (fromKey, toKey) {
    this[_nodes_][fromKey].removeEdge(toKey)
    this[_nodes_][toKey].removeEdge(fromKey)
  }

  /*
   * Check if two nodes have an edge between them
   *
   * @param {String}
   * @param {String}
   * @return {Boolean}
   */
  haveEdge (fromKey, toKey) {
    return !!this[_nodes_][fromKey].edges[toKey]
  }

  /**
   * Get all keys for all edge nodes for a particular node
   *
   * @param {String}
   * @return {Array}
   */
  getAllEdges (key) {
    return Object.keys(this[_nodes_][key].edges)
  }

  /**
   * Check if there is a node with the specified key
   *
   * @param {String}
   * @param {String}
   * @returns {Boolean}
   */
  getEdgeValue (fromKey, toKey) {
    return this[_nodes_][fromKey].getEdgeValue(this[_nodes_][toKey])
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
    this[_nodes_][fromKey].setEdgeValue(this[_nodes_][toKey], value)
    this[_nodes_][toKey].setEdgeValue(this[_nodes_][fromKey], value)
  }

  * [_traversalIterator_] (node, key, label) {
    if (!node.isExplored(label)) {
      if (key) {
        yield node[key]
      } else {
        yield [node.key, node.value]
      }
      node.setExploredLabel(label)
      for (let edgeKey of Object.keys(node.edges)) {
        yield * this[_traversalIterator_](node.edges[edgeKey].node, key, label)
      }
    }
  }

  * [_globalIterator_] (key) {
    for (let nodeKey of Object.keys(this[_nodes_])) {
      let node = this[_nodes_][nodeKey]
      if (key) {
        yield node[key]
      } else {
        yield [node.key, node.value]
      }
    }
  }

  /**
   * Iterate over all key/value pairs in the graph, through depth-first traversal
   *
   * @yield {String}
   */
  * [Symbol.iterator] () {
    yield * this[_globalIterator_]()
  }

  /**
   * Iterate over all values in the graph, through depth-first traversal
   *
   * @yield {String}
   */
  * values (nodeKey) {
    isStringOrUndefined(nodeKey)
    if (nodeKey) {
      let label = '' + Date.now() + Math.floor(Math.random() * 1000)
      let node = this[_nodes_][nodeKey]
      if (node === undefined) {
        throw new Error(`Node with key '${nodeKey}' doesn't exist`)
      }
      yield * this[_traversalIterator_](node, 'value', label)
    } else {
      yield * this[_globalIterator_]('value')
    }
  }

  /**
   * Iterate over all keys in the graph, through depth-first traversal
   *
   * @yield {String}
   */
  * keys (nodeKey) {
    isStringOrUndefined(nodeKey)
    if (nodeKey) {
      let label = '' + Date.now() + Math.floor(Math.random() * 1000)
      let node = this[_nodes_][nodeKey]
      if (node === undefined) {
        throw new Error(`Node with key '${nodeKey}' doesn't exist`)
      }
      yield * this[_traversalIterator_](node, 'key', label)
    } else {
      yield * this[_globalIterator_]('key')
    }
  }

  /**
   * Get all keys in the Graph
   *
   * @return {Array}
   */
  getAllKeys () {
    return Object.keys(this[_nodes_])
  }

  /**
   * Get all values in the Graph
   *
   * @return {Array}
   */
  getAllValues () {
    return Object.keys(this[_nodes_]).map(node => node.value)
  }

  getPath (fromKey, toKey) {

  }

  getShortestPath (fromKey, toKey) {

  }

}

export default Graph
