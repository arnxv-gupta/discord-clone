"use client"
import ChannelList from "@/_components/ChannelList";
import ServerList from "@/_components/ServerList";
import ChatWindow from "@/_components/ChatWindow";
import MemberList from "@/_components/MemberList";


export default function Channels({params}) {
        
    return (
        <div className="flex">
        <ServerList />
        <ChannelList data={params.slug} />
        <ChatWindow />
        <MemberList />
        </div>
    )
}