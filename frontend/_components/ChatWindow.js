import React, { useEffect, useState } from 'react';
import ChatItem from './ChatItem';
import ChatInput from './ChatInput';
import useWebSocket from '@/app/hooks/useWebSocket';

const ChatWindow = ({serverID, chatData, chatID}) => {
  if(chatData==null || chatData.length===0 || chatID==undefined) {
    return (
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#313338]">
      <small>This looks empty.. too empty :(</small>
      </div>
    )
  }

  const {socketData, setSocketData, sendMessage} = useWebSocket("http://localhost:3030");
  const [data, setData] = useState(chatData.channels.filter((el)=>{
   return el.channelID == chatID;
  })[0].data)


  useEffect(()=>{
    setData(chatData.channels.filter((el)=>{
      return el.channelID == chatID;
     })[0].data);
     console.log(data);
     

  }, [socketData])

  if(data==null || data.length==0) {
    
    return (
    <div className="flex-1 p-6 flex flex-col justify-between bg-[#313338]">
        <small>This looks empty.. too empty :(</small>
        <ChatInput userID={localStorage.getItem("userID")} serverID={serverID} chatID={chatID} sendMessage={sendMessage}/>
    </div>
    )
  }
  
  return (
    <div className="flex-1 py-6 flex flex-col justify-between bg-[#313338] overflow-hidden">

      <ul className="divide-y divide-gray-600 overflow-y-scroll">
        {data.map((el)=>{
          return <ChatItem authorID={el.authorID} text={el.data} timestamp={el.timestamp} key={el.timestamp}/>
        })}
      </ul>
        <ChatInput userID={localStorage.getItem("userID")} serverID={serverID} chatID={chatID} sendMessage={sendMessage}/>
    </div>
  );
};

export default ChatWindow;
