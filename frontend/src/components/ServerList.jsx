<<<<<<< HEAD
import React from 'react';
import { FaDiscord } from 'react-icons/fa';
=======
import React, { useEffect, useRef } from 'react';
>>>>>>> 0e9697317d6a94b17c361227d8f7b797637cce9f

const servers = ['🏠', '🕹️', '🎮', '📚', '🛠️'];

const ServerList = () => {
  
  return (
    <div className="w-20 h-screen bg-[#1f1f1f] flex flex-col items-center py-4 space-y-3"> 
      <div className="bg-[#24a0ed] w-14 h-14 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#1b7bb0] hover:rounded-md mb-4">
        <span className="text-white text-3xl">
          <FaDiscord />
        </span>
      </div>

      {servers.map((server, index) => (
        <div 
          key={index} 
          className="bg-gray-800 w-14 h-14 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-600 hover:rounded-md"
        >
          <span className="text-white text-3xl">{server}</span>
        </div>
      ))}

<<<<<<< HEAD
      <div className="bg-gray-800 w-14 h-14 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-600 hover:rounded-md">
        <span className="text-white text-3xl">+</span>
=======
      <div 
      className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition duration-200 transform hover:bg-gray-600 hover:scale-110"
      onClick={()=>{
        fetch("http://localhost:3030/createServer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: "Test sercer",
            adminID: localStorage.getItem("userID")
          })
        }).then(res=>res.text()).then(data=>{
          console.log(data);
          
        })
      }}
      >
      <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition duration-200 transform hover:bg-gray-600  rounded-md hover:scale-110">
        <span className="text-white text-2xl">+</span>
>>>>>>> 0e9697317d6a94b17c361227d8f7b797637cce9f
      </div>
  </div>
  </div>
  );
}

export default ServerList;
