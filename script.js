//knchum enq socket.io ev haytarum en side canvasi hamar
var side = 20;
var socket = io();

var weatherclient = "Summer";
socket.on("exanak",function(w){
    weatherclient=w;
})
 //setup
 function setup() {
    createCanvas(20 * side , 20 * side);
    background('blue');  
 }
 function drawWeather(w){
     var p =document.getElementById('seasons');
     var weather=w;
     console.log(weather);
     if(weather=="Summer"){
         p.innerText="Summer";
     }
     else if(weather=="Winter"){
        p.innerText="Winter";
    }
    else if(weather=="Autumn"){
        p.innerText="Autumn";
    }
    else if(weather=="Spring"){
        p.innerText="Spring";
    }
 }
 //nuyn draw functiony uxaki serveric ekac matrixi hashvin 
 function drawMatrix(matrix) {
    background('grey'); 

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("grey");
            }
            else if (matrix[y][x] == 1) {            
               if(weatherclient=="Summer"){
                   fill("#008a00");
               }
               else if(weatherclient!="Summer"){
                   fill("#5b7d2d");
               }
            }
            else if (matrix[y][x] == 2) {
                if(weatherclient=="Summer"||weatherclient=="Winter"){
                    fill("#ffff00");
                }
                else {
                    fill(" #804000");
                }
            }
            else if (matrix[y][x] == 3) {
                if(weatherclient=="Autumn"||weatherclient=="Spring"){
                    fill(" #ff0000");
                }
                else {
                    fill(" #ff8080");
                }
            }
            else if (matrix[y][x] == 4) {
                if(weatherclient=="Autumn"||weatherclient=="Spring"){
                    fill("#585858");
                }
                else if(weatherclient=="Sammer"){
                    fill("#FFFFFF");
                }
                else if (weatherclient=="Winter"){
                    fill("#000000");
                }
            }
            else if (matrix[y][x] == 5) {
                fill("red");
            }
            else if (matrix[y][x] == 6){
                fill("#000066");
            }
            else if(matrix[y][x] == 88){
                fill("#blue");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

function FireButton() {
    socket.emit("armagedon");
}
//yndunuma serveric matrixy ev kanchuma drawMatrix
socket.on("matrix", drawMatrix);
socket.on("exanak",drawWeather);
//function event kisata grac serverum el code petqa grvi sa vorpes hushum
 function mousePressed() {
    var x = Math.floor(mouseX / side);
    var y = Math.floor(mouseY / side);
    arr = [x, y];
    console.log(arr);
    socket.emit("Sxmvec", arr)
 }

