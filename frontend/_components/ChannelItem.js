import Link from "next/link";

export default function ChannelItem({name, icon}) {
    return (
        <li>
            <span>{icon}</span>
            {name}
        </li>
    )
}