// import * as dataUtils from './datautils';

/**
 * Forms JSON data to use in HTTP Request to UPS API using given tracking number
 * 
 * @param {string} trackNum package tracking number to use
 */
function getUpsRequest(trackNum) {
    return {
        "UPSSecurity": {
            "UsernameToken": {
                "Username": "team100",
                "Password": "cs465GroupProj!!!"
            },
            "ServiceAccessToken": {
                "AccessLicenseNumber": "4D37D2165DD18408"
            }
        },

        "TrackRequest": {
            "Request": {
                "RequestOption": "1",
                "TransactionReference": {
                    "CustomerContext": "Track API test"
                }
            },
            "InquiryNumber": trackNum
        }
    }
}

/**
 * Function for testing that logs date to check if data is accessed properly
 * 
 * @param {string} packageName name of package for which shipping date should be printed
 * @param {Object} shippingData data to look through for date
 */
function logPickup(packageName, shippingData) {
    var date = parseDate(shippingData);
    console.log(packageName + ' due for pickup on ' + date.month + '/' + date.day + '/' + date.year);
}

/**
 * Gets data for given package name
 * 
 * @param {string} packageName name of package for which data should be retrieved
 * @param {function(shippingData)} callback function that uses shipping data of given package
 */
function getPackageData(packageName, callback) {
    chrome.storage.sync.get(packageName, (items) => {
        callback(chrome.runtime.lastError() ? null : items[packageName]);
    });
}

/**
 * Saves shipping data given for the specified package name
 * 
 * @param {string} packageName name of package to save with given data
 * @param {Object} shippingData given data to save
 */
function savePackageData(packageName, shippingData) {
    var items = {};
    items[packageName] = shippingData; // saves data as val for the key packageName
    chrome.storage.sync.set(items);
}

/**
 * Makes actual request to UPS API with given data containing tracking number
 * 
 * @param {Object} jsonData data with tracking number to use
 */
function makeListRequest(trackNum) {
    var jsonData = getUpsRequest(trackNum);
    const corsproxy = "https://cors-anywhere.herokuapp.com/";
    const testurl = "https://wwwcie.ups.com/rest/Track";
    const produrl = "https://onlinetools.ups.com/rest/Track";
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            console.log(httpRequest.status);
            const data = (JSON.parse(httpRequest.response)).TrackResponse
            console.log(data);
            savePackageData("TestPackage", data.Shipment);
            logPickup("TestPackage", data.Shipment);
        }
    };
    httpRequest.open("POST", corsproxy + testurl);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(jsonData));
}

document.addEventListener('DOMContentLoaded', () => { // waits for initial HTML doc to be loaded/parsed
    var listbtn = document.getElementById('listData');

    listbtn.addEventListener('click', () => {
        makeListRequest("990728071");
    });
});