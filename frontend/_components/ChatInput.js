"use client"
import { useRef } from 'react';
import { FaPlus, FaGift, FaRegSmile } from 'react-icons/fa';

export default function ChatInput({userID, serverID, chatID}) {

    const inputRef = useRef(null);

    return (
        <div className="mt-4 relative flex items-center">
        <div className="absolute left-2 bg-[#343434] p-2 rounded-full flex items-center justify-center transition duration-200">
        <FaPlus className="text-gray-300" />
        </div>
        <input
        className="flex-grow p-3 pl-10 pr-10 bg-[#1e1e1e] border border-transparent rounded-lg text-white placeholder-gray-400 focus:outline-none transition duration-200"
        placeholder="Type a message"
        ref={inputRef}
        />
        <button
        onClick={()=>{
            fetch("http://localhost:3030/sendMessage", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    authorID:userID,
                    serverID: serverID,
                    channelID: chatID,
                    text: inputRef.current.value
                })
            }).then(res=>res.text()).then(data=>{
                console.log(data);
                
            })
        }}>
            Send
        </button>
    </div>
    )
}