/* Import de dépandances */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const uuid = require("uuid").v4;

/* Mise en place de Express (serveur web) */

app.use(express.static("public"));

/* Mise en place du site (partie acceuil) */

app.get('/welcome', (req, res) => {
    res.sendFile(__dirname+'/public/welcome.html')
});

/* Mise en place de api (identification de l'utilisateur à chaque sessions) */

app.get('/api/id', (req, res) => {
    const userUuid = uuid();
    res.json({ uuid: userUuid });
});

/* Mise en place de Socket.io (serveur des message) */

io.on("chatroom", function(msg){
    io.emit("chatroom",uuid)
})

io.on('connection', (socket) => {
    socket.on("chat message", function(msg){
        console.log(msg)
        io.emit("chat message",msg)
    })
})

/* Ouverture du port pour ouvrir techniquement le site */

server.listen(80,()=>{
    console.log("Serveur NodeJS de AnonyChat !")
})