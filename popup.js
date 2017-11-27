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

function logPickup(packageName, shippingData) {
    const date = shippingData.PickupDate;
    var month = date.substring(4,6),
        day = date.substring(6,8),
        year = date.substring(0,4);
    console.log(packageName + ' due for pickup on ' + month + '/' + day + '/' + year);
}

function getPackageData(packageName) {
    
}

function savePackageData(packageName, shippingData) {
    var items = {};
    items[packageName] = shippingData; // saves data as val for the key packageName
    chrome.storage.sync.set(items);
}

function makeListRequest(jsonData) {
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
        var upsRequest = getUpsRequest("1Z12345E1305277940");
        makeListRequest(upsRequest);
    });
});