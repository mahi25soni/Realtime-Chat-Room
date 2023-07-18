import React from "react";
import Sidename from "./Sidename";
import Chatbox from "./Chatbox";

export default function Home() {
  return (
    <>
      <div className=" flex h-screen justify-center items-center home">
        <div className="flex w-4/5 h-4/5 bg-slate-500 bg-opacity-50">

          <div className=" w-1/4 p-4 flex flex-col">
                <Sidename></Sidename>
          </div>
          <div className="relative w-3/4">
            <Chatbox></Chatbox>
          </div>
        </div>
      </div>
    </>
  );
}
