const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.firstNode = null
  }
  getUnderlyingList() {
    return this.firstNode
  }

  enqueue(value) {
    if (!this.firstNode) {
      this.firstNode = new ListNode(value);
    } else {
      let current = this.firstNode;
      let newNode = new ListNode(value)
      let isAdd = false

      while (!isAdd) {
        if (!current.next) {
          current.next = newNode;
          isAdd = true
        } else {
          current = current.next
        }
      }
    }

  }

  dequeue() {
    let next = this.firstNode.next;
    let returnVal = this.firstNode.value;

    this.firstNode = next;
    return returnVal
  }
}

module.exports = {
  Queue
};
