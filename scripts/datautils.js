/**
 * Parses shipping data from API and reduces it to necessary parts
 * 
 * @param {Object} shippingData whole object from response to parse
 */
function parseShippingData(packageName, shippingData) {
    return {
        packageName: packageName,
        date: getDate(shippingData),
        latestActivity: getLatestActivity(shippingData),
        latestLocation: getLocation(shippingData),
        trackingNumber: getTrackingNumber(shippingData)
    };
}

/**
 * Parses date given in data and returns object with separate month day and year
 * 
 * @param {Object} shippingData data from which date will be obtained
 */
function getDate(shippingData) {
    var month = shippingData.PickupDate.substring(4, 6),
        day = shippingData.PickupDate.substring(6, 8),
        year = shippingData.PickupDate.substring(0, 4);
    return {
        month: month,
        day: day,
        year: year,
        fullDate: month + '/' + day + '/' + year
    }
}

/**
 * Gets object for latest Activity regardless of status
 * 
 * @param {Object} shippingData data from wich activity will be obtained
 */
function getLatestActivity(shippingData) {
    const latestActivity = shippingData.Package !== undefined ? shippingData.Package.Activity : 
                           shippingData.Activity[shippingData.Activity.length - 1];
    if(Array.isArray(latestActivity)) {
        return latestActivity[latestActivity.length - 1];
    }
    else {
        return latestActivity;
    }
}

/**
 * Trims location string to be cleaner and human-readable
 * 
 * @param {string} location location string to trim
 */
function trimLocation(locationStr) {
    var outStr = locationStr
    if(outStr.includes('undefined, ')) {
        outStr = outStr.replace(/undefined, /g, ''); // removes intermediate "undefined" labels
    }
    if(locationStr.endsWith('undefined')) {
        outStr = outStr.replace(/undefined/g, ''); // removes undefined + preceding , (", undefined")
    }
    return outStr;
}

function formatForUrl(locationStr) {
    return locationStr.replace(/ /g, '+');
}

/**
 * Gets latest location 
 * 
 * @param {Object} shippingData data from which location will be collected
 */
function getLocation(shippingData) {
    const latestLocation = getLatestActivity(shippingData).ActivityLocation;
    console.log(latestLocation);
    var locationStr = latestLocation.Address === undefined ? 
        latestLocation.City + ', ' + latestLocation.StateProvinceCode + ', '+ latestLocation.CountryCode :
        locationStr = latestLocation.Address.City + ', ' + latestLocation.Address.StateProvinceCode + ', ' + latestLocation.Address.CountryCode
    console.log('LOCATION STR:' + locationStr);
    var addrObj =  {
        fullLocation: trimLocation(locationStr),
        mapsUrl: 'https://www.google.com/maps/place/' + formatForUrl(locationStr) + '/'
    }
    console.log(addrObj);
    console.log(addrObj.fullLocation);
    console.log(addrObj.mapsUrl);
    return addrObj;
}

/**
 * Gets tracking number
 * 
 * @param {Object} shippingData data from which to return number
 */
function getTrackingNumber(shippingData) {
    return shippingData.TrackingNumber;
}

// function interpretProgress(shippingData) {

// }

// function getProgress(shippingData) {

// }