import {UserContext}  from './UserContext'
import { useState} from 'react'


const UserState = (props) => {

    const [userdata, setUserdata] = useState({})
    const [current_room, setCurrent_room] = useState()
    const [messageArray , setMessageArray] = useState([])


    const save_user_data = (param) => {
      setUserdata(param)
    }
    const saving_message_array = (param) => {
      console.log("insdie saving message array ", param)
      setMessageArray(param)
    }


    return (
          <UserContext.Provider value={{save_user_data, userdata, current_room, setCurrent_room,messageArray , setMessageArray, saving_message_array}}>
            <div>{props.children}</div>
          </UserContext.Provider>
      );
}

export default UserState