var Techtalk = function(data){
    var _defaultData = {
        "date": "4/21/2014",
        "title": "AJAX",
        "lector": [
            "alena_karaba"
        ],
        "location": "K1/3",
        "description": "some description",
        "level": "D1-D5",
        "notes": "",
        "attendees": [
            "alena_karaba"
        ],
        "tags": [
            "ajax",
            "xmlhttprequest",
            "promises"
        ]
    };

    Model.call(this, data || _defaultData);
};
Techtalk.prototype = Object.create(Model.prototype, {
    url: { value : "http://54.72.3.96:3000/techtalks/", writable : false },
    toString: { value : function(){
        return [this.data._id, this.data.title, JSON.stringify(this.data.lector)].join(" - ");
    }}
});