var JSONRequest = (function(){
    return Object.create(AJAX, {
        send: { value: function(method, url, data){
            var options = {"Content-Type": "application/json"};
            return AJAX.send(method, url, JSON.stringify(data), options).then(function(response){
                return response ? JSON.parse(response) : {};
            });
        }}
    });
})();