"use client"
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

const ChannelList = ({parmas, data}) => {
  if (data==null) {
    return <div className="loading">Loading channels...</div>;
  }

  const [serverInfo, setServerInfo] = useState(data);
  
  return (
    <div className="w-64 h-screen flex flex-col">
      <div className="p-4">
        <h2
        className="text-lg font-bold text-white mb-4"
        >{serverInfo.name}</h2>
        <div className="mb-6">
        {serverInfo.channels.length > 0 && ( // Only render list if channels exist
            <ul>
              {serverInfo.channels.map((el, i) => (
                <li key={i}>
                  <Link href={`${serverInfo.serverID}/${el.channelID}/`}>{el.name}</Link>
                  </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
