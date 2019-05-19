//knchum enq socket.io ev haytarum en side canvasi hamar
var side = 20;
var socket = io();

 //setup
 function setup() {
    createCanvas(20 * side , 20 * side);
    background('blue');  
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
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("black");
            }
            else if (matrix[y][x] == 4) {
                fill("grow");
            }
            else if (matrix[y][x] == 5) {
                fill("red");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

//yndunuma serveric matrixy ev kanchuma drawMatrix
socket.on("matrix", drawMatrix);

//function event kisata grac serverum el code petqa grvi sa vorpes hushum
//  function mousePressed() {
//     var x = Math.floor(mouseX / side);
//     var y = Math.floor(mouseY / side);
//     arr = [x, y];
//     console.log(arr);
//     socket.emit("Sxmvec", arr)

// }

