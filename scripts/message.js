
function makeMessageRequest() {
    
    var form = new FormData();
    form.append("appid", "60153");
    form.append("to", "+18722020536");
    form.append("project", "lUwXU2");
    form.append("signature", "b647f1329f0fcbbf31d19ed0bf0addf9");
    
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.mysubmail.com/internationalsms/xsend",
    "method": "POST",
    "headers": {
    "cache-control": "no-cache",
    "postman-token": "0f78989d-310f-7e4a-e328-7fd14ded796d"
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
    }
    
    $.ajax(settings).done(function (response) {
    console.log(response);
    });
    
/*
    var httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "https://api.mysubmail.com/internationalsms/xsend");
    //httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(form);
*/
}