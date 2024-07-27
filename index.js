const express = require('express');
var http = require("http");
const { emit } = require('process');
const app = express();

const PORT = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.json());



var clients = {};
// app.use(cors());
//192.168.31.194
io.on("connection", (socket) => {
  console.log("connected");
  console.log(`${socket.id} has joined`);
  socket.on("signin", (id) => {
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });
  socket.on("message", (msg) => {
    console.log(msg);
    let targetId = msg.targetId;
    if (clients[targetId]) {
      clients[targetId].emit('message', msg,);
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server is started on " + PORT,)
});