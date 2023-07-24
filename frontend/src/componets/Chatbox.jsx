import React , {useState, useEffect, useContext} from 'react'
import { UserContext } from '../context/UserContext'

export default function Chatbox() {

const [messageArray , setMessageArray] = useState(["chup kar madarchod", "thik hai bhai"])
const {userdata} = useContext(UserContext)



function send_message(e){
    e.preventDefault()
    setMessageArray(messageArray.concat(e.target.elements.your_message.value))
    e.target.elements.your_message.value=""
}
  return (
    <>
    <div className='p-4 absolute right-0 bottom-16' id='chat_feed'>
  {messageArray.map((data, key) => (
    <h1 key={key} className='bg-blue-400 text-white rounded-lg px-2 py-1 mb-2'>{data}</h1>
  ))}
</div>

        <form action="" className='absolute bottom-0 w-full p-4' onSubmit={send_message}>
        <input type="text" id="your_message" name='your_message'  className='w-4/5 h-9 rounded-md outline-none px-3'/>
        <button type='submit' className='bg-black rounded-md text-blue-500 h-9 px-3 ml-4 hover:text-white hover:bg-transparent'>Send Message</button>
        </form>
    </>
  )
}
