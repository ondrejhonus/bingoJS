const express = require('express');
const bodyParser = require("body-parser");
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const server = createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
  res.render("menu");
});

io.on('connection', (socket) => {
    console.log("conection");
});

server.listen(PORT, () => {
  console.log('server running at http://localhost:' + PORT);
});