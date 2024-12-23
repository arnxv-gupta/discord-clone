import { useParams } from "next/navigation";
import ChatWindow from "@/_components/ChatWindow";
import ChannelList from "@/_components/ChannelList";
import MemberList from "@/_components/MemberList";
import { useEffect, useState } from "react";

export default function ServerWindow({sendMessage, socketData}) {

    const [data, setData] = useState(null);
    const params = useParams()

    useEffect(()=>{
        console.log("Data updated...");
        fetch(`http://localhost:3030/serverInfo?serverID=${params.slug[0]}`).then(res=>res.json()).then(data=>{
            if(data.type=="SUCCESS") {
                let nData = data.res;
                console.log(nData);
                
                setData(nData)
            }
        });

    }, [socketData])

    console.log(params.slug);
    
    return (
       <>
       <ChannelList data={data} />
        <ChatWindow serverID={params.slug[0]} chatData={(data!=null && data.channels.length!=0 && params.slug[1])?data.channels.filter((el) => {return el.channelID == params.slug[1];})[0].data:null} chatID={params.slug[1]} sendMessage={sendMessage} socketData={socketData}/>
        <MemberList data={data}/>
       </>        
    )
}