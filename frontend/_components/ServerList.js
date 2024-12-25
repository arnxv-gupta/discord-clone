"use client";

import { memo, useEffect, useState } from "react";
import ServerDialogue from "./ServerDialogue";
import Link from "next/link";
import Image from "next/image"; 
import ServerItem from "./ServerItem";


const ServerList = memo(() => {
  const [isDialog, setIsDialog] = useState(false);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    async function getServerInfo() {
      await fetch(`http://localhost:3030/userInfo?userID=${localStorage.getItem("userID")}`)
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          setServers(await data.res.joinedServers);
        });
    }

    getServerInfo();
  }, []);

  return (
    <>
      {isDialog && <ServerDialogue />}

      <ul className="p-3 h-screen flex flex-col items-center space-y-1 bg-[#1E1F22]"> 
        <ServerItem id={null} link="/channels/@me" />
        <hr className="w-10/12  border-gray-600" />

        <ul className="w-full flex flex-col items-center space-y-2">
          {servers.length > 0 &&
            servers.map((id, index) => (
              <ServerItem id={id} link={`/channels/${id}`} key={id} />
            ))}
        </ul>

        <div
          className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition duration-200 transform hover:bg-gray-600 hover:scale-110"
          onClick={() => {
            setIsDialog(true);
          }}
        >
          <span className="text-white text-2xl">+</span>
        </div>
      </ul>
    </>
  );
});

export default ServerList;
