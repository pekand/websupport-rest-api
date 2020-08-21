function getUrl (url, method, data, callback, errorcallback, accessToken) {
    var xhttp = new XMLHttpRequest(callback);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (typeof callback === "function") {
                    callback(JSON.parse(this.responseText));
                }
            } else {
                if (typeof errorcallback === "function") {
                    errorcallback(this.responseText);
                }
            }
        }
    };

    var requestMethod = method;

    if(method == 'json_post'){
        requestMethod = 'post';
    }

    if(method == 'json_put'){
        requestMethod = 'put';
    }

    xhttp.open(requestMethod , url, true);

    var requestData = null;

    if((method == "json_post" || method == "json_put") && typeof data !== "undefined" && data != null) {
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        requestData = JSON.stringify(data);
    }

    if((method == "post" || method == "put") && typeof data !== "undefined" && data != null) {
        
        if(data instanceof FormData){
            //xhttp.setRequestHeader('Content-type', 'multipart/form-data');
            //xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            requestData = data;
        } else {
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            requestData = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    requestData.push(key + '=' + encodeURIComponent(data[key]));
                }
            }

            requestData = requestData.join('&');
        }
    }

    if (typeof accessToken != 'undefined'){
        xhttp.setRequestHeader('AccessToken', accessToken);
    }

    xhttp.send(requestData);
}


