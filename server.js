var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("port is runninng")

});

//stex kapum en mer classery
Grass = require("./module/grass.js");
GrassEater = require("./module/grassEater.js");
Predator = require("./module/predator.js");
Mutant = require("./module/mutant.js");
Mard = require("./module/mard.js");
//haytarum en zanvacnery
grassArr = [];
grasseaterArr = [];
predatorArr = [];
mardArr = [];
mutantArr = [];

//stexcum en matrix generacnox function
var w = 50;
var h = 60;
var directions = [];

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 100);
            if (r < 20) r = 0;
            else if (r < 50) r = 1;
            else if (r < 60) r = 2;
            else if (r < 80) r = 3;
            else if (r < 90) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}


//stexcum en zangvacic patahakan andam tvox function
Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

//kanchum en genMatrix functiony ev talis en matrix popoxakanin
matrix = genMatrix(w, h);

//stex pptvum en matrix-i mejov u stexcum en objectnery
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y, 1));
        }
        else if (matrix[y][x] == 2) {
            grasseaterArr.push(new GrassEater(x, y, 2));
        }
        else if (matrix[y][x] == 3) {
            predatorArr.push(new Predator(x, y, 3));
        }
        else if (matrix[y][y] == 4) {
            mardArr.push(new Mard(x, y));
        }
        else if (matrix[y][y] == 5) {
            mutantArr.push(new Mutant(x, y));
        }
    }
}

//stexcum en function vor kkanchi objecteri methodnery ev kuxark matrixi masin datan script.js
function drawserever() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].move();
        grasseaterArr[i].mul();
        grasseaterArr[i].eat();
        grasseaterArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].mul();
        predatorArr[i].eat();
        predatorArr[i].die();
    }
    for (var i in mutantArr) {
        mutantArr[i].move();
        mutantArr[i].mul();
        mutantArr[i].eat();
        mutantArr[i].die();
    }
    for (var i in mardArr) {
        mardArr[i].move();
        mardArr[i].mul();
        mardArr[i].eat();
        mardArr[i].die();
    }
    //matrixy uxarkum en clientin
    io.sockets.emit("matrix", matrix);
}


//connectiona stexcum scriptic ekac infoi himan vra script.js i het mousePressed i jamanak
io.on('connection', function (socket) {
    socket.on("Sxmvec", function (arr) {
        var x = arr[0];
        var y = arr[1];



        directions = [];

        var b = 1;
        for (var i = y; i > 0; i--) {
            var t = [x, y - b];
            directions.push(t);
            b++;
        }
        var g = 1;
        for (var i = y; i < matrix.length; i++) {
            var c = [x, y + g];
            directions.push(c);
            g++;
        }
        var d = 1;
        for (var i = x; i > 0; i--) {
            var q = [x - d, y];
            directions.push(q);
            d++;
        }
        var n = 1;
        for (var i = x; i < matrix.length; i++) {
            var p = [x + n, y];
            directions.push(p);
            n++;
        }
        if (matrix[y][x] == 1) {
            for (var i in grassArr) {
                if (y == grassArr[i].y && x == grassArr[i].x) {
                    grassArr.splice(i, 1);
                    break
                }
            }
        }
        else if (matrix[y][x] == 2) {
            for (var i in grasseaterArr) {
                if (y == grasseaterArr[i].y && x == grasseaterArr[i].x) {
                    grasseaterArr.splice(i, 1);
                    break
                }
            }
        }
        else if (matrix[y][x] == 3) {
            for (var i in predatorArr) {
                if (y == predatorArr[i].y && x == predatorArr[i].x) {
                    predatorArr.splice(i, 1);
                    break
                }
            }
        }
        else if (matrix[y][x] == 4) {
            for (var i in mardArr) {
                if (y == mardArr[i].y && x == mardArr[i].x) {
                    mardArr.splice(i, 1);
                    break
                }
            }
        }
        else if (matrix[y][x] == 5) {
            for (var i in mutantArr) {
                if (y == mutantArr[i].y && x == mutantArr[i].x) {
                    mutantArr.splice(i, 1);
                    break
                }
            }
        }
        for (var i in directions) {
            var urishx = directions[i][0];
            var urishy = directions[i][0];
            
            if (matrix[urishy][urishx] == 1) {
                for (var i in grassArr) {
                    if (urishy == grassArr[i].y && urishx == grassArr[i].x) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[urishy][urishx] == 2) {
                for (var i in grasseaterArr) {
                    if (urishy == grasseaterArr[i].y && urishx == grasseaterArr[i].x) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[urishy][urishx] == 3) {
                for (var i in predatorArr) {
                    if (urishy == predatorArr[i].y && urishx == predatorArr[i].x) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[urishy][urishx] == 4) {
                for (var i in mardArr) {
                    if (urishy == mardArr[i].y && urishx == mardArr[i].x) {
                        mardArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[urishy][urishx] == 5) {
                for (var i in mutantArr) {
                    if (urishy == mutantArr[i].y && urishx == mutantArr[i].x) {
                        mutantArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[urishy][urishx] = 0;
            y = urishy;
            x = urishx;
        }
        matrix[y][x] = 0;
    });
});


setInterval(drawserever, 2000);







