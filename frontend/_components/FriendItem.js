export default function FriendItem({name}) {
    // add pfp
    return (
        <li  className="px-3 py-2 hover:bg-[#35373C] block rounded-md">
            {name}
        </li>
    )
}