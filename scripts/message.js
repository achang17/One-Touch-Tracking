function getMessage(phoneNum, packageName) {
    return {
        "appid":"17949",
        "to":phoneNum,
        "project":"OneClick",
        "key":"YOUR PACAKGE: " + packageName + " IS DELIVERED",
        "signature":"58c3e1edeb26bff1aa4cddc224f81714",
    }
}

function makeMessageRequest(phoneNum, packageName) {
    var messageData = getMessage(phoneNum, packageName);
    const corsproxy = "https://cors-anywhere.herokuapp.com/";
    const messageurl = "https://api.mysubmail.com/internationalsms/xsend.json";
    var httpRequest = new XMLHttpRequest();

    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        console.log('Status: ' + httpRequest.status);
        console.log(httpRequest.response);
        }
        else {
            console.log(httpRequest.readyState);
        }
    httpRequest.open("POST", corsproxy+messageurl);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(messageData));

}