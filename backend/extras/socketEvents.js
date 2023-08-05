const axios = require("axios")
const base_url = "http://127.0.0.1:5000/chatroom/message";

let totalUsers = 0;
const socket_connection = (io) => {
    io.on('connection' , (socket) => {
        totalUsers++;
        console.log(`After connecting`, totalUsers)
        // socket.on("join_room", (room_id) => {
        //     socket.join(room_id)
        //     console.log("User id number ", socket.id, " is room id ", room_id)
        // })
        socket.on("send_message", (data) => {
            io.emit("get_message", data.new_message)
            axios.post(`${base_url}/${data.current_room}`, {
                "message" : data.new_message
            }, {
                headers : {
                    authorization : data.auth_token
                }
            })
            .then((response) => console.log(response.data))
              .catch(error => {
                console.log("Error: ", error);
              });
        })
        socket.on("disconnect", () =>  {
            totalUsers--;
            console.log(`After disconnecting: ${totalUsers}`);
              socket.disconnect();
          });
      })
 }

 module.exports = {socket_connection}