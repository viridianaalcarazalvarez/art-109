
let canvas;

function setup(){
canvas = createCanvas(windowWidth, windowHeight, WEBGL);   canvas.position(0,0);
canvas.style("z-index", -2);
angleMode(DEGREES);
    //background(125);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);}

function draw(){
    myThing();
}

function myThing(){ 
    background(255)

    rotateX(60)

    noFill()
    stroke(0)

    for (var i = 0; i < 20; i++) {

        var r = map(sin(frameCount * 0.05), -1, 1, 0, 255)
        var g = map(i, 0, 20, 0 ,255)
        var b = map(cos(frameCount),-1, 1, 255, 0)

        beginShape()
        for (var j = 0; j < 360; j += 10) {
            var rad = i * 8
            var x = rad * cos(j)
            var y = rad * sin(j)
            var z = sin(frameCount * 2 + i * 10) * 50

            vertex(x, y, z);
        }
        endShape(CLOSE)
    }

}