"use client"
import useWebSocket from '@/app/hooks/useWebSocket';
import { useEffect, useRef, useState } from 'react';
import { FaPlus, FaGift, FaRegSmile } from 'react-icons/fa';

export default function ChatInput({userID, serverID, chatID, sendMessage}) {

    const [imageURL, setImageURL] = useState(null)
    const inputRef = useRef(null);

    return (
        <div className="mx-3 mt-4 p-3 bg-[#383A40] flex items-center rounded-lg">
        <div className=" bg-[#343434] p-2 rounded-full flex items-center justify-center transition duration-200">
        <label for="imageUploader">
        <FaPlus className="text-gray-300"/>
        </label>
        <input className="hidden" id="imageUploader" type="file" accept="image/*" onChange={(e)=>{
            console.log("a");
            
            let formData = new FormData()
            formData.append("image", e.target.files[0]);
            fetch("http://localhost:3030/uploadImage", {
                method: "POST",
                body: formData
            }).then(res=>res.json()).then(data=>{
                console.log(data);
                if(data.type=="SUCCESS") {
                    setImageURL(data.res);
                }  
            })
            
        }}/>
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
            fetch("http://localhost:3030/sendMessage", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    authorID:userID,
                    serverID: serverID,
                    channelID: chatID,
                    text: inputRef.current.innerText,
                    image: imageURL
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