"use client"
import ChannelList from "@/_components/ChannelList";
import ServerList from "@/_components/ServerList";
import ChatWindow from "@/_components/ChatWindow";
import MemberList from "@/_components/MemberList";
import { useEffect, useState } from "react";
import FriendsList from "@/_components/FriendsList";
import useWebSocket from "@/app/hooks/useWebSocket";

export default function Channels({params}) {
        
    const [data, setData] = useState(null);
    const {socketData, setSocketData, sendMessage} = useWebSocket("http://localhost:3030");

    useEffect(()=>{
        console.log("Data updated...");
        fetch(`http://localhost:3030/serverInfo?serverID=${params.slug[0]}`).then(res=>res.json()).then(data=>{
            if(data.type=="SUCCESS") {
                let nData = data.res;
                setData(nData)
            }
        });

    }, [socketData])

    return (
        (params.slug[0]=="%40me")?(
                <div className="flex">
                <ServerList />
                <FriendsList />
                    <div className="flex items-center justify-center w-full text-gray-400">
                        Open a server to continue!
                    </div>
                </div>
            ):(
                <div className="flex">
                <ServerList />
                <ChannelList data={data} />
                <ChatWindow serverID={params.slug[0]} chatData={(data!=null && data.channels.length!=0 && params.slug[1])?data.channels.filter((el) => {return el.channelID == params.slug[1];})[0].data:null} chatID={params.slug[1]} sendMessage={sendMessage} socketData={socketData}/>
                <MemberList data={data}/>
                </div>
            )
    )
}