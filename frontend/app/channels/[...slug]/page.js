"use client"
import ServerList from "@/_components/ServerList";

import useWebSocket from "@/app/hooks/useWebSocket";
import ServerWindow from "@/_components/ServerWindow";
import { createContext } from "react";

export default function Channels() {
    const {socketData, setSocketData, sendMessage} = useWebSocket("http://localhost:3030/", localStorage.getItem("userID"));

    return (
    <div className="flex">
        <ServerList />
        <ServerWindow sendMessage={sendMessage} socketData={socketData}/>
    </div>
    )
}