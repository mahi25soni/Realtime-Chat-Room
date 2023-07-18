import React from "react";
import lendpage from "../assets/lendpage_image.png";
import Signup from "./Signup";
import Login from "./Login";
export default function Landpage(props) {

  
    let takedo;
    if(props.do==="login"){
      takedo =  <Login></Login>
    }
    else {
      takedo =  <Signup></Signup>
    }

  return (
    <>
      <div className="flex h-screen justify-center items-center ">
        <div className="flex justify-center">
          <div className=" w-full">
            <img className="w-full h-full" src={lendpage} alt="endpage_image" />
          </div>

          <div className=" w-full">
            {takedo}
          </div>
        </div>
      </div>
    </>
  );
}
