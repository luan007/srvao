var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(require('cors')());
app.use(require('serve-static')(__dirname + "/gui/"))

//TODO: needs routing / segmentation / other-stuff

io.origins('*:*');
io.on('connection', (socket) => {
    socket.on("up", (d) => {
        socket.broadcast.emit('up-relay', d); //proxy
    });
    socket.on("def", (d) => {
        socket.broadcast.emit('def-relay', d); //proxy
    });
    socket.on("control", (d) => {
        socket.broadcast.emit('controlled', d); //proxy
    });
    socket.on("req-sync", (d) => {
        socket.broadcast.emit('hello'); //proxy
    });
    socket.emit("hello") //fetch from other parties!
});

http.listen(9999, () => {
});