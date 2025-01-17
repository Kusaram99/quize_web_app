import React from "react"; 

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full bg-gradient-to-bl from-sky-400 to-green-950">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-solid"></div>
    </div>
  );
};

export default Loader;
