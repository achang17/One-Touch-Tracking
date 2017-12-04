/**
 * Removes spaces from package name. Open to further formatting
 * 
 * @param {string} packageName package name to format
 */
function formatPackageName(packageName) {
    return packageName.replace(/ /g, '_');
}

/**
 * Re-adds spaces to package name for presenting in DOM
 * 
 * @param {string} packageName package name to format
 */
function cleanPackageName(packageName) {
    return packageName.replace(/_/g, ' ');
}

/**
 * Constructs HTML div for the added package. Div will wrap buttons and package name
 * 
 * @param {string} packageName name to append to ID tags
 */
function constructPkgDiv(packageName) {
    var packageNameClean = cleanPackageName(packageName);
    var pkgdiv = document.createElement('div'); // make div to show data
    pkgdiv.id = packageName;
    pkgdiv.className = 'package';
    pkgdiv.innerHTML =
        '<div class="package">' +
            '<h4>' + packageNameClean + '</h4>' +
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
    btndiv.className = 'btndiv';
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
    logbtn.className = 'logbtn';
    logbtn.setAttribute('type', "image");
    logbtn.setAttribute('value', "Show Logs");
    logbtn.setAttribute('src', "https://cdn3.iconfinder.com/data/icons/lexter-flat-colorfull-file-formats/56/log-128.png")
    logbtn.addEventListener('click', () => {
        getShippingData(packageName, logAll);
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
    mapbtn.className = 'mapbtn';
    mapbtn.setAttribute('type', "image");
    mapbtn.setAttribute('value', "Show Location");
    mapbtn.setAttribute('src', "https://freeiconshop.com/wp-content/uploads/edd/location-map-flat.png");
    mapbtn.addEventListener('click', () => {
        getShippingData(packageName, (shippingData) => {
            chrome.tabs.create({url: shippingData.latestLocation.mapsUrl});
        });
    });
    return mapbtn;
}

/**
 * Construct input button for removing the package from storage and the DOM
 * 
 * @param {string} packageName name to append to ID tags
 */
function constructRmvButton(packageName) {
    var rmvbtn = document.createElement('input');
    rmvbtn.id = packageName + 'Remove';
    rmvbtn.className = 'rmvbtn';
    rmvbtn.setAttribute('type', "image");
    rmvbtn.setAttribute('value', "Remove Package");
    rmvbtn.setAttribute('src', "http://icons.iconarchive.com/icons/custom-icon-design/flatastic-4/128/Package-delete-icon.png")
    rmvbtn.addEventListener('click', () => {
        removePackage(packageName);
    });
    return rmvbtn;
}

/**
 * Construct div in which data will be shown in DOM when logged
 * 
 * @param {string} packageName name to append to ID tags
 */
function constructDataDiv(packageName) {
    var datdiv = document.createElement('div');
    datdiv.id = packageName + 'Data';
    datdiv.className = 'datdiv';
    return datdiv;
}

/**
 * Tries to get the saved data for the package after the data
 * from the API call has been saved. Always called after Package's
 * HTML div has been created and added to view to ensure div exists
 * 
 * @param {string} packageName name of package for which to get data
 */
function tryDisplayData(packageName) {
    afterLoad(packageName + 'Data', (datdiv) => {
        getAfterSave(packageName, (shippingData) => {
            console.log('GOT DATA!');
            datdiv.innerHTML +=
                '<img src="' + interpretStatus(shippingData).img + '" alt="' + 
                interpretStatus(shippingData).alt + '" height="20" width="20"> ';
            datdiv.innerHTML += '<p>Tracking Number: ' + shippingData.trackingNumber + '</p>';
            datdiv.innerHTML += '<p>Date Picked Up: ' + shippingData.date.fullDate + '</p>';
            datdiv.innerHTML += '<p>Location: ' + shippingData.latestLocation.fullLocation+ '</p>';
            datdiv.innerHTML += '<p>Status: ' + shippingData.status+ '</p>';

        });
    });
}

function displayList() {
    chrome.storage.sync.get(null, (items) => {
        if(items !== undefined && Object.keys(items).length !== 0) {
            for(var item in items) {
                pkgdiv = makePackageHtml(item); // Create and get div
                addToView(pkgdiv); // Add package div to main view
                tryDisplayData(item); // Display shipping data in view
            }
        }
    });
}

/**
 * Builds and returns all HTML components for the package
 * 
 * @param {string} packageName name of package to construct HTML for
 */
function makePackageHtml(packageName) {
    // Make individual components of package DOM items
    var pkgdiv = constructPkgDiv(packageName);
    var btndiv = constructBtnDiv(packageName);
    var logbtn = constructLogButton(packageName);
    var mapbtn = constructMapsButton(packageName);
    var rmvbtn = constructRmvButton(packageName);
    var datdiv = constructDataDiv(packageName);
    // Add components into main package div
    pkgdiv.appendChild(datdiv);
    pkgdiv.appendChild(btndiv);

    btndiv.appendChild(logbtn);
    btndiv.appendChild(mapbtn);
    btndiv.appendChild(rmvbtn);
    return pkgdiv;
}

/**
 * Gets tracking data for the given package from UPS API
 * and creates a div to represent test items for package in popup
 * 
 * @param {string} packageName name of package added
 * @param {string} trackNum tracking number for new package
 */
function addPackage(packageName, trackNum) {
    if(packageName.includes(' ')) {
        packageName = formatPackageName(packageName);
    }
    // UPS API call to get tracking data
    makeListRequest(packageName, trackNum);
    // Add html component dynamically
    pkgdiv = makePackageHtml(packageName);
    addToView(pkgdiv);
    tryDisplayData(packageName);
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
        console.log('Removed ' + packageName);
    });
}