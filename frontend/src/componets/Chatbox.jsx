import React , {useState, useEffect, useContext, useRef} from 'react'
import { UserContext } from '../context/UserContext'
import {io} from 'socket.io-client'
import axios from "axios";
import SocketContext from '../context/SocketContext';

export default function Chatbox() {
  const {socketRef} = useContext(SocketContext);
  const [messageArray, setMessageArray] = useState([]);
  const [socketInitialized, setSocketInitialized] = useState(false);
  const base_url = "http://127.0.0.1:5000/chatroom/message";

  useEffect(() => {
    if (socketRef.current) {
      setSocketInitialized(true);
      socketRef.current.on("get_message", (data) => {
        console.log("yaha wala data ", data)
      let current_room = localStorage.getItem("current_room");
      axios.post(`${base_url}/${current_room}`, {
        "message": data
      }, {
        headers: {
          authorization: localStorage.getItem("authorization")
        }
      })
      .then((response) => {
        setMessageArray(prevMessageArray => [...prevMessageArray, response.data]);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
    });
    }
  }, [socketRef]);

  function send_message(e) {
    e.preventDefault();
    let new_message = e.target.elements.your_message.value;
    e.target.elements.your_message.value = "";
    console.log("Sending message: ", new_message);
    // Use the socket instance stored in socketRef.current for emitting
    socketRef.current.emit("send_message", new_message);
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
