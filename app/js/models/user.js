var User = function(data){
	Model.call(this, data);
};
User.prototype = Object.create(Model.prototype, {
    url: { value : "http://54.72.3.96:3000/attendees/", writable : false }
});