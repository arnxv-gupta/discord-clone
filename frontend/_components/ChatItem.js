"use client"

import { useEffect, useState } from "react"

export default function ChatItem({authorID, text, timestamp, image}) {

    const [data, setData] = useState(null);
    const [time, setTime] = useState(new Date(timestamp).toDateString());
    
    useEffect(()=>{
        fetch(`http://localhost:3030/userInfo?userID=${authorID}`).then(res=>res.json()).then(data=>{
            setData(data.res)
        })
    }, [])

    if(data==null) {
        return;
    }

    return (
        <li className="py-2 px-6 hover:bg-[#2E3035] flex" >
            <img 
                src={(data.pfpURL==null)?"http://velocityacademy.org/wp-content/uploads/2016/03/placeholder.jpg":data.pfpURL}
                className="rounded-full size-8 mr-3 mt-1"
            />
            <div>
                <div className="flex items-center mb-1">
                    <div className="flex items-baseline">
                        <h5>{data.username}</h5>
                        <time className="text-xs text-[#b5b5b5] ml-2">{time}</time>
                    </div>
                </div>
                {image!=null?<img src={image} />:null}
                <pre className="whitespace-normal">{text}</pre>
            </div>
        </li>
    )
}