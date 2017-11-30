/**
 * Parses shipping data from API and reduces it to necessary parts
 * 
 * @param {Object} shippingData whole object from response to parse
 */
function parseShippingData(packageName, trackNum, shippingData) {
    return {
        packageName: packageName,
        trackingNumber: trackNum,
        date: getPickupDate(shippingData),
        latestLocation: getLocation(shippingData),
        status: getLatestActivityStatus(shippingData)
    };
}

/**
 * Parses date given in data and returns object with separate month day and year
 * 
 * @param {Object} shippingData data from which date will be obtained
 */
function getPickupDate(shippingData) {
    var outDate = {};
    if(shippingData.PickupDate === undefined) {
        outDate = {
            month: '00',
            day: '00',
            year: '0000',
            fullDate: 'n/a'
        }
    }
    else {
        var month = shippingData.PickupDate.substring(4, 6),
            day = shippingData.PickupDate.substring(6, 8),
            year = shippingData.PickupDate.substring(0, 4);
        outDate = {
            month: month,
            day: day,
            year: year,
            fullDate: month + '/' + day + '/' + year
        }
    }
    return outDate;
}

/**
 * Gets object for latest Activity regardless of status
 * 
 * @param {Object} shippingData data from which activity will be obtained
 */
function getLatestActivityLocation(shippingData) {
    const packageActivity = shippingData.Package !== undefined ? shippingData.Package.Activity : shippingData.Activity;
    var latestLocation;
    if(Array.isArray(packageActivity)) {
        var mostRecentActivity = packageActivity[0]; // guaranteed to exist if array
        for(var i = 0; i < packageActivity.length; i++) {
            const activity = packageActivity[i];
            if(mostRecentActivity.Date < activity.Date && activity.ActivityLocation !== undefined) {
                mostRecentActivity = activity;
            }
        }
        latestLocation = mostRecentActivity.ActivityLocation;
    }
    else {
        latestLocation = packageActivity.ActivityLocation;
    }
    return latestLocation;
}

/**
 * Gets object for latest status(progress).
 *
 * @param {Object} shippingData data from which activity will be obtained
 */
function getLatestActivityStatus(shippingData) {
    if (shippingData.Package === undefined) {
        return shippingData.CurrentStatus.Description;
    }
    else{
        const packageStatus = shippingData.Package.Activity;
        var latestStatus;
        if(Array.isArray(packageStatus)) {
            var mostRecentActivity = packageStatus[0]; // guaranteed to exist if array
            for(var i = 0; i < packageStatus.length; i++) {
                const activity = packageStatus[i];
                if(mostRecentActivity.Date < activity.Date && activity.Status !== undefined) {
                    mostRecentActivity = activity;
                }
            }
            latestStatus = mostRecentActivity.Status;
        }
        else {
            latestStatus = packageStatus.Status;
        }
        return latestStatus.Description;
    }

}

/**
 * Trims location string to be cleaner and human-readable
 * 
 * @param {string} location object with location data
 */
function getLocationString(location) {
    var outStr = '';
    if(location.city !== undefined) {
        outStr += location.city;
    }
    if(location.stateProvince !== undefined) {
        outStr += ', ' + location.stateProvince;
    }
    if(location.country !== undefined) {
        outStr += ', ' + location.country;
    }
    return outStr;
}

/**
 * Formats location string to be valid in URL for Google Maps
 * 
 * @param {string} locationStr string for full location
 */
function formatForUrl(locationStr) {
    return locationStr.replace(/ /g, '+');
}

/**
 * Gets latest location 
 * 
 * @param {Object} shippingData data from which location will be collected
 */
function getLocation(shippingData) {
    var latestLocation = getLatestActivityLocation(shippingData);
    var addrObj = {};
    if(latestLocation === undefined) {
        addrObj = {
            fullLocation: 'No known location',
            mapsUrl: 'https://maps.google.com/'
        }
    }
    else {
        var location = latestLocation.Address === undefined ? 
            {
                city: latestLocation.City, 
                stateProvince: latestLocation.StateProvinceCode, 
                country: latestLocation.CountryCode
            } :
            {
                city: latestLocation.Address.City,
                stateProvince: latestLocation.Address.StateProvinceCode,
                country: latestLocation.Address.CountryCode
            }
        var locationStr = getLocationString(location);
        addrObj =  {
            fullLocation: locationStr,
            mapsUrl: 'https://www.google.com/maps/place/' + formatForUrl(locationStr) + '/'
        }
    }
    return addrObj;
}

// function interpretProgress(shippingData) {

// }

// function getProgress(shippingData) {

// }