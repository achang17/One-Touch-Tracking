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
 * Gets data from storage but waits to make sure it has been saved first
 * 
 * @param {string} packageName package name to load
 * @param {function} callback function to be called after data is obtained
 */
function getAfterSave(packageName, callback) {
    chrome.storage.sync.get(packageName, (items) => {
        if(items !== undefined && items[packageName] !== undefined) { // check if item has been saved
            callback(items[packageName]);
        }
        else { // Try again after short wait
            setTimeout(function() {getAfterSave(packageName, callback)}, 50);
        }
    });
}

/**
 * Makes actual request to UPS API with given data containing tracking number
 * 
 * @param {Object} jsonData data with tracking number to use
 */
function makeListRequest(packageName, trackNum) {
    var jsonData = getUpsRequest(trackNum);
    const corsproxy = "https://cors-anywhere.herokuapp.com/";
    const testurl = "https://wwwcie.ups.com/rest/Track";
    const produrl = "https://onlinetools.ups.com/rest/Track";
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            console.log('Status: ' + httpRequest.status);
            const data = (JSON.parse(httpRequest.response)).TrackResponse;
            if(data === undefined) {
                saveShippingData(packageName, {
                    packageName: packageName,
                    trackingNumber: trackNum,
                    date: { month: '00', day: '00', year: '0000', fullDate: 'n/a' },
                    latestLocation: { fullLocation: 'n/a', mapsUrl: '' },
                    status: 'Package not found'
                });
            }
            else {
                console.log(data.Shipment);
                const reducedData = parseShippingData(packageName, trackNum, data.Shipment);
                saveShippingData(packageName, reducedData);
            }
        }
    };
    httpRequest.open("POST", corsproxy + testurl);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(jsonData));
}

document.addEventListener('DOMContentLoaded', () => { // waits for initial HTML doc to be loaded/parsed
    var addform = document.getElementById('addform');
    var clearbtn = document.getElementById('clearbtn');
    displayList();

    addform.addEventListener('submit', (evt) => {
        evt.preventDefault();
        var packageName = evt.target.elements.packageName.value;
        var trackNum = evt.target.elements.trackNum.value;
        addPackage(packageName, trackNum);
        addform.reset();
    });
    clearbtn.addEventListener('click', () => {
        clearStorage();
    });

    // var teststorage = document.getElementById('teststorage');
    // var logdates = document.getElementById('logdates');
    // var lognames = document.getElementById('lognames');
    // teststorage.addEventListener('click', () => {
    //     logStorage();
    // });
    // logdates.addEventListener('click', () => {
    //     logAllDates();
    // });
    // lognames.addEventListener('click', () => {
    //     logAllNames();
    // });
});