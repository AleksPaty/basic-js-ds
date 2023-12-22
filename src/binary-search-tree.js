const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode
  }

  add(data) {
    const node = new Node(data);
    if (!this.rootNode) {
      this.rootNode = node
    } else {
      let currentNode = this.rootNode;
      let isAdd = false;

      while (!isAdd) {
        if (data === currentNode.data) return;

        if (data > currentNode.data) {
          if (!currentNode.right) {
            currentNode.right = node;
            isAdd = true 
          } else {
            currentNode = currentNode.right
          }
        } else {
          if (!currentNode.left) {
            currentNode.left = node;
            isAdd = true
          } else {
            currentNode = currentNode.left
          }
        }
      }
    }
  }

  has(data) {
    let currentNode = this.rootNode;
    let found = false;
    let isEnd = false;
    do {
      if (data === currentNode.data) found = true;

      if(data > currentNode.data && currentNode.right) {
        currentNode = currentNode.right
      } else if (data < currentNode.data && currentNode.left) {
        currentNode = currentNode.left
      } else {
        isEnd = true
      }
    } while (!found && !isEnd)

    return found
  }

  find(data) {
    let currentNode = this.rootNode;
    let foundNode = null;
    let isEnd = false;

    do {
      if (data === currentNode.data) foundNode = currentNode;

      if(data > currentNode.data && currentNode.right) {
        currentNode = currentNode.right
      } else if (data < currentNode.data && currentNode.left) {
        currentNode = currentNode.left
      } else {
        isEnd = true
      }
    } while (foundNode === null && !isEnd)

    return foundNode
  }

  remove(data) {
    let currentNode = this.rootNode;
    let movingNode;
    let movingSide;
    let parentNode = null;
    let isFind = false;
    let isEnd = false;

    do {
      if (data === currentNode.data) {
        isFind = true 
      }

      if(data > currentNode.data && currentNode.right) {
        parentNode = currentNode;
        currentNode = currentNode.right;
        movingSide = 'right'
      } else if (data < currentNode.data && currentNode.left) {
        parentNode = currentNode;
        currentNode = currentNode.left;
        movingSide = 'left'
      } else {
        isEnd = true
      }
    } while (!isFind && !isEnd)

    if (parentNode) {
      if (currentNode.right && currentNode.left) {
        movingNode = currentNode.right;
        let lastleftChild = movingNode.left ? movingNode.left : null;

        let isDeepest = false;
        while (!isDeepest && lastleftChild) {
          if (lastleftChild.left) lastleftChild = lastleftChild.left;
          if (!lastleftChild.left) isDeepest = true
        }

        lastleftChild
          ? lastleftChild.left = currentNode.left
          : movingNode.left = currentNode.left

      } else if (currentNode.right || currentNode.left) {
        movingNode = currentNode.right || currentNode.left
      } 
      
      parentNode[movingSide] = movingNode;
    } else {
      movingNode = currentNode.right || currentNode.left;
      movingNode.left 
          ? movingNode.left.left = currentNode.left
          : movingNode.left = currentNode.left
      this.rootNode = movingNode;
    }
  }

  min() {
    let currentNode = this.rootNode;
    let isEnd = false;

    while (!isEnd) {
      if (currentNode.left) currentNode = currentNode.left;
      if (!currentNode.left) isEnd = true
    }
    return currentNode.data
  }

  max() {
    let currentNode = this.rootNode;
    let isEnd = false;

    while (!isEnd) {
      if (currentNode.right) currentNode = currentNode.right;
      if (!currentNode.right) isEnd = true
    }
    return currentNode.data
  }
}

module.exports = {
  BinarySearchTree
};