"use client";

import { useContext, useEffect, useState } from "react";
import UserMention from "./UserMention";
import { appContext } from "./ServerWindow";

export default function ChatItem({ authorID, text, timestamp, image }) {
    const data = useContext(appContext);
    const [isMentioned, setIsMentioned] = useState(text.match(`<@${localStorage.getItem("userID")}>`))
  const [authorData, setAuthorData] = useState(null);
  const [time, setTime] = useState(new Date(timestamp).toDateString());

  useEffect(() => {
    fetch(`http://localhost:3030/userInfo?userID=${authorID}`)
      .then((res) => res.json())
      .then((data) => {
        setAuthorData(data.res);
      });
  }, []);

  if (authorData == null) {
    return;
  }

  return (
    <li className={`py-2 px-6 flex ${isMentioned?"bg-[#444037]":"hover:bg-[#2E3035]"}`}>
      <img
        src={
          authorData.pfpURL == null
            ? "http://velocityacademy.org/wp-content/uploads/2016/03/placeholder.jpg"
            : authorData.pfpURL
        }
        className="rounded-full size-8 mr-3 mt-1"
      />
      <div>
        <div className="flex items-center mb-1">
          <div className="flex items-baseline">
            <h5>{authorData.username}</h5>
            <time className="text-xs text-[#b5b5b5] ml-2">{time}</time>
          </div>
        </div>
        {image != null ? <img src={image} className="max-w-xl" /> : null}
        <pre className="whitespace-normal">
            {text.match(/<@(.*?)>/)?(text.split(/<@(.*?)>/).map((el, index)=>{

                if(!text.match(/<@(.*?)>/).includes(el)|| el==" ") {
                    return el;
                } else {
                    return <UserMention userID={el} />
                }
            })):text}</pre>
      </div>
    </li>
  );
}
