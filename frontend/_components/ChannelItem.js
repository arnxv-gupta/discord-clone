import Link from "next/link";

export default function ChannelItem({name, icon, link}) {
    return (
        <li>
            <Link href={link} className="px-3 py-2 m-2 hover:bg-[#35373C] block rounded-md">
                <span className="mr-2">{icon}</span>
                {name}            
            </Link>
        </li>
    )
}