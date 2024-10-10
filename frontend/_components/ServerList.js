"use client";
import { useEffect, useRef, useState } from "react";
import ServerDialogue from "./ServerDialogue";
import Link from "next/link";

const ServerList = () => {
  const [isDialog, setIsDialog] = useState(false);
  const [servers, setServers]= useState([]);

  useEffect(()=>{
   async function getServerInfo() {
      await fetch(`http://localhost:3030/userInfo?userID=${localStorage.getItem("userID")}`).then(res=>res.json()).then(async data=>{
        let serverData = await data.res;
        setServers(serverData.joinedServers)
      })
    }

    getServerInfo();
      
  }, [])

  return (
    <>
    {isDialog&&<ServerDialogue />}

      <div className="w-16 h-screen flex flex-col items-center py-4 space-y-3">
        <ul>
        {
          (servers.length>0 && (
          servers.map((server, index) => {
            return (
          <li
            key={index}
            className="bg-gray-800 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition duration-200 transform hover:bg-gray-600 hover:scale-110"
          >
            <Link href={`/channels/${server}`}>
            <span className="text-white text-xs">{server}</span>
            </Link>
        </li>
            )
              
        })
      ))
        }
        </ul>

        <div
          className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition duration-200 transform hover:bg-gray-600 hover:scale-110"
          onClick={() => {
            fetch("http://localhost:3030/createServer", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: "Test sercer",
                adminID: localStorage.getItem("userID"),
              }),
            })
              .then((res) => res.text())
              .then((data) => {
                console.log(data);
              });
          }}
        >
          <div 
          className="bg-gray-700 w-12 h-12 flex items-center justify-center cursor-pointer transition duration-200 transform hover:bg-gray-600  rounded-md hover:scale-110"
          onClick={() => {
            setIsDialog(true);
          }}
          >
            <span className="text-white text-2xl">
              +
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerList;
