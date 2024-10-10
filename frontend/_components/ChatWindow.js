import React, { useState } from 'react';
import { FaPlus, FaGift, FaRegSmile } from 'react-icons/fa';

const ChatWindow = ({chatData, chatID}) => {
  if(chatData==null || chatData.length===0 || chatID==undefined) {
    return <small>This looks empty.. too empty :(</small>
  }
  
  const [data, setData] = useState(chatData.channels.filter((el)=>{
   return el.channelID == chatID;
  })[0].data)
  
  return (
    <div className="flex-1 p-6 flex flex-col justify-between">
      <div className="flex-grow overflow-auto space-y-4 p-4 rounded-lg">
        <div className="text-sm font-medium">Welcome to the general chat!</div>
        <div className="text-sm font-medium">Message #1</div>
        <div className="text-sm font-medium">Message #2</div>
      </div>
      <div className="mt-4 relative flex items-center">
        <div className="absolute left-2 bg-[#343434] p-2 rounded-full flex items-center justify-center transition duration-200">
          <FaPlus className="text-gray-300" />
        </div>
        <input
          className="flex-grow p-3 pl-10 pr-10 bg-[#1e1e1e] border border-transparent rounded-lg text-white placeholder-gray-400 focus:outline-none transition duration-200"
          placeholder="Type a message"
        />
        <div className="absolute right-2 flex space-x-2">
          <div className="p-4 flex items-center justify-center cursor-pointer hover:text-blue-500 transition duration-200">
            <FaGift className="text-white" />
          </div>
          <div className="flex items-center justify-center cursor-pointer hover:text-blue-500 transition duration-200">
            <FaRegSmile className="text-white" />
          </div>
          <div className="p-4 flex items-center justify-center cursor-pointer hover:text-blue-500 transition duration-200">
            <span className="text-white">😊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
