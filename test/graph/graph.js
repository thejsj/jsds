/*jshint mocha:true */
import Graph from '../../lib/graph/graph'
import 'should'
const expect = require('chai').expect

describe('Graph', () => {
  let graph
  beforeEach(() => {
    graph = new Graph()
  })

  describe('addNode', () => {
    it('should insert a single node into the graph', () => {
      graph.addNode('hello', 1)
      graph.getAllKeys().should.eql(['hello'])
    })

    it('should insert a three nodes into the graph', () => {
      graph.addNode('hello', 1)
      graph.addNode('wow', 1, 'hello')
      graph.addNode('great', 1, 'hello')
      graph.getAllKeys().sort().should.eql(['great', 'hello', 'wow'].sort())
    })

    it('should insert a five nodes into the graph, connected to each other', () => {
      graph.addNode('1', 1)
      graph.addNode('2', 1, '1')
      graph.addNode('3', 1, '2')
      graph.addNode('4', 1, '3')
      graph.addNode('5', 1, '4')
      graph.addEdge('1', '5')
      graph.getAllKeys().sort().should.eql(['1', '2', '3', '4', '5'].sort())
    })

    it('should throw an error if a node is added that already exists', () => {
      graph.addNode('1', 1)
      graph.addNode.bind(graph, '1', 1).should.throw()
    })

    it('should throw an error if a node key is not a string', () => {
      graph.addNode.bind(graph, 1, 1).should.throw()
      graph.addNode.bind(graph, [1], 1).should.throw()
    })
  })

  describe('containsNode', () => {
    it('should correctly identify if it contains a node', () => {
      graph.addNode('1', 1)
      graph.containsNode('1').should.equal(true)
    })

    it('should correctly identify if the graph contains a node that was deleted', () => {
      graph.addNode('1', 1)
      graph.removeNode('1')
      graph.containsNode('1').should.equal(false)
    })

    it('should throw an error if the key is not a string', () => {
      graph.addNode('1', 1)
      graph.containsNode.bind(graph, 1).should.throw()
    })
  })

  describe('removeNode', () => {
    it('should correctly remove a node from the graph', () => {
      graph.addNode('1', 1)
      graph.containsNode('1').should.equal(true)
      graph.removeNode('1')
      graph.containsNode('1').should.equal(false)
    })

    it('should correctly remove a node connected to other nodes', () => {
      graph.addNode('1', 1)
      graph.addNode('2', 1, '1')
      graph.addNode('3', 1, '2')
      graph.containsNode('3').should.equal(true)
      graph.removeNode('3')
      graph.containsNode('3').should.equal(false)
    })

    it('should correctly remove all edges from a removed node', () => {
      graph.addNode('1', 1)
      graph.addNode('2', 1, '1')
      graph.addNode('3', 1, '1')
      graph.containsNode('3').should.equal(true)
      graph.getAllEdges('1').should.eql(['2', '3'])
      graph.removeNode('3')
      graph.containsNode('3').should.equal(false)
      graph.getAllEdges('1').should.eql(['2'])
    })
  })

  describe('Edges', () => {
    describe('addEdge', () => {
      it ('should add edges correctly', () => {
        graph.addNode('1', 1)
        graph.addNode('2', 1)
        graph.addEdge('2', '1')
        graph.getAllEdges('1').should.eql(['2'])
        graph.getAllEdges('2').should.eql(['1'])
        graph.haveEdge('1', '2').should.equal(true)
        graph.haveEdge('2', '1').should.equal(true)
      })

      it ('should add multiple edges correctly', () => {
        graph.addNode('1', 1)
        graph.addNode('2', 1)
        graph.addEdge('2', '1')
        graph.getAllEdges('1').should.eql(['2'])
        graph.getAllEdges('2').should.eql(['1'])
        graph.haveEdge('1', '2').should.equal(true)
        graph.haveEdge('2', '1').should.equal(true)
        graph.addNode('3', 1)
        graph.addEdge('3', '1')
        graph.addNode('4', 1)
        graph.addEdge('4', '1')
        graph.addNode('5', 1)
        graph.addEdge('5', '2')
        graph.getAllEdges('1').should.eql(['2', '3', '4'])
        graph.haveEdge('5', '1').should.equal(false)
      })

      it('should not be able to add an edge to itself', () => {
        graph.addNode('1', 1)
        graph.addEdge.bind(graph, '1', '1').should.throw()
      })

      it('should not be able to add an edge to if an edge already exists', () => {
        graph.addNode('1', 1)
        graph.addNode('2', 1)
        graph.addEdge('1', '2')
        graph.addEdge.bind(graph, '1', '2').should.throw()
      })
    })

    describe('removeEdge', () => {
      it ('should remove edges correctly', () => {
        graph.addNode('1', 1)
        graph.addNode('2', 1, '1')
        graph.addNode('3', 1, '1')
        graph.addEdge('3', '2')
        graph.getAllEdges('1').should.eql(['2', '3'])
        graph.getAllEdges('2').should.eql(['1', '3'])
        graph.removeEdge('3', '1')
        graph.getAllEdges('2').should.eql(['1', '3'])
        graph.getAllEdges('1').should.eql(['2'])
      })
    })

    describe('haveEdge', () => {
      it('should correctly check if an edge exists', () => {
        graph.addNode('1', 1)
        graph.addNode('2', 1, '1')
        graph.addNode('3', 1, '1')
        graph.addNode('4', 1, '1')
        graph.addEdge('3', '2')
        graph.haveEdge('3', '1')
        graph.haveEdge('3', '1').should.equal(true)
        graph.haveEdge('3', '2').should.equal(true)
        graph.haveEdge('3', '4').should.equal(false)
      })

      it('should throw an error if a node doesnt exist', () => {
        graph.addNode('1', 1)
        graph.addNode('2', 1, '1')
        graph.haveEdge('2', '1').should.equal(true)
        graph.haveEdge.bind(graph, '3', '1').should.throw()
      })
    })

    describe('getAllEdges', () => {
      it('should correctly check if an edge exists', () => {
        graph.addNode('1', 1)
        graph.addNode('2', 1, '1')
        graph.addNode('3', 1, '1')
        graph.addNode('4', 1, '1')
        graph.addEdge('3', '2')
        graph.getAllEdges('3').should.eql(['1', '2'])
        graph.getAllEdges('1').should.eql(['2', '3', '4'])
        graph.getAllEdges('4').should.eql(['1'])
      })

     it('should return an empty arral if the node has no edges', () => {
        graph.addNode('1', 1)
        graph.getAllEdges('1').should.eql([])
     })
    })

    describe('setEdgeValue/getEdgeValue', () => {
      it('should set and get the value of an edge', () => {
        graph.addNode('1', 1)
        graph.addNode('2', 1)
        graph.addEdge('1', '2', 5)
        graph.getEdgeValue('1', '2').should.equal(5)
        graph.setEdgeValue('1', '2', 7)
        graph.getEdgeValue('1', '2').should.equal(7)
      })

      it('should throw an error if one of the nodes doesnt exist', () => {
        graph.addNode('1', 1)
        graph.getEdgeValue.bind(graph, '1', '2').should.throw()
      })

      it('should throw an error if one of the edges doesnt exist', () => {
        graph.addNode('1', 1)
        graph.addNode('2', 1)
        graph.getEdgeValue.bind(graph, '1', '2').should.throw()
      })

      it('should return undefined if there is an edge with no value', () => {
        graph.addNode('1', 1)
        graph.addNode('2', 1, '1')
        let result = graph.getEdgeValue('1', '2') === undefined
        result.should.equal(true)
      })
    })
  })

  describe('Iterators', () => {
    describe('[Symbols.iterator]', () => {
      it('should iterate over all key/value pairs', () => {
        graph.addNode('1', 0)
        graph.addNode('2', 1, '1')
        graph.addNode('3', 2, '2')
        graph.addNode('4', 3)
        let keys = []
        let values = []
        for (let val of graph) {
          keys.push(val.key)
          values.push(val.value)
        }
        keys.sort().should.eql(['1', '2', '3', '4'].sort())
        values.sort().should.eql([0, 1, 2, 3].sort())
      })
    })

    describe('values', () => {
      it('should iterate over all key/value pairs', () => {
        graph.addNode('1', 2)
        graph.addNode('2', 4, '1')
        graph.addNode('3', 6, '2')
        graph.addNode('4', 8)
        let values = []
        for (let val of graph.values()) {
          values.push(val)
        }
        values.sort().should.eql([2, 4, 6, 8].sort())
      })

      it('should iterate over all adjacent nodes when given a node', () => {
        graph.addNode('1', 2)
        graph.addNode('2', 4, '1')
        graph.addNode('3', 6, '2')
        graph.addNode('4', 8) // should not be visited
        graph.addNode('5', 10, '4')
        graph.addNode('6', 12, '3')
        let values = []
        for (let val of graph.values('1')) {
          values.push(val)
        }
        values.should.eql([2, 4, 6, 12])
      })

      it('should iterate over all adjacent nodes when given a node', () => {
        graph.addNode('0', 0)
        graph.addNode('1.1', 1.1, '0')
        graph.addNode('1.2', 1.2, '0')
        graph.addNode('1.3', 1.3, '0')
        graph.addNode('4', 8) // should not be visited
        graph.addNode('2.1', 2.1, '1.1')
        graph.addNode('2.2', 2.2, '1.2')
        graph.addNode('2.3', 2.3, '1.3')
        graph.addNode('3.1', 3.1, '2.1')
        graph.addNode('3.2', 3.2, '2.2')
        graph.addNode('3.3', 3.3, '2.3')
        let values = []
        for (let val of graph.values('0')) {
          values.push(val)
        }
        values.should.eql([0, 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3])
      })
    })

    describe('keys', () => {
      it('should iterate over all key/value pairs', () => {
        graph.addNode('1', 2)
        graph.addNode('2', 4, '1')
        graph.addNode('3', 6, '2')
        graph.addNode('4', 8)
        let keys = []
        for (let val of graph.keys()) {
          keys.push(val)
        }
        keys.sort().should.eql(['1', '2', '3', '4'].sort())
      })

      it('should iterate over all adjacent nodes when given a node', () => {
        graph.addNode('1', 2)
        graph.addNode('2', 4, '1')
        graph.addNode('3', 6, '2')
        graph.addNode('4', 8)
        graph.addNode('5', 10, '4')
        graph.addNode('6', 12, '3')
        let keys = []
        for (let val of graph.keys('1')) {
          keys.push(val)
        }
        keys.should.eql(['1', '2', '3', '6'])
      })
    })

    describe('valuesDepthFirst', () => {
      it('should iterate over all key/value pairs', () => {
        graph.addNode('1', 2)
        graph.addNode('2', 4, '1')
        graph.addNode('3', 6, '2')
        graph.addNode('4', 8)
        let values = []
        for (let val of graph.valuesDepthFirst()) {
          values.push(val)
        }
        values.sort().should.eql([2, 4, 6, 8].sort())
      })

      it('should iterate over all adjacent nodes when given a node', () => {
        graph.addNode('1', 2)
        graph.addNode('2', 4, '1')
        graph.addNode('3', 6, '2')
        graph.addNode('4', 8)
        graph.addNode('5', 10, '4')
        graph.addNode('6', 12, '3')
        let values = []
        for (let val of graph.valuesDepthFirst('1')) {
          values.push(val)
        }
        values.sort().should.eql([2, 4, 6, 12].sort())
      })
    })

    describe('keysDepthFirst', () => {
      it('should iterate over all key/value pairs', () => {
        graph.addNode('1', 2)
        graph.addNode('2', 4, '1')
        graph.addNode('3', 6, '2')
        graph.addNode('4', 8)
        let keys = []
        for (let val of graph.keysDepthFirst()) {
          keys.push(val)
        }
        keys.sort().should.eql(['1', '2', '3', '4'].sort())
      })

      it('should iterate over all adjacent nodes when given a node', () => {
        graph.addNode('1', 2)
        graph.addNode('2', 4, '1')
        graph.addNode('3', 6, '2')
        graph.addNode('4', 8)
        graph.addNode('5', 10, '4')
        graph.addNode('6', 12, '3')
        let keys = []
        for (let val of graph.keysDepthFirst('1')) {
          keys.push(val)
        }
        keys.sort().should.eql(['1', '2', '3', '6'].sort())
      })
    })

    describe('Shortest Path', () => {
      it('should find a path between connected nodes', () => {
        graph.addNode('1', 2)
        graph.addNode('2', 4, '1')
        graph.addNode('3', 6, '2')
        const shortestPath = graph.getShortestPath('1', '3')
        expect(shortestPath).to.deep.equal(['1', '2', '3'])
      })

      it('should not find a path between unconnected nodes', () => {
        graph.addNode('1', 2)
        graph.addNode('2', 4, '1')
        graph.addNode('3', 6)
        const shortestPath = graph.getShortestPath('1', '3')
        expect(shortestPath).to.equal(null)
      })

      it('should find a shorter path between connected nodes with two paths', () => {
        graph.addNode('1', 2)
        graph.addNode('2', 4, '1')
        graph.addNode('3', 6, '2')
        graph.addNode('4', 6, '3')
        graph.addEdge('4', '2')
        const shortestPath = graph.getShortestPath('1', '4')
        expect(shortestPath).to.deep.equal(['1', '2', '4'])
      })

      it('should find a shorter path when given two longer paths', () => {
        graph.addNode('1', 2)
        graph.addNode('2.1', 4, '1')
        graph.addNode('3.1', 6, '2.1')
        graph.addNode('4.1', 8, '3.1')
        graph.addNode('5.1', 8, '4.1')
        graph.addNode('6.1', 8, '5.1')
        graph.addNode('final', 8, '6.1')
        graph.addNode('2.2', 8, '1')
        graph.addNode('3.2', 8, '2.2')
        graph.addNode('4.2', 8, '3.2')
        graph.addNode('5.2', 8, '4.2')
        graph.addEdge('final', '5.2')
        const shortestPath = graph.getShortestPath('1', 'final')
        expect(shortestPath).to.deep.equal(['1', '2.2', '3.2', '4.2', '5.2', 'final'])
      })

      it('should handle loops', () => {
        graph.addNode('0', 2)
        graph.addNode('1.1', 4, '0')
        graph.addNode('2.1', 4, '0')
        graph.addNode('3.1', 4, '0')
        graph.addNode('3.2', 4, '3.1')
        graph.addNode('4.1', 4, '0')
        graph.addNode('4.2', 6, '4.1')
        graph.addNode('4.3.1', 8, '4.2')
        graph.addNode('4.3.2', 8, '4.2')
        graph.addNode('4.3.3', 8, '4.2')
        graph.addNode('4.4', 8)
        graph.addEdge('4.4', '4.3.1')
        graph.addEdge('4.4', '4.3.2')
        graph.addEdge('4.4', '4.3.3')
        graph.addNode('4.5', 8, '4.4')
        const shortestPath = graph.getShortestPath('0', '4.5')
        expect(shortestPath).to.deep.equal([ '0', '4.1', '4.2', '4.3.1', '4.4', '4.5' ])
      })

      // Actually visits all nodes
      it('should not visit unnecessary nodes', () => {
        graph.addNode('0', 2)
        graph.addNode('1', 2, '0')
        graph.addNode('2', 4, '1')
        graph.addNode('3', 6, '2')
        graph.addNode('4', 6, '3')
        graph.addNode('5', 6, '4')
        graph.addNode('6', 6, '5')
        const shortestPath = graph.getShortestPath('1', '3')
        expect(shortestPath).to.deep.equal(['1', '2', '3'])
      })
    })
  })
})
