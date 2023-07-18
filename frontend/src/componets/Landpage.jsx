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
      <div className="h-screen">
        <div className="flex justify-center py-12">
          <div className=" w-1/3">
            <img className="w-full h-full" src={lendpage} alt="endpage_image" />
          </div>

          <div className=" w-1/3">
            {takedo}
          </div>
        </div>
      </div>
    </>
  );
}
