video = "";
status = "";
objects = [];
function preload(){
    video = createVideo("video.mp4");

}

function setup(){
canvas = createCanvas(480, 380);
canvas.center();
video.hide();
}

function draw(){
image(video, 0, 0, 480, 380)

if (status != ""){
    objectDetector.detect(video, gotResults);
    for (i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status: Objects have been detected"
        document.getElementById("nob").innerHTML = "Number of Objects: "+objects.length;
        fill(255, 0, 0);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label +" "+ percent +"%", objects[i].x, objects[i].y);
        noFill();
        stroke(255, 0, 0);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting objects!"
}

function modelLoaded(){
console.log("CocoSSD has been prepared to identify objects!");
status = true;
video.speed(1);
video.volume(0);
video.loop();
}

function gotResults(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}