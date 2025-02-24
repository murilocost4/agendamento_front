import React from "react";

const Header = ({ user }) => {
  return (
    <header className="bg-gray-100 p-4 flex items-center justify-between shadow-md fixed w-screen z-20">
      <div className="flex items-center ml-24">
        <img
          src="/path/to/logo.png" // Substitua pelo caminho real da logo
          alt="Logo"
          className="w-12 h-12"
        />
      </div>
      <div className="flex flex-col items-start space-y-1 mr-24">
        <span className="text-xl font-semibold">{user.name}</span>
        <span className="text-sm text-gray-600">{user.role}</span>
      </div>
    </header>
  );
};

export default Header;
