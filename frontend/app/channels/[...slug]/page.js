"use client"
import ChannelList from "@/_components/ChannelList";
import ServerList from "@/_components/ServerList";
import ChatWindow from "@/_components/ChatWindow";
import MemberList from "@/_components/MemberList";
import { useEffect, useState } from "react";
import FriendsList from "@/_components/FriendsList";

export default function Channels({params}) {
        
    const [data, setData]= useState(null);
    console.log(params.slug);
    
    useEffect(()=>{
        
        fetch(`http://localhost:3030/serverInfo?serverID=${params.slug[0]}`).then(res=>res.json()).then(data=>{
            if(data.type=="SUCCESS") { 
                console.log(data.res);
                setData(data.res)
            }

        });
    }, [])

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
                <ChannelList data={data} key={"ChannelList"}/>
                <ChatWindow serverID={params.slug[0]} chatData={data} chatID={params.slug[1]}/>
                <MemberList data={data}/>
                </div>
            )
    )
}