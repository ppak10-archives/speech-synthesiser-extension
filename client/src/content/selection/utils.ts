/**
 * utils.ts
 * Utility functions relevant to selection.
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
      node.parentNode.classList.remove('speakeasy-text-delete');
    }
    if (node?.childNodes) {
      node.childNodes.forEach((childNode) => {
        this.unstyle(childNode)
      });
    }
  };

  toggle = (node) => {
    if (node?.nodeValue) {
      if (node.parentNode.classList.contains(this.className)) {
        node.parentNode.classList.replace(
          this.className,
          'speakeasy-text-delete'
        );
      } else if (node.parentNode.classList.contains('speakeasy-text-delete')) {
        node.parentNode.classList.replace(
          'speakeasy-text-delete',
          this.className
        );
      }
    }
    if (node?.childNodes) {
      node.childNodes.forEach((childNode) => {
        this.toggle(childNode)
      });
    }
  }
}