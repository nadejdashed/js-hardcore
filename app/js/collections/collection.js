var Collection = function(model){
    this.model = model || Model;
    this.data = [];
};
Collection.prototype = Object.create(Object.prototype, {
    read: { value : function(){
        var collection = this;
        return REST.read(this.model.prototype.url).then(function(data){
            collection.data = [];
            for (var i = 0, length = data.length; i < length; i++){
                collection.data.push = new collection.model(data[i]);
            }
            return data;
        });
    }}
});