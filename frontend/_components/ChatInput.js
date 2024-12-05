"use client"
import useWebSocket from '@/app/hooks/useWebSocket';
import { useEffect, useRef, useState } from 'react';
import { FaPlus, FaGift, FaRegSmile } from 'react-icons/fa';

export default function ChatInput({userID, serverID, chatID, sendMessage}) {

    const inputRef = useRef(null);

    return (
        <div className="mx-3 mt-4 p-3 bg-[#383A40] flex items-center rounded-lg">
        <div className=" bg-[#343434] p-2 rounded-full flex items-center justify-center transition duration-200">
        <FaPlus className="text-gray-300" />
        </div>
        <pre
        className="flex-grow block ml-3 border-none bg-transparent text-white placeholder-gray-400 focus:outline-none transition duration-200"
        placeholder="Type a message"
        spellCheck={false}
        autoFocus={true}
        ref={inputRef}
        contentEditable={true}
        ></pre>
        <button
        onClick={()=>{
            fetch("https://discord.avirana.com/sendMessage", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    authorID:userID,
                    serverID: serverID,
                    channelID: chatID,
                    text: inputRef.current.innerText
                })
            }).then(res=>res.text()).then(data=>{
                //console.log(data);
                inputRef.current.innerText = null;         
                sendMessage("MESSAGE RECEIVED!")
            })
        }}>
            Send
        </button>
    </div>
    )
}