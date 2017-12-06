function getMessage() {
    return {
        "appid":"17949"
        "to":"+18722020536"
        "project":"OneClick"
        "signature":"58c3e1edeb26bff1aa4cddc224f81714"
    }
}

function makeListRequest() {
    var messageData = getMessage();
    const messageurl = "https://api.mysubmail.com/internationalsms/xsend.json";
    var httpRequest = new XMLHttpRequest();
    
    httpRequest.open("POST", messageurl);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(jsonData));
}