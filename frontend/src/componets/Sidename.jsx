import React, { useState, useEffect , useContext} from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const base_url = "http://localhost:5000/chatroom";

export default function Sidename(props) {
  const {current_room, setCurrent_room, saving_message_array} = useContext(UserContext)
  const [chatrooms, setChatrooms] = useState([]);
  const [user_chatrooms, setUser_chatroom] = useState([]);
  const [users, setUsers] = useState([]);



  const get_all_chatrooms = () => {
    axios
      .get("http://localhost:5000/chatroom")
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((error) => {
        console.log("some rrr ", error);
      });
  };

  const get_users_chatroom = () => {
    axios
      .get(`${base_url}/user-chatrooms`, {
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      })
      .then((response) => {
        setUser_chatroom(response.data);
      })
      .catch((error) => {
        console.log("some rrr ", error);
      });
  };


  const get_chatroom_id = (e) => {
    e.preventDefault()
    const room = document.getElementById('your_genre').value;
    localStorage.setItem("current_room", room)
    setCurrent_room(room)
  };


  useEffect(() => {
    if (current_room) {
      axios
        .get(`${base_url}/all_users/${current_room}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });

    }
    else {
      console.log("else wala")
    }
  }, [current_room]);

  const add_to_chatroom = () => {
    const new_user_of_chatroom = document.getElementById("add_genre").value
    console.log(new_user_of_chatroom)
    axios.post(`${base_url}/user/`, {"chatroom_id": new_user_of_chatroom},{
      headers: {
        authorization: localStorage.getItem('authorization'),
      },
    })
    .then((response) => {
      alert(response.data);
    })
    .catch((error) => {
      console.log("some rrr ", error);
    });
  }
  
  
  useEffect(() => {
    get_all_chatrooms();
    get_users_chatroom();
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <div className="mb-4 text-center">
        <label htmlFor="add_genre"></label>
        <select
          name="add_genre"
          id="add_genre"
          className="rounded-md text-center mt-2 py-1 bg-blue-500 text-black text-black-500 font-bold text-sm"
        >
          {chatrooms.map((data, key) => (
            <option key={key} value={data._id}>
              {data.name}
            </option>
          ))}
        </select>
        <button
          type="submit" onClick={add_to_chatroom}
          className="bg-black rounded-md text-blue-500  px-3 ml-4 hover:text-white hover:bg-transparent"
        >
          Add
        </button>
      </div>
      <div className="text-center">
        <label
          htmlFor="your_genre"
          className="mb-4  text-center font-bold text-2xl"
        >
          Choose Your Room:
        </label>
        <select
          name="your_genre"
          id="your_genre"
          onChange={get_chatroom_id}
          className="rounded-md text-center mt-2 bg-transparent text-black-500 font-bold font-lg"
        >
          {user_chatrooms.map((data, key) => (
            <option key={key} value={data._id}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <hr className="border-2 my-8" />

      <div className="user-names text-white text-center overflow-auto pr-2">
        {users.map((element, key) => (
          <p key={key} className="bg-black mb-2 py-1 rounded-lg">
            {element.username}
          </p>
        ))}
      </div>
    </>
  );
}
