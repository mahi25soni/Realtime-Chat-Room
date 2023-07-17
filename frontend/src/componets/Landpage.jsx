import React from "react";
import lendpage from "../assets/lendpage_image.png";
import Signup from "./Signup";
export default function Landpage() {
  return (
    <>
      <div className="h-screen">
        <div className="flex justify-center py-20">
          <div className=" w-1/3">
            <img className="w-full h-full" src={lendpage} alt="endpage_image" />
          </div>

          <div className=" w-1/3">
            <Signup></Signup>
          </div>
        </div>
      </div>
    </>
  );
}
