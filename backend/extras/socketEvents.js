 const socket_connection = (io) => {
    io.on('connection' , (socket) => {
        socket.on("send_message", (data) => {
          console.log(data)
            socket.emit("get_message", data)
        })
      })
 }

 module.exports = {socket_connection}