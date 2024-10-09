import { useRef, useEffect, useState } from "react";

const ChannelList = () => {
  const [serverInfo, setServerInfo] = useState({channels:[]});


  useEffect(()=>{
  
      fetch("http://localhost:3030/serverInfo?serverID=5ce593bf-2bc6-4caf-97b5-9cbd9af04a1c").then(res=>res.text()).then(data=>{
        data=JSON.parse(data);
        
        
        if(data.type=="SUCCESS") {
          setServerInfo(data.res)
        }
        
      })
    
    
  }, [])

  return (
    <div className="w-64 h-screen bg-[#282828] text-gray-300 flex flex-col">
      <div className="p-4">
        <h2
        className="text-lg font-bold text-white mb-4"
        >{serverInfo.name}</h2>
        <div className="mb-6">
        {serverInfo.channels.length > 0 && ( // Only render list if channels exist
            <ul>
              {serverInfo.channels.map((el, i) => (
                <li key={i}>{el.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
