"use client";
import { useState } from "react";
import ChannelItem from "./ChannelItem";

const ChannelList = ({ data }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  if (!data) return <div className="w-64 p-4 bg-[#313338]">Loading channels...</div>;

  const menuItems = [
    "🚀 Server Boost", "👥 Invite People", "📚 App Directory", 
    "📂 Show All Channels", "🔔 Notification Settings", 
    "🔒 Privacy Settings", "✏️ Edit Server Profile", 
    "🔕 Hide Muted Channels", "🚫 Leave Server"
  ];

  return (
    <div className="w-64 h-screen flex flex-col bg-[#2B2D31]">
      <div className="p-4 relative">
        <button onClick={toggleDropdown} className="text-lg font-bold text-white flex justify-between items-center w-full bg-[#3b3d41] px-4 py-2 rounded">
          <span>{data.name}</span>
          <span className="text-gray-400 text-lg">{isDropdownOpen ? '×' : '▼'}</span>
        </button>
        
        {isDropdownOpen && (
          <ul className="absolute top-full left-0 mt-2 w-full bg-[#2B2D31] shadow-lg rounded-lg text-white text-sm z-10">
            {menuItems.map((item, i) => (
              <li
                key={i}
                className="px-4 py-2 rounded flex items-center"
                style={{
                  opacity: 0,
                  transform: "translateY(10px)",
                  animation: `fadeIn 0.3s ease forwards`,
                  animationDelay: `${i * 0.05}s`
                }}
              >
                <span className="mr-2">{item.split(" ")[0]}</span>
                {item.split(" ").slice(1).join(" ")}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6">
        {data.channels.length > 0 && (
          <ul>
            {data.channels.map((el, i) => (
              <ChannelItem key={i} link={`/channels/${data.serverID}/${el.channelID}/`} icon="#" name={el.name} />
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
