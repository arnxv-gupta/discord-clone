import { useRouter } from "next/navigation";
import ServerDropItem from "./ServerDropItem";

export default function ServerDropDown({serverID}) {
  let router = useRouter()
  return (
    <ul className="absolute top-full left-0 w-full bg-[#2B2D31] shadow-lg rounded-lg text-white text-sm z-10">
        <ServerDropItem label="Create channel" call={()=>{
            fetch("http://localhost:3030/createChannel/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "default",
                    type: "text",
                    serverID: serverID
                })
            }).then(res=>res.json()).then(data=>{
              console.log(data);
              
              if(data.type=="SUCCESS") {
                  router.refresh()
              }
            })
        }}/>
    </ul>
  );
}
