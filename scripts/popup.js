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
 * Gets data for given package name
 * 
 * @param {string} packageName name of package for which data should be retrieved
 * @param {function(shippingData)} callback function that uses shipping data of given package
 */
function getShippingData(packageName, callback) {
    chrome.storage.sync.get(packageName, (items) => {
        callback(chrome.runtime.lastError ? null : items[packageName]);
    });
}

/**
 * Saves shipping data given for the specified package name
 * 
 * @param {string} packageName name of package to save with given data
 * @param {Object} shippingData given data to save
 */
function saveShippingData(packageName, shippingData) {
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
            data.Shipment['TrackingNumber'] = trackNum;
            console.log(data);
            saveShippingData("TestPackage", data.Shipment);
        }
    };
    httpRequest.open("POST", corsproxy + testurl);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(jsonData));
}

document.addEventListener('DOMContentLoaded', () => { // waits for initial HTML doc to be loaded/parsed
    var listbtn = document.getElementById('listData');
    var showbtn = document.getElementById('showLogs');
    var mapsbtn = document.getElementById('showMaps');

    listbtn.addEventListener('click', () => {
        makeListRequest("1Z648616E192760718");
        showLogDiv();
    });

    showbtn.addEventListener('click', () => {
        var shippingData = getShippingData("TestPackage", logAll);
    });

    mapsbtn.addEventListener('click', () => {
        getShippingData("TestPackage", function(shippingData) {
            var location = getLocation(shippingData);
            chrome.tabs.create({url: location.mapsUrl});
        });
    });
});