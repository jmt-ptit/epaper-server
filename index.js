const app = require('express')();
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http, { 
    allowUpgrades: false, 
    transports: ["polling"], 
    cors: { origin: "*" },
});
io.on('connection', (socket) => {
    let id = ""
    let ips = ""

    console.log("client connected"); 
    socket.emit('message', 'https://picsum.photos/1200/800');

    socket.on('disconnect', () => {
        console.log(`client ${socket.id} disconnected`);
        console.log(id, ips);
    });
    // socket.on('message', (msg) => {
        
    //     console.log(msg);
    //     // io.emit('message', msg);
    // });

    socket.on('register', (msg) => {
        console.log(msg);
        id = msg.id
        ips = msg.ips
    })

}); 

setInterval(() => {
    console.log("send message");
    io.emit('test', 'https://picsum.photos/1200/800');
}, 60000);
http.listen(process.env.PORT || 3000);