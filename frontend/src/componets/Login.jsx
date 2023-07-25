import React, { useEffect , useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from 'axios'

const base_url = "http://127.0.0.1:5000/login"

export default function Login() {
  const {save_user_data} = useContext(UserContext)
  const history = useNavigate()

  function loggingIn(e) {
    e.preventDefault();
    const temp_object = {
      email: e.target.elements["email"].value,
      password: e.target.elements["password"].value,
    };
    axios.post(base_url, temp_object).then((response) => {
      save_user_data(response.data.user_data)
      localStorage.setItem("authorization",response.data.token);
      history('/home')
    });
  }

  useEffect(() => {
    const token = localStorage.getItem('authorization');
    if (!token) {
      history('/')
    } else {
      history('/home')
    }
  }, [])

  return (
    <>
      <div className="bg-purple-100 h-full ">
        <div className="p-4 lg:p-10 sm:p-8">
          <h1 className="font-bold text-3xl text-black mb-8">Sign In</h1>
          <form action="" onSubmit={loggingIn}>
            <input
              className="block w-full border-b-4 border-purple-800 mb-4 outline-none bg-purple-100"
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
            />
            <input
              className="block w-full border-b-4 border-purple-800 mb-12 outline-none bg-purple-100"
              type="text"
              name="password"
              id="password"
              placeholder="Password"
            />
            <button
              type="submit"
              className="block w-full bg-purple-400 py-2 rounded-lg font-semibold text-lg mb-8 hover:ring-4 ring-purple-500 transition duration-300"
            >
              Continue
            </button>
          </form>

          <p className="text-sm text-black mb-4 text-center">
            Don't have a account?{" "}
            <Link to="/signup" className="no-underline text-blue-500">
              Sign Up
            </Link>
          </p>
          <button className="block w-full bg-blue-300 py-2 font-semibold text-lg mb-8 hover:ring-4 ring-blue-400 transition duration-300">
            Google
          </button>

          <button className="block w-full bg-blue-500 py-2 font-semibold text-lg mb-8 hover:ring-4 ring-blue-600 transition duration-300">
            Facebook
          </button>
        </div>
      </div>
    </>
  );
}
