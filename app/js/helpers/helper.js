function copy(source, destination){
    if (!destination) {
        destination = source;
        if (source) {
            if (source instanceof Array) {
                destination = copy(source, []);
            } else if (source instanceof Date) {
                destination = new Date(source.getTime());
            } else if (source instanceof RegExp) {
                destination = new RegExp(source.source);
            } else if (source instanceof Object) {
                destination = copy(source, {});
            }
        }
    } else {
        if (source === destination)
            return;
        if (source instanceof Array) {
            destination.length = 0;
            for ( var i = 0; i < source.length; i++) {
                destination.push(copy(source[i]));
            }
        } else {
            for (var key in destination){
                delete destination[key];
            }
            for (var key in source) {
                destination[key] = copy(source[key]);
            }
        }
    }
    return destination;
}