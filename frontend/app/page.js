import Link from "next/link";

export default function Page() {
    return (
        <div>
            <Link href="/auth">Auth</Link>
            <Link href="/channels/123/232">Chat</Link>

        </div>
    )
}