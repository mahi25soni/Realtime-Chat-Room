import React , {useState, useEffect, useContext} from 'react'
import { UserContext } from '../context/UserContext'
import {io} from 'socket.io-client'
import axios from "axios";



const socket = io.connect("http://localhost:5000")
const base_url = "http://127.0.0.1:5000/chatroom/message"


export default function Chatbox() {

const {userdata, current_room, messageArray , setMessageArray} = useContext(UserContext)



function send_message(e){
    e.preventDefault()
    let new_message = e.target.elements.your_message.value
    e.target.elements.your_message.value=""
    socket.emit("send_message", new_message)
    socket.on("get_message", (data) => {
      console.log("data data data ", data)
      setMessageArray(messageArray.concat({"message":data}))
    })
    axios.post(`${base_url}/${current_room}`, {
      "message":new_message
    }, {
      headers : {
        authorization : localStorage.getItem("authorization")
      }
    })
    .then((response) => {
    })
    .catch(error => {
      console.log("ye error hai ", error)
    })
}




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
