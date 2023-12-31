import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from 'axios';

const base_url = "http://localhost:5000/register"

export default function Signup() {
  const history = useNavigate()

  function signingUp(e){
    e.preventDefault()
    const temp_object = {
      "username":e.target.elements["username"].value,
      "email":e.target.elements["email"].value,
      "phone_number":e.target.elements["phone_number"].value,
      "password":e.target.elements["password"].value,
    }
    axios.post(base_url, temp_object)
    .then(function(response) {
      console.log("Your response", response.data);
    })

    history("/")
  }
  return (
    <>
      <div className="bg-purple-100 h-full ">
        <div className="p-4 lg:p-10 sm:p-8">
          <h1 className="font-bold text-3xl text-black mb-8">Sign Up</h1>

          <form action="" onSubmit={signingUp} name="form_name">
            <input
              className="block w-full border-b-4 border-purple-800 mb-4 outline-none bg-purple-100"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />

            <input
              className="block w-full border-b-4 border-purple-800 mb-4 outline-none bg-purple-100"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            <input
              className="block w-full border-b-4 border-purple-800 mb-4 outline-none bg-purple-100"
              type="number"
              name="phone_number"
              id="phone_number"
              maxLength = "10"

              placeholder="Phone Number"
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

          <p className="text-sm text-black  text-center">
            Already have a account?{" "}
            <Link to="/login" className="no-underline text-blue-500">
              Sign In
            </Link>
          </p>

          <p className="font-bold text-sm text-black mb-4 text-center">
            Or, Sign Up using
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
