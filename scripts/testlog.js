// HTML MODIFICATION

function showLogDiv(btnName) {
    var div = document.getElementById(btnName + 'Logs');
    div.className = 'shown';
}

// DATA LOGGING

/**
 * Logs whole object
 * 
 * @param {Object} shippingData whole object to log
 */
function logShippingData(shippingData) {
    console.log(shippingData);
}

/**
 * Wrapper that calls all log functions
 * 
 * @param {Object} shippingData data to use for logging
 */
function logAll(shippingData) {
    logPackageName(shippingData);
    logPickupDate(shippingData);
    logLatestLocation(shippingData);
    logTrackingNum(shippingData);
}

function logPackageName(shippingData) {
    console.log('Package name is ' + shippingData.packageName);
}

/**
 * Function for testing that logs date to check if data is accessed properly
 * 
 * @param {string} packageName name of package for which shipping date should be printed
 * @param {Object} shippingData data to look through for date
 */
function logPickupDate(shippingData) {
    var date = shippingData.date;
    console.log('Package is due for pickup on ' + date.fullDate);
}

/**
 * Function for testing that logs latest location to check if data is accessed properly
 * 
 * @param {Object} shippingData data to look through for activity
 */
function logLatestLocation(shippingData) {
    console.log('Latest Location was ' + shippingData.latestLocation.fullLocation);
}

/**
 * Logs tracking number
 * 
 * @param {Object} shippingData data to look through for num
 */
function logTrackingNum(shippingData) {
    console.log('Tracking Number is ' + shippingData.trackingNumber);
}

/**
 * Logs all contents of storage thoroughly for examination to help describe
 * how to iterate on data
 */
function logStorage() {
    chrome.storage.sync.get(null, (items) => { 
        if(items !== undefined && Object.keys(items).length !== 0) {
            for(var item in items) {
                console.log('Name: ' + item);
                console.log('Data: ');
                console.log(items[item]);
            }
        }
        else {
            console.log('Storage is empty');
        }
    });
}

/**
 * Logs all pickup dates in storage as demonstration of getting data from storage
 */
function logAllDates() {
    chrome.storage.sync.get(null, (items) => {
        if(items !== undefined && Object.keys(items).length !== 0) {
            for(var item in items) {
                console.log(item + ' pickup date was ' + items[item].date.fullDate);
            }
        }
    });
}

/**
 * Logs all package names in storage as demonstration of getting data from storage
 */
function logAllNames() {
    chrome.storage.sync.get(null, (items) => {
        if(items !== undefined && Object.keys(items).length !== 0) {
            console.log('Packages in storage:');
            for(var item in items) {
                console.log(item);
            }
        }
    });
}