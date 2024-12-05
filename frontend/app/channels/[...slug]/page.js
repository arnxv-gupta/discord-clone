"use client"
import ServerList from "@/_components/ServerList";

import useWebSocket from "@/app/hooks/useWebSocket";
import ServerWindow from "@/_components/ServerWindow";

export default function Channels() {
        
    const {socketData, setSocketData, sendMessage} = useWebSocket("https://discord.avirana.com/");

    return (
    <div className="flex">
        <ServerList />
        <ServerWindow sendMessage={sendMessage} socketData={socketData}/>
    </div>
    )
}