import {UserContext}  from './UserContext'
import { useState} from 'react'


const UserState = (props) => {

    const [userdata, setUserdata] = useState({})

    const save_user_data = (param) => {
      setUserdata(param)
    }

    return (
          <UserContext.Provider value={{save_user_data, userdata}}>
            <div>{props.children}</div>
          </UserContext.Provider>
      );
}

export default UserState