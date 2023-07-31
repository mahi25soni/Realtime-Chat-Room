let totalUsers = 0;
const socket_connection = (io) => {
    io.on('connection' , (socket) => {
        totalUsers++;
        console.log(`New user connected. Total users: ${totalUsers}`);
        socket.on("send_message", (data) => {
            console.log(socket.id)

            console.log("something I don't want to share ", data)
            io.emit("get_message", data)
        })
        socket.on("disconnect", () =>  {
            totalUsers--;
            console.log(`After disconnecting: ${totalUsers}`);
              socket.disconnect();
          });
      })
 }

 module.exports = {socket_connection}