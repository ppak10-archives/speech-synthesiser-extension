/**
 * utils.ts
 * Utility classes and functions used within content script.
 */

export class NodeSelection {
  className: string;

  constructor(className: string) {
    this.className = className;
  }

  style = (node) => {
    if (node?.nodeValue) {
      node.parentNode.classList.add(this.className);
    }
    if (node?.childNodes) {
      node.childNodes.forEach((childNode) => {
        this.style(childNode)
      });
    }
  };

  unstyle = (node) => {
    if (node?.nodeValue) {
      node.parentNode.classList.remove(this.className);
    }
    if (node?.childNodes) {
      node.childNodes.forEach((childNode) => {
        this.unstyle(childNode)
      });
    }
  };
}