var Model = function(data){
    this.data = data;
};
Model.prototype = Object.create(Object.prototype, {
    read: { value : function(id){
        var model = this;
        return REST.read(this.url, id).then(function(data){
            model.data = data;
            return data;
        });
    }},
    create: { value : function(){
        return REST.create(this.url, this.data);
    }},
    edit: { value : function(){
        var data = copy(this.data);
        delete data._id;
        return REST.edit(this.url, this.data._id, data);
    }},
    remove: { value : function(){
        return REST.remove(this.url, this.data._id);
    }}
});