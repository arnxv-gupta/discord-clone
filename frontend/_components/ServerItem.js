import Link from "next/link";

export default function ServerItem({icon, alt, link}) {
    return (
        <li className="w-12 h-12 mb-4">
            <Link href={link}>
                <img
                src={icon}
                alt={alt}
                width={48}
                height={48}
                className="object-contain opacity-100 hover:scale-110" 
            />
            </Link>
        </li>
    )
}