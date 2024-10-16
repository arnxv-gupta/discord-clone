"use client"

import { useEffect, useState } from "react"

export default function ChatStatement({authorID, text, timestamp}) {

    const [data, setData] = useState(null);
    const [time, setTime] = useState("");

    useEffect(()=>{        
        convertTime((Date.now()-Number(timestamp))/1000);
    })


    function convertTime(time) {
        let convertedString="";

            if(time>=43200) {
                // this is wrong
                convertedString = (new Date(time).getDate() + "/" + (new Date(time).getMonth()+1) + "/" + new Date(time).getFullYear());
            } else if(time>=3600) {
                convertedString+=Math.floor(time/3600) + " hours ";
                time=Math.floor(time%3600)
           } else if(time>=60) {
                convertedString+=Math.floor(time/60) + " minutes ";
                time= Math.floor(time%60);
            } else {
                convertedString+= Math.floor(time) + " seconds";
                time=0;
            }
    

        convertedString+=" ago";
        setTime(convertedString);
    }

    useEffect(()=>{
        fetch(`http://localhost:3030/userInfo?userID=${authorID}`).then(res=>res.json()).then(data=>{
            setData(data.res)
        })
    }, [])

    if(data==null) {
        return;
    }

    return (
        <li className="p-3">
            <div className="flex items-center mb-2">
                <img 
                    src={(data.pfpURL==null)?"http://velocityacademy.org/wp-content/uploads/2016/03/placeholder.jpg":data.pfpURL}
                    className="rounded-full size-8 mr-3"
                />
                <div>
                    <h5>{data.username}</h5>
                    <time className="text-xs text-[#b5b5b5]">{time}</time>
                </div>
            </div>
            <span>{text}</span>
        </li>
    )
}