"use client"

import { useEffect, useState } from "react"

export default function ChatStatement({authorID, text}) {

    const [data, setData] = useState(null);

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
            <h5>{data.username}</h5>
            </div>
            <span>{text}</span>
        </li>
    )
}