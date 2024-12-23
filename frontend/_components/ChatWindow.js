import React, { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import ChatInput from "./ChatInput";
import e from "cors";

const ChatWindow = ({ serverID, chatData, chatID, sendMessage, socketData }) => {
  if (chatData == null || chatID == undefined) {
    return (
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#313338]">
        <small>This looks empty.. too empty :(</small>{" "}
      </div>
    );
  }

  const [data, setData] = useState(chatData);

  useEffect(()=>{
    setData(chatData)
  }, [chatData.length])  

  if (data == null || data.length == 0) {
    return (
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#313338]">
        <small>This looks empty.. too empty :(</small>
        <ChatInput
          userID={localStorage.getItem("userID")}
          serverID={serverID}
          chatID={chatID}
          sendMessage={sendMessage}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 pb-6 flex flex-col justify-between bg-[#313338]  max-h-[100lvh] ">
      <ul className="divide-y divide-gray-600 overflow-y-scroll">
        {data.map((el) => {
          return (
            <ChatItem
              authorID={el.authorID}
              text={el.data}
              timestamp={el.timestamp}
              key={el.timestamp}
              image={el.image}
            />
          );
        })}
      </ul>
      <ChatInput
        userID={localStorage.getItem("userID")}
        serverID={serverID}
        chatID={chatID}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatWindow;
