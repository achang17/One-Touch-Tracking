/**
 * Remove function for DOM elements to allow easier removing later
 */
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}

/**
 * Constructs HTML div for the added package. Div will wrap buttons and package name
 * 
 * @param {string} packageName name to append to ID tags
 */
function constructPkgDiv(packageName) {
    var pkgdiv = document.createElement('div'); // make div to show data
    pkgdiv.id = packageName;
    pkgdiv.className = 'package';
    pkgdiv.innerHTML =
        '<div class="package">' +
            '<h4>' + packageName + '</h4>' +
        '</div>';
    return pkgdiv;
}

/**
 * Constructs HTML div for the package's buttons. 
 * Div will wrap buttons
 * 
 * @param {string} packageName name to append to ID tags
 */
function constructBtnDiv(packageName) {
    var btndiv = document.createElement('div'); // make div to show data
    btndiv.id = packageName + 'Buttons';
    return btndiv;
}

/**
 * Construct input button for logging to insert into package div
 * 
 * @param {string} packageName name to append to ID tags
 */
function constructLogButton(packageName) {
    var logbtn = document.createElement('input');
    logbtn.id = packageName + 'Logs';
    logbtn.setAttribute('type', "button");
    logbtn.setAttribute('value', "Show Logs");
    logbtn.addEventListener('click', () => {
        var shippingData = getShippingData(packageName, logAll);
    });
    return logbtn;
}

/**
 * Construct input button for linking to map to insert into package div
 * 
 * @param {string} packageName name to append to ID tags
 */
function constructMapsButton(packageName) {
    var mapbtn = document.createElement('input');
    mapbtn.id = packageName + 'Maps';
    mapbtn.setAttribute('type', "button");
    mapbtn.setAttribute('value', "Show Location");
    mapbtn.addEventListener('click', () => {
        getShippingData(packageName, (shippingData) => {
            var location = getLocation(shippingData);
            chrome.tabs.create({url: location.mapsUrl});
        });
    });
    return mapbtn;
}

function addToView(element) {
    var outdiv = document.getElementById('outdiv');
    outdiv.appendChild(element);
}

/**
 * Gets tracking data for the given package from UPS API
 * and creates a div to represent test items for package in popup
 * 
 * @param {string} packageName name of package added
 * @param {string} trackNum tracking number for new package
 */
function addPackage(packageName, trackNum) {
    makeListRequest(packageName, trackNum);     // UPS API call to get tracking data
    var pkgdiv = constructPkgDiv(packageName);
    var btndiv = constructBtnDiv(packageName);
    var logbtn = constructLogButton(packageName);
    var mapbtn = constructMapsButton(packageName);
    pkgdiv.appendChild(btndiv);
    btndiv.appendChild(logbtn);
    btndiv.appendChild(mapbtn);
    addToView(pkgdiv);
}

/**
 * Removes given package from the storage and also 
 * removes the div from the DOM
 * 
 * @param {string} packageName name of package to remove
 */
function removePackage(packageName) {
    chrome.storage.sync.remove(packageName, () => {     // remove from storage
        document.getElementById(packageName).remove(); // remove div
    });
}