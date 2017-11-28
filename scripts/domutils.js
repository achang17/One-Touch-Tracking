/**
 * Remove function for DOM elements to allow easier removing later
 */
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}

/**
 * Adds given element to DOM in designated div
 * 
 * @param {Element} element element to add to outdiv
 */
function addToView(element) {
    var outdiv = document.getElementById('outdiv');
    outdiv.appendChild(element);
}

/**
 * Calls callback function after element with given ID loads in DOM
 * 
 * @param {string} elemId id of element for which to wait
 * @param {function} callback function to call after element loads
 */
function afterLoad(elemId, callback) {
    var elem = document.getElementById(elemId);
    if(elem !== undefined) {
        callback(elem);
    }
    else {
        setTimeout(afterLoad(elemId, callback), 50);
    }
}