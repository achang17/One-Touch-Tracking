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
    logPickup(shippingData);
    logLatestActivity(shippingData);
    logLatestLocation(shippingData);
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
    console.log('Package is due for pickup on ' + date.fullString);
}

function logLatestActivity(shippingData) {
    console.log('Activity: ');
    console.log(getLatestActivity(shippingData));
    // console.log('Location: ');
    // console.log(getLatestActivity(shippingData).ActivityLocation.Address);
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

function logTrackingNum(shippingData) {
    console.log('Tracking Number is ' + getTrackingNumber(shippingData));
}