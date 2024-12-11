import React from "react";
import { FaUserLarge } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="h-[64px] flex justify-between items-center px-10 py-4 bg-gradient-to-bl from-sky-500 to-blue-400">
      <h1 className="text-lg"></h1>
      <div>
        <FaUserLarge className="cursor-pointer text-2xl" />
      </div>
    </header>
  );
};

export default Header;
