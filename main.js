song1="";
song2="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
song1_status="";
song2_status="";
scoreRightWrist=0;
scoreLeftWrist=0;
function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}
function setup(){
canvas=createCanvas(600,400);
canvas.center();
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelLoaded);
posenet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('posenet is initialised');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
    scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
    
    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    console.log("leftWristx="+leftwristX+"leftWristy"+leftwristY);
   rightwristX=results[0].pose.rightWrist.x;
   rightwristY=results[0].pose.rightWrist.y;
   console.log("rightWristx"+rightwristX+"rightWristy"+rightwristY);
    }
}
function draw(){
image(video,0,0,600,500);
song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();
    if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

			song2.stop();

		if(song1_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song1.stop();

		if(song2_status == false)
		{
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
		}
	}

}


function play(){
    song1.play();
    song2.play();
    song.setVolume(1);
    song.rate(1);

}
function stop(){
    song1.stop();
    song2.stop();
}
