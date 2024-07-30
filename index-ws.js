const express = require('express');
const server = require('http').createServer();
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile('index.html', {root:__dirname})
});

server.on('request', app);
server.listen(port, () => console.log(`listening on port ${port}`))

console.log("Server started on port 3000");

/**** STARTING WEBSOCKETS */
const webSocketServer = require('ws').Server;
const wss = new webSocketServer({server});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(c => c.send(data))
}

wss.on('connection', function connection(ws){
    const numClients = wss.clients.size;
    console.log(`${numClients} are connected`);
    wss.broadcast(`Current visitors: ${numClients}`);
    if (ws.readyState === ws.OPEN) {
        ws.send("welcome to the server");
    }

    ws.on('close', function close(){
        console.log('a client has disconnected');
    })
})
