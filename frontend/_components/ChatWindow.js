import React, { useState } from 'react';
import ChatStatement from './ChatStatement';
import ChatInput from './ChatInput';

const ChatWindow = ({serverID, chatData, chatID}) => {
  if(chatData==null || chatData.length===0 || chatID==undefined) {
    return <small>This looks empty.. too empty :(</small>
  }
  
  const [data, setData] = useState(chatData.channels.filter((el)=>{
   return el.channelID == chatID;
  })[0].data)

  if(data==null || data.length==0) {
    
    return (
    <div className="flex-1 p-6 flex flex-col justify-between">
        <small>This looks empty.. too empty :(</small>
        <ChatInput userID={localStorage.getItem("userID")} serverID={serverID} chatID={chatID}/>
    </div>
    )
  }
  
  return (
    <div className="flex-1 p-6 flex flex-col justify-between">

      <ul className="divide-y divide-gray-600">
        {data.map((el)=>{
          return <ChatStatement authorID={el.authorID} text={el.data} timestamp={el.timestamp} key={el.timestamp}/>
        })}
      </ul>
        <ChatInput userID={localStorage.getItem("userID")} serverID={serverID} chatID={chatID}/>
    </div>
  );
};

export default ChatWindow;
