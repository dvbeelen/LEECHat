const WebSocket = require('ws')
const { v4: uuidv4 } = require('uuid');
const {joinUser, removeUser} = require("./users")

const wss = new WebSocket.Server({ port: 8080 })

let thisRoom = ""
wss.on('connection', socket => {
  console.log('connected')
  socket.send(JSON.stringify({"test": "test"}))
  socket.on('message', (message) => {
    socket.id = uuidv4()   //create room id
    let data = JSON.parse(message)   //get data from client message
    if (data.method === "join"){   //if join, start player joining to room
      console.log('joining room');
      let Newuser = joinUser(socket.id, data.username, data.roomName)
      socket.emit('send data' , {id : Newuser.socketID, username:Newuser.username, roomname : Newuser.roomname });
      thisRoom = Newuser.roomname;
      console.log(Newuser);
    }
    else if (data.method === "disconnect"){
      const user = removeUser(data.username)
      console.log(user)
      if(user){
          console.log(user.username + ' has left')
      }
      console.log("disconnected")
    }
  })
})
