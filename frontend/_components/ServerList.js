"use client";

import { useEffect, useState } from "react";
import ServerDialogue from "./ServerDialogue";
import Link from "next/link";
import Image from "next/image"; 

import DiscordLogo from './assets/svgviewer-output.svg';

const ServerList = () => {
  const [isDialog, setIsDialog] = useState(false);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    async function getServerInfo() {
      await fetch(`http://localhost:3030/userInfo?userID=${localStorage.getItem("userID")}`)
        .then((res) => res.json())
        .then(async (data) => {
          let serverData = await data.res;
          setServers(serverData.joinedServers);
        });
    }

    getServerInfo();
  }, []);

  return (
    <>
      {isDialog && <ServerDialogue />}

      <div className="p-3 h-screen w-24 flex flex-col items-center py-4 space-y-3 bg-gray-900"> 
        <div className="w-12 h-12 mb-4">
          <Image
            src={DiscordLogo} 
            alt="Discord Logo"
            width={48}
            height={48}
            className="object-contain opacity-100 hover:scale-110" 
          />
        </div>

        <hr className="w-10/12 border-t border-gray-600 my-2" />

        <ul className="w-full space-y-2">
          {servers.length > 0 &&
            servers.map((server, index) => (
              <li
                key={index}
                className="bg-gray-800 my-2 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition duration-200 transform hover:bg-gray-600 hover:scale-110"
              >
                <Link href={`/channels/${server}`}>
                  <span className="text-white text-xs">{server}</span>
                </Link>
              </li>
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
      </div>
    </>
  );
};

export default ServerList;
