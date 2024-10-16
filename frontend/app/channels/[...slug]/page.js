"use client"
import ChannelList from "@/_components/ChannelList";
import ServerList from "@/_components/ServerList";
import ChatWindow from "@/_components/ChatWindow";
import MemberList from "@/_components/MemberList";
import { useEffect, useState } from "react";


export default function Channels({params}) {
        
    const [data, setData]= useState(null);
    console.log(params.slug);
    

    if(params.slug[0]=="%40me") {
        return (
            <div className="flex">
            <ServerList />
                <div className="flex items-center justify-center w-full text-gray-400">
                    Open a server to continue!
                </div>
            </div>
        )
    }
    
    useEffect(()=>{
        fetch(`http://localhost:3030/serverInfo?serverID=${params.slug[0]}`).then(res=>res.json()).then(data=>{
            
            if(data.type=="SUCCESS") { 
                console.log(data.res);
                
                setData(data.res)
            }
        })
    }, [])

    return (
        <div className="flex">
        <ServerList />
        <ChannelList data={data} />
        <ChatWindow serverID={params.slug[0]} chatData={data} chatID={params.slug[1]}/>
        <MemberList data={data}/>
        </div>
    )
}