/**
 * Remove function for DOM elements to allow easier removing later
 */
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

