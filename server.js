const express = require('express');
const app = express()
const http = require('http').Server(app);
const path = require("path")
const httpPort = 80;
const mongoose = require('mongoose');
const indexRoutes = require("./routes/index.js")
const cors = require("cors")
const fs = require("fs")


mongoose.connect('mongodb+srv://admin:vulachi123@cluster0.ldesk.mongodb.net/demoDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

///////////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use(express.static(path.join(__dirname, '../frontend/dist/frontend')))
app.use(indexRoutes);
// app.get('/static/images/:name',function(req,res) {
//   res.sendFile(path.join(__dirname, './resources/images/'+req.params.name))
// })
// app.get('/static/contents/:name',function(req,res) {
//   if (fs.existsSync(path.join(__dirname, './resources/item-images/'+req.params.name))) {
//     res.sendFile(path.join(__dirname, './resources/item-images/'+req.params.name))
//   } else {
//     res.sendFile(path.join(__dirname, './resources/images/nophoto.jpg'))
//   }
// })
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist/frontend'))
})
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname, '../frontend/dist/frontend/index.html'))
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist/frontend/index.html'))
})

///////////////////////////////////////////////////////////////

http.listen(httpPort, function () {
  console.log(`Listening on port ${httpPort}!`)
})

///////////////////////////////////////////////////////////////

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected")
});