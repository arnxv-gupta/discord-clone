"use client";
import { useContext, useState } from "react";
import ChannelItem from "./ChannelItem";
import ServerDropDown from "./ServerDropDown";
import {appContext} from "./ServerWindow"

const ChannelList = () => {
  const data = useContext(appContext)
  console.log(data);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  if (!data) return;

  return (
    <div className="w-64 h-screen flex flex-col bg-[#2B2D31]">
      <div className="p-4 relative">
        <button onClick={toggleDropdown} className="text-lg font-bold text-white flex justify-between items-center w-full bg-[#3b3d41] px-4 py-2 rounded">
          <span>{data.name}</span>
          <span className="text-gray-400 text-lg">{isDropdownOpen ? '×' : '▼'}</span>
          {isDropdownOpen?<ServerDropDown serverID={data.serverID}/>:null}
        </button>
      </div>

      <div className="mb-6">
        {data.channels.length > 0 && (
          <ul>
            {data.channels.map((el, i) => (
              <ChannelItem key={i} link={`/channels/${data.serverID}/${el.channelID}/`} name={el.name} />
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ChannelList;
