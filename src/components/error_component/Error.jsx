import React, { useEffect } from "react";

const Error = () => {
  // to avoid to go to the previous page
  useEffect(() => {
    history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      history.pushState(null, "", window.location.href);
    });
  }, []);
  return (
    <div className="flex justify-center items-center h-screen -mt-40">  
      <h1 className="font-bold text-6xl">
        {" "}   
        <span className="text-red-500">404 </span>ERROR
      </h1>
    </div>
  );
};

export default Error;
