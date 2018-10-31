const express=require('express');
const fs=require('fs');
const path=require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'css')));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/html/customMoviePlayer.html'));
});

app.get('/video',function(req,res){
  const videopath='movie/catMovie.mp4';
  let stat=fs.statSync(videopath);
  let fileSize=stat.size;
  let range=req.headers.range;

  if(range){
    let parts=range.replace(/bytes=/,"").split("-");
    let start=parseInt(parts[0],10);
    let end=parts[1] ? parseInt(parts[1],10) : fileSize-1;
    let chunksize=(end-start)+1;

    let file=fs.createReadStream(videopath,{start,end});
    let head={
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206,head);//HTTP Status Codes : Partial Content
    file.pipe(res);
  }else{
    let head={
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200,head);////HTTP Status Codes : Success
    fs.creatReadStream(videopath).pipe(res);
  }
});

app.listen(3000,function(){
  console.log('Listening on port 3000!');
});
