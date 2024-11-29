import Link from "next/link";
import { useEffect, useState } from "react";

export default function ServerItem({id, link}) {

    const [data, setData] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:3030/serverInfo?serverID=${id}`).then(res=>res.json()).then(data=>{
            setData(data.res);
        })
    }, [])

    return (
        <li className="w-12 h-12 mb-4">
            <Link href={link}>
                <img
                src={(data!=null)?data.serverIcon:null}
                alt={id}
                width={48}
                height={48}
                className="object-contain opacity-100 hover:scale-110" 
            />
            </Link>
        </li>
    )
}