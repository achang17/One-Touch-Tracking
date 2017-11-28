// HTML MODIFICATION

function showLogDiv() {
    var div = document.getElementById('logs');
    div.className = 'shown';
}



// DATA LOGGING

/**
 * Wrapper that calls all log functions
 * 
 * @param {Object} shippingData data to use for logging
 */
function logAll(shippingData) {
    logPickup(shippingData);
    logLatestLocation(shippingData);
    logAllLocations(shippingData);
    logTrackingNum(shippingData);
}

/**
 * Function for testing that logs date to check if data is accessed properly
 * 
 * @param {string} packageName name of package for which shipping date should be printed
 * @param {Object} shippingData data to look through for date
 */
function logPickup(shippingData) {
    var date = parseDate(shippingData);
    console.log('Package is due for pickup on ' + date.month + '/' + date.day + '/' + date.year);
}

/**
 * Function for testing that logs latest location to check if data is accessed properly
 * 
 * @param {Object} shippingData data to look through for activity
 */
function logLatestLocation(shippingData) {
    var latestLocation = getLocation(shippingData);
    console.log('Latest Location was ' + latestLocation.fullLocation);
}

/**
 * Function for testing that logs all locations to check if data is returned properly
 * 
 * @param {Object} shippingData data to look through for activity
 */
function logAllLocations(shippingData) {
    var locations = getLocation(shippingData, "all");
    console.log('Package has been to ');
    for(var i = 0; i < locations.length; i++) {
        console.log(locations[i].fullLocation);
    }
}

function logTrackingNum(shippingData) {
    console.log('Tracking Number is ' + getTrackingNumber(shippingData));
}