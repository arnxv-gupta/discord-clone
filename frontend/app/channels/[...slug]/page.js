"use client";
import ServerList from "@/_components/ServerList";

import useWebSocket from "@/app/hooks/useWebSocket";
import ServerWindow from "@/_components/ServerWindow";
import { createContext } from "react";


export default function Channels() {

  return (
      <div className="flex">
        <ServerList />
        <ServerWindow/>
      </div>
  );
}
