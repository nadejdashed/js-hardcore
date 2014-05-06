var REST = (function(){
    function createUrl(url, id){
        return id ? (url + id) : url;
    }

    return Object.create(JSONRequest, {
        read: { value : function(url, id){
            return this.send('GET', createUrl(url, id));
        }},
        create: { value : function(url, data){
            return this.send('POST', createUrl(url), data);
        }},
        edit: { value : function(url, id, data){
            return this.send('PUT', createUrl(url, id), data);
        }},
        remove: { value : function(url, id){
            return this.send('DELETE', createUrl(url, id));
        }},
        readAll: { value : function(url){
            return this.send('GET', createUrl(url));
        }}
    });
})();