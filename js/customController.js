var videoNode = document.getElementById("myVideo");
videoNode.onseeking = function(){
  currentTime = Math.round(videoNode.currentTime);
  minute = Math.floor(currentTime / 60);
  second = currentTime % 60;
  if(second<10)second = '0' + second;
  document.getElementById("playTimeMinute").innerHTML=minute;
  document.getElementById("playTimeSecond").innerHTML=second;
};

var playBtnNode = document.getElementById("play");
playBtnNode.onclick = function(){
  if(videoNode.paused){
    videoNode.play();
    this.innerHTML = "pause";
  }else{
    videoNode.pause();
    this.innerHTML = "play";
  }
};

var currNotifierNode = document.getElementById("currentTimeNotifier");
var nextBtnNode = document.getElementById("next");
nextBtnNode.onclick = function(){
  if(videoNode.duration > videoNode.currentTime){
    videoNode.currentTime += 2;//not operated on server
    //currNotifierNode.style.marginLeft = relativeMarginCal(videoNode.currentTime)+"px";
    currNotifierNode.style.width = (relativeMarginCal(videoNode.currentTime)+10)+"px";
  }
  

};
var previousBtnNode = document.getElementById("previous");
previousBtnNode.onclick = function(){
  if(videoNode.currentTime > 0){
    videoNode.currentTime -= 2;
    //currNotifierNode.style.marginLeft = relativeMarginCal(videoNode.currentTime)+"px";
    currNotifierNode.style.width = (relativeMarginCal(videoNode.currentTime)+10)+"px";
  }
};
function relativeMarginCal(currentTime){
  var ratio = videoNode.currentTime / videoNode.duration;
  var relativeMargin = 310 * ratio;
  return relativeMargin;
}
function widthPixelToNum(width){
  return Number(width.slice(0,width.indexOf("p")));
}
