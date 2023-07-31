import React, {useEffect, useState} from "react";
import Sidename from "./Sidename";
import Chatbox from "./Chatbox";
import { useNavigate } from "react-router-dom";
import {SocketProvider} from "../context/SocketContext"
export default function Home() {

  const history = useNavigate()

  const [auth_token, setAuth_token] = useState("")


  useEffect(() => {
      if(!localStorage.getItem("authorization")){
        history("/")
      }
      else {
        setAuth_token(localStorage.getItem("authorization"))
      }

  }, [])
  return (
    <>
      <div className=" flex h-screen justify-center items-center home">
        <div className="flex w-4/5 h-4/5 bg-slate-500 bg-opacity-50">

          <div className=" w-1/4 p-4 flex flex-col">
                <Sidename auth_token = {auth_token}></Sidename>
          </div>
          <div className="relative w-3/4">
            <SocketProvider>
              <Chatbox  auth_token = {auth_token} />
              </SocketProvider>
          </div>
        </div>
      </div>
    </>
  );
}
