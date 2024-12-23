import { useParams } from "next/navigation";
import ChatWindow from "@/_components/ChatWindow";
import ChannelList from "@/_components/ChannelList";
import MemberList from "@/_components/MemberList";
import { createContext, useEffect, useState } from "react";

export const appContext = createContext();
export default function ServerWindow({ sendMessage, socketData }) {
  const [data, setData] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:3030/serverInfo?serverID=${params.slug[0]}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.type == "SUCCESS") {
          let nData = data.res;
          nData.currChannel=params.slug[1];
          console.log("aa", nData);
          setData(nData);
        }
      });
  }, [socketData]);

  return (
    <>
      <appContext.Provider value={data}>
        <ChannelList/>
        <ChatWindow
          sendMessage={sendMessage}
          socketData={socketData}
        />
        <MemberList/>
      </appContext.Provider>
    </>
  );
}
