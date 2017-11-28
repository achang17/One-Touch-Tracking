/**
 * Parses date given in data and returns object with separate month day and year
 * 
 * @param {Object} shippingData data from which date will be obtained
 */
function parseDate(shippingData) {
    var month = shippingData.PickupDate.substring(4,6),
    day = shippingData.PickupDate.substring(6,8),
    year = shippingData.PickupDate.substring(0,4);
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
    if(shippingData.Activity === undefined) {
        return shippingData.Package.Activity
    }
    else {
        return shippingData.Activity;
    }
}

/**
 * Gets latest location 
 * 
 * @param {Object} shippingData data from which location will be collected
 */
function getLocation(shippingData, all) {
    if(all === "all" && shippingData.Activity !== undefined) {
        const allActivity = shippingData.Activity;
        var locationList = [];
        for(var i = 0; i < allActivity.length; i++) {
            const location = allActivity[i].ActivityLocation;
            var addrObj = {
                fullLocation: location.City + ', ' + location.StateProvinceCode,
                mapsUrl: 'https://www.google.com/maps/place/' + location.City 
                        + ',+' + location.StateProvinceCode + '/'
            }
            locationList.push(addrObj);
        }
        return locationList;
    }
    else {
        const latestLocation = getLatestActivity(shippingData).ActivityLocation;
        if(latestLocation.CountryCode === undefined) {
            return {
                fullLocation: latestLocation.City + ', ' + latestLocation.StateProvinceCode,
                mapsUrl: 'https://www.google.com/maps/place/' + latestLocation.City 
                       + ',+' + latestLocation.StateProvinceCode + '/'
            }
        }
        else {
            return {
                fullLocation: latestLocation.CountryCode,
                mapsUrl: 'https://www.google.com/maps/place/' + latestLocation.CountryCode + '/'
            }
        }
    }
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