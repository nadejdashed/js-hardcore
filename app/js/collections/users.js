var Users = function(){
    Collection.call(this, User);
};
Users.prototype = Object.create(Collection.prototype);