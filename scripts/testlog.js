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
    logLatestActivity(shippingData);
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

function logLatestActivity(shippingData) {
    console.log('Activity: ');
    console.log(shippingData.latestActivity);
    // console.log('Location: ');
    // console.log(getLatestActivity(shippingData).ActivityLocation.Address);
}

/**
 * Function for testing that logs latest location to check if data is accessed properly
 * 
 * @param {Object} shippingData data to look through for activity
 */
function logLatestLocation(shippingData) {
    console.log('Latest Location was ' + shippingData.latestLocation.fullLocation);
}

function logTrackingNum(shippingData) {
    console.log('Tracking Number is ' + shippingData.trackingNumber);
}