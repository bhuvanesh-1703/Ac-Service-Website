import React from "react";
import { FiShield } from "react-icons/fi";

const Header = ({ title }) => {
  return (
    <header className="h-20 bg-card-bg border-b border-border-subtle flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm select-none">
      <h1 className="text-xl font-extrabold text-text-dark tracking-tight">
        {title}
      </h1>
      
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary-maroon bg-primary-maroon/5 border border-primary-maroon/10 px-3 py-1 rounded-full">
          <FiShield className="h-3.5 w-3.5" /> Administrator Panel
        </span>
        <div className="h-9 w-9 rounded-full bg-primary-maroon text-secondary-yellow font-extrabold flex items-center justify-center text-xs shadow-md">
          AD
        </div>
      </div>
    </header>
  );
};

export default Header;
