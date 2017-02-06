import taser from 'taser'

const assertNumberOrUndefined = taser(['number', 'undefined'])

const _entries_ = Symbol('values')
const _getParentIndex_ = Symbol('getParentIndex')
const _getLeftChildIndex_ = Symbol('getLeftChildIndex')
const _getRightChildIndex_ = Symbol('getRightChildIndex')
const _swapWithParent_ = Symbol('swapWithParent')
const _siftUp_ = Symbol('siftUp')
const _siftDown_ = Symbol('siftDown')

/**
 * @name Binary Max Heap
 * @constructor
 */
const BinaryMaxHeap = class BinaryMaxHeap {

  constructor () {
    this[_entries_] = []
  }

  /**
   * @name insert
   * @desc Insert item into the heap with a key. The key must be a number.
   * An optional second argument can be inserted for an associated value that
   * can be of any type.
   * @param {Number} key
   * @return {Number} key
   */
  insert (key, value) {
    assertNumberOrUndefined(key)
    this[_entries_].push([key, value])
    return this[_siftUp_](this[_entries_].length - 1)[0]
  }

  /**
   * @name pop
   * @desc Remove the highest (Max) value from the heap and return it
   * @alias popKey
   * @return {Number}
   */
  pop () {
    return this.popKey()
  }

  popEntry () {
    // Swap root and last value
    let rootEntry = this[_entries_][0]
    this[_entries_][0] = this[_entries_].pop()
    // Re-arrange heap
    this[_siftDown_](0)
    return rootEntry
  }

  popKey () {
    return this.popEntry()[0]
  }

  popValue () {
    return this.popEntry()[1]
  }

  getMaxEntry () {
    return this[_entries_][0]
  }

  getMaxKey () {
    return this[_entries_][0][0]
  }

  getMaxValue () {
    return this[_entries_][0][1]
  }

  peek () {
    return this[_entries_][0][0]
  }

  size () {
    return this[_entries_].length
  }

  [_getParentIndex_] (index) {
    if (index % 2 === 0) {
      return Math.floor((index - 1) / 2)
    }
    return Math.floor(index / 2)
  }

  [_getLeftChildIndex_] (index) {
    return Math.floor(2 * index + 1)
  }

  [_getRightChildIndex_] (index) {
    return Math.floor(2 * index + 2)
  }

  [_siftUp_] (index) {
    let parentIndex = this[_getParentIndex_](index)
    let parentKey = this[_entries_][parentIndex] && this[_entries_][parentIndex][0]
    // If heap is unordered
    if (this[_entries_][index][0] > parentKey) { // Max goes on top
      let leftIndex = this[_getLeftChildIndex_](parentIndex)
      let rightIndex = this[_getRightChildIndex_](parentIndex)
      let leftKey = this[_entries_][leftIndex] && this[_entries_][leftIndex][0]
      let rightKey = this[_entries_][rightIndex] && this[_entries_][rightIndex][0]
      if (leftKey !== undefined && rightKey !== undefined) {
        if (leftKey > rightKey) { // Max goes on top
          return this[_swapWithParent_](leftIndex, _siftUp_)
        }
        return this[_swapWithParent_](rightIndex, _siftUp_)
      }
      if (leftKey !== undefined && rightKey === undefined) {
        return this[_swapWithParent_](leftIndex, _siftUp_)
      }
      return this[_entries_][index]
    }
    return this[_entries_][index]
  }

  [_siftDown_] (parentIndex) {
    let parentKey = this[_entries_][parentIndex] && this[_entries_][parentIndex][0]
    let leftIndex = this[_getLeftChildIndex_](parentIndex)
    let rightIndex = this[_getRightChildIndex_](parentIndex)
    let leftKey = this[_entries_][leftIndex] && this[_entries_][leftIndex][0]
    let rightKey = this[_entries_][rightIndex] && this[_entries_][rightIndex][0]
    // If heap is unordered
    if (leftKey > parentKey || rightKey > parentKey) { // Max goes on top
      if (leftKey !== undefined && rightKey !== undefined) {
        if (leftKey > rightKey) { // Max goes on top
          return this[_swapWithParent_](leftIndex, _siftDown_)
        }
        return this[_swapWithParent_](rightIndex, _siftDown_)
      }
      if (leftKey !== undefined && rightKey === undefined) {
        return this[_swapWithParent_](leftIndex, _siftDown_)
      }
      return this[_entries_][parentIndex]
    }
    return this[_entries_][parentIndex]
  }

  [_swapWithParent_] (index, method) {
    let parentIndex = this[_getParentIndex_](index)
    let parentEntry = this[_entries_][parentIndex]
    let childEntry = this[_entries_][index]
    this[_entries_][parentIndex] = childEntry
    this[_entries_][index] = parentEntry
    // Check if original value still needs to be moved up too
    return this[method](parentIndex)
  }

  *[Symbol.iterator] () {
     yield *this.entries()
  }

  *entries () {
     yield *this[_entries_].values()
  }

  *values () {
    for(let value of this[_entries_].values()) {
      yield value[1]
    }
  }

  *keys () {
    for(let value of this[_entries_].values()) {
      yield value[0]
    }
  }
}

export default BinaryMaxHeap
