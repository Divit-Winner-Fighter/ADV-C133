img=""
Status=""
Objects= [ ]
function preload() {
    img=loadImage("dog_cat.jpg")
}
function setup() {
canvas=createCanvas(640,420)
canvas.center();
objectDetector=ml5.objectDetector('cocossd',modelLoaded)
document.getElementById('status').innerHTML="status:detecting objects"
}
function modelLoaded(){
    console.log('model is loaded')
    Status=true
    objectDetector.detect(img,gotResult)
}
function gotResult(error,results){
if (error){
    console.log(error)
}
console.log(results)
Objects=results
}
function draw(){
    image(img,0,0,640,420)
    if(Status != "") {
        for (let i= 0; i < Objects.length; i++) {
            document.getElementById("status").innerHTML="Status; Object Detected"
            fill('#FF0000')
            percent=floor(Objects[i].confidence * 100)
            text(Objects[i].label+" " + percent + "%", Objects[i].x , Objects[i].y);
            noFill();
            stroke('#FF0000');
            rect(Objects[i].x , Objects[i].y , Objects[i].width+15 , Objects[i].height-15)
        }
    }
}