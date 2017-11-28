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
 * Gets latest location 
 * 
 * @param {Object} shippingData data from which location will be collected
 */
function getLocation(shippingData, all) {
    if(all === "all") {
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
        const latestLocation = shippingData.Activity[shippingData.Activity.length - 1].ActivityLocation;
        return {
            fullLocation: latestLocation.City + ', ' + latestLocation.StateProvinceCode,
            mapsUrl: 'https://www.google.com/maps/place/' + latestLocation.City 
                   + ',+' + latestLocation.StateProvinceCode + '/'
        }
    }
}