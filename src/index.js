const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', socket => {
  console.log('connected')
  socket.send(JSON.stringify({"method": "test"}))
  socket.on('message', (message) => {
    let data = JSON.parse(message)   //get data from client message
    if (data.method === "chat"){  
      wss.clients.forEach(function each(client) {
        if (client != wss && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      }) 
    }
  })
})
