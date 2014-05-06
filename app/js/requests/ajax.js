var AJAX = (function(){
    return Object.create(Object.prototype, {
        send: { value: function(method, url, data, options){
            var request = new XMLHttpRequest();

            request.open(method, url, true);
            for(var key in options) {
                request.setRequestHeader(key, options[key]);
            }
            request.send(data);

            return new Promise(function(resolve, reject){
                request.onreadystatechange = function() {
                    if (request.readyState == 4) {
                        if (request.status == 200) {
                            resolve(request.responseText);
                        } else {
                            reject(request.statusText)
                        }
                    }
                };
            })
        }}
    });
})();