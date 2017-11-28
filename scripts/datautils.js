/**
 * Parses date given in data and returns object with separate month day and year
 * 
 * @param {Object} shippingData data from which date will be obtained
 */
function parseDate(shippingData) {
    var month = shippingData.PickupDate.substring(4, 6),
        day = shippingData.PickupDate.substring(6, 8),
        year = shippingData.PickupDate.substring(0, 4);
    return {
        month: month,
        day: day,
        year: year
    }
}

/**
 * Gets object for latest Activity regardless of status
 * 
 * @param {Object} shippingData data from wich activity will be obtained
 */
function getLatestActivity(shippingData) {
    if (shippingData.Package !== undefined) {
        return shippingData.Package.Activity
    }
    else {
        return shippingData.Activity[shippingData.Activity.length - 1];
    }
}

/**
 * Trims location string to be cleaner and human-readable
 * 
 * @param {string} location location string to trim
 */
function trimLocation(location) {
    var outstr;
    if(location.includes('undefined, ')) {
        outstr = location.replace('undefined, ', ''); // removes intermediate "undefined" labels
    }
    else if(location.endsWith('undefined')) {
        outstr = location.slice(0, -11); // removes undefined + preceding , (", undefined")
    }
    return outstr;
}

/**
 * Gets latest location 
 * 
 * @param {Object} shippingData data from which location will be collected
 */
function getLocation(shippingData) {
    const latestLocation = getLatestActivity(shippingData).ActivityLocation;
    var addrObj;
    if (latestLocation.Address === undefined) {
        addrObj =  {
            fullLocation: latestLocation.City + ', ' 
                        + latestLocation.StateProvinceCode + ', '
                        + latestLocation.CountryCode,
            mapsUrl: 'https://www.google.com/maps/place/' + latestLocation.City
                + ',+' + latestLocation.StateProvinceCode + '/'
        }
    }
    else {
        addrObj = {
            fullLocation: latestLocation.Address.City + ', ' 
            + latestLocation.Address.StateProvinceCode + ', '
            + latestLocation.Address.CountryCode,
            mapsUrl: 'https://www.google.com/maps/place/'
        }
    }
    addrObj.fullLocation = trimLocation(addrObj.fullLocation);
    addrObj.mapsUrl += addrObj.fullLocation.replace(', ', ',+') + '/';
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