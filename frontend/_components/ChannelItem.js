import Link from "next/link";
import OptionItem from "./OptionItem";
import { useState } from "react";

export default function ChannelItem({name, icon, link}) {
    const [showDropdown, setDropdownVisibility] = useState(false);
    return (
        <li onContextMenu={(e)=>{
            if(e.nativeEvent.button === 2) {
                e.preventDefault()
                setDropdownVisibility(true)
                setMouseCords({x: e.pageX, y: e.pageY});                
            }
        }}>
            <Link href={link} disabled={true} className="px-3 py-2 m-2 hover:bg-[#35373C] block rounded-md disabled:hidden">
                <span className="mr-2">{icon}</span>
                {name}            
            </Link>
            {
                showDropdown?(
            <ul className={`bg-[#111214] rounded m-2 absolute top-0 right-0`}>
                <OptionItem label="op1" />
                <OptionItem label="op2" />
            </ul>
                ):null
            }
        </li>
    )
}