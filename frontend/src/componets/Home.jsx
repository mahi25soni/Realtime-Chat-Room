import React from "react";
import Sidename from "./Sidename";
import Chatbox from "./Chatbox";

export default function Home() {
  return (
    <>
      <div className=" flex bg-gray-500 border-red-400 border-4 h-screen justify-center items-center ">
        <div className="flex w-4/5 h-4/5">

          <div className=" bg-blue-500 w-1/4">
                <Sidename></Sidename>
          </div>
          <div className=" bg-red-500 w-3/4 ">
            <Chatbox></Chatbox>
          </div>
        </div>
      </div>
    </>
  );
}
