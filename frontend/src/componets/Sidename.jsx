import React , {useState, useEffect }from 'react'
import axios from 'axios'

const base_url = "http://localhost:5000/chatroom"

export default function Sidename(props) {

  const [chatrooms, setChatrooms] = useState([])
  const [user_chatrooms, setUser_chatroom] = useState([])
  const [current_room , setCurrent_room] = useState("")
  const [users , setUsers] = useState([])


  const get_all_chatrooms =  () => {
    axios.get(base_url).then((response) => {
      setChatrooms(response.data)
    })

    axios.get(`${base_url}/user/chatrooms`, {
      headers : {
        "authorization":props.auth_token
      }
    }).then((response) => {
      setUser_chatroom(response.data)
    })


  }

  const get_chatroom_id = (e) => {
    const room = document.getElementById("your_genre").value
    setCurrent_room(room)
    users_of_a_room()
  }

  const users_of_a_room = () => {
    axios.post(`${base_url}/user/${current_room}`).then((response) => setUsers(response.data))
  }
 useEffect(() => {
    get_all_chatrooms();
      // eslint-disable-next-line 
  },[])

  console.log(chatrooms)


  return (
    <>
  <div className='mb-4 text-center'>
    <label htmlFor="add_genre"></label>
            <select name="add_genre" id="add_genre" className='rounded-md text-center mt-2 py-1 bg-blue-500 text-black text-black-500 font-bold text-sm'>
              {chatrooms.map((data , key) => (
              <option key={key} value={data._id}>{data.name}</option>
              ))}
            </select>
        <button type='submit' className='bg-black rounded-md text-blue-500  px-3 ml-4 hover:text-white hover:bg-transparent'>Add</button>

    </div>
    <div className='text-center'>
    <label htmlFor="your_genre" className='mb-4  text-center font-bold text-2xl'>Choose Your Room:</label>
            <select name="your_genre" id="your_genre" onChange={get_chatroom_id} className='rounded-md text-center mt-2 bg-transparent text-black-500 font-bold font-lg'>
            {user_chatrooms.map((data , key) => (
              <option key={key} value={data._id}>{data.name}</option>
              ))}
            </select>
    </div>
    <hr className="border-2 my-8" />

    <div className="user-names text-white text-center overflow-auto pr-2">
      {users.map((element, key) => (
        <p key={key} className='bg-black mb-2 py-1 rounded-lg'>{element.name}</p>
      ))}
    </div>


    

    </>
  )
}
