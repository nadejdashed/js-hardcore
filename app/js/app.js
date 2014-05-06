document.addEventListener('click', function(e){
    var target = e.target;
    switch (target.id){
        case "task1":
            task1();
            break;
        case "task2":
            task2();
            break;
    }
});

function task1(){
    var tt = new Techtalk(),
        answersTask1 = [];

    tt.create()
        .then(function(data){
            answersTask1.push("CREATE - Done");
            answersTask1.push(JSON.stringify(data));
            return tt.read(data._id);
        })
        .then(function(data){
            answersTask1.push("READ - Done");
            answersTask1.push(JSON.stringify(data));
            tt.data.title = "New title";
            return tt.edit();
        })
        .then(function(data){
            answersTask1.push("EDIT - Done");
            answersTask1.push(JSON.stringify(data));
            return tt.remove();
        })
        .then(function(){
            answersTask1.push("DELETE - Done");
            document.getElementById('answer').innerHTML = answersTask1.join("\n\n");
        })
        .catch(function(error){
            alert("ERROR - " + error.message);
        });
}

function task2(){
    var tts = new Techtalks();

    tts.read().then(function(collection){
        var tts = collection.data,
            lectorNames = allLectors(tts),
            promises = requestLectors(lectorNames);

        Promise.all(promises).then(function(data){
            var tt, lectorsInTT, lectorInTT,
                answer = [];

            for (var i = 0, length = tts.length; i < length; i++){
                tt = tts[i].data;
                lectorsInTT = tt.lector;

                // Create array with lectors and promises array for lectors
                if (lectorsInTT) {
                    for (var j = 0, length2 = lectorsInTT.length; j < length2; j++){
                        lectorInTT = lectorsInTT[j];
                        lectorsInTT[j] = replaceLector(lectorNames, data, lectorInTT);
                    }
                } else {
                    tt.lector = "Lector is empty";
                }
            }

            document.getElementById('answer').innerHTML = tts.join("\n\n");
        }).catch(function(error){
            alert(error.message);
        });
    });
}

function allLectors(tts){
    var tt, lectorsInTT, lectorInTT,
        lectorNames = [];

    // Go throught all techtalks and create array with all lectors
    for (var i = 0, length = tts.length; i < length; i++){
        tt = tts[i].data;
        lectorsInTT = tt.lector;

        // Create array with lectors and promises array for lectors
        if (lectorsInTT) {
            for (var j = 0, length2 = lectorsInTT.length; j < length2; j++){
                lectorInTT = lectorsInTT[j];
                if (!~lectorNames.indexOf(lectorInTT)){
                    lectorNames.push(lectorInTT);
                }
            }
        }
    }

    return lectorNames;
}

function requestLectors(lectorNames) {
    var lectorPromises = [];

    for (var i = 0, length = lectorNames.length; i < length; i++){
        lectorPromises.push(User.prototype.read(lectorNames[i]));
    }

    return lectorPromises;
}

function replaceLector(lectors, lectorsData, lector){
    var ind = lectors.indexOf(lector),
        answer;
    if (lectorsData[ind].full_name) {
        answer = {
            "full_name" : lectorsData[ind].full_name,
            "email": lectorsData[ind].email[0]
        }
    } else {
        answer = "Lector not found";
    }
    return answer;
}