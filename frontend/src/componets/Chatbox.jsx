import React , {useState, useEffect, useContext, useRef} from 'react'
import { UserContext } from '../context/UserContext'
import {io} from 'socket.io-client'
import axios from "axios";

export default function Chatbox() {
  const socketRef = useRef(null);
  const [messageArray, setMessageArray] = useState([]);
  const [current_room, setCurrent_room] = useState(localStorage.getItem("current_room"))
  const [auth_token , setAuth_token] = useState(localStorage.getItem("authorization"))
  const base_url = "http://127.0.0.1:5000/chatroom/message";
  const { userdata } = useContext(UserContext);

  useEffect(() => {
    console.log("checking first use effect");
    if (!socketRef.current) {
      console.log("socket ref hai yaa nahi")
      socketRef.current = io.connect("http://localhost:5000");

      socketRef.current.on("get_message", (data) => {

        console.log("Received message: ", data);
        axios.post(`${base_url}/${current_room}`, {
          "message": data
        }, {
          headers: {
            authorization: auth_token
          }
        })
        .then((response) => {
          setMessageArray(prevMessageArray => [...prevMessageArray, response.data]);
        })
        .catch(error => {
          console.log("Error: ", error);
        });
      });

      socketRef.current.on("disconnect", () => {
        console.log("This user is disconnected");
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [socketRef]);

  function send_message(e) {
    e.preventDefault();
    let new_message = e.target.elements.your_message.value;
    e.target.elements.your_message.value = "";
    console.log("Sending message: ", new_message);
    socketRef.current.emit("send_message", {new_message, current_room, auth_token});
  }


  function get_all_message() {

    let current_room = localStorage.getItem("current_room")

    if(current_room){
      axios.get(`${base_url}/${current_room}`, {
        headers : {
          authorization : localStorage.getItem("authorization")
        }
      })
      .then((response) => {
        setMessageArray(response.data)
      })
      .catch(error => {
        console.log("ye error hai ", error)
      })
    }
  }
  
  useEffect(() => {
  get_all_message()
  
}, [])



  return (
    <>
    <div className='p-4 absolute right-0 bottom-16' id='chat_feed'>
  { messageArray.map((data, key) => (
    <h1 key={key} className='bg-blue-400 text-white rounded-lg px-2 py-1 mb-2'>{data.message}</h1>
  ))}
</div>

        <form action="" className='absolute bottom-0 w-full p-4' onSubmit={send_message}>
        <input type="text" id="your_message" name='your_message'  className='w-4/5 h-9 rounded-md outline-none px-3'/>
        <button type='submit'  className='bg-black rounded-md text-blue-500 h-9 px-3 ml-4 hover:text-white hover:bg-transparent'>Send Message</button>
        </form>
    </>
  )
}
