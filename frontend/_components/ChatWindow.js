import React, { useContext, useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import ChatInput from "./ChatInput";
import { appContext } from "./ServerWindow";

const ChatWindow = ({sendMessage, socketData }) => {
  const data = useContext(appContext);

  if (data == null || !data.currChannel) {
    return (
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#313338]">
        <small>This looks empty.. too empty :(</small>{" "}
      </div>
    );
  }

  if (data != null && data.channels[data.channels.findIndex((channel)=>data.currChannel==channel.channelID)].data.length==0) {
    return (
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#313338]">
        <small>This looks empty.. too empty :(</small>
        <ChatInput
          userID={localStorage.getItem("userID")}
          serverID={data.serverID}
          chatID={data.currChannel}
          sendMessage={sendMessage}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 pb-6 flex flex-col justify-between bg-[#313338]  max-h-[100lvh] ">
      <ul className="divide-y divide-gray-600 overflow-y-scroll">
        {data.channels[data.channels.findIndex((channel)=>{
          return data.currChannel==channel.channelID;
        })].data.map((el) => {
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
        serverID={data.serverID}
        chatID={data.currChannel}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatWindow;
