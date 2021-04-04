//import 'reflect-metadata';
//import 'dotenv/config';
const express = require('express');
const path= require('path');


const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');


app.use("/", (req,res) => {
    res.render("index.html");
});

let messages = [];
io.on('connection',socket=>{
  console.log(`socket connected ${socket.id}`)

  socket.on('sendMessage',data=>{
      messages.push(data);

      socket.emit('previousMessages',messages);

      socket.broadcast.emit('receivedMessage',data);
  })

});

http.listen(3000, () => {
  console.log('o(*￣▽￣*)ブ Server started on port 3000');
});


