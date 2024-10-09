import ServerList from "../components/ServerList"
import ChannelList from "../components/ChannelList"
import ChannelWindow from "../components/ChatWindow"
import MemberList from "../components/MemberList"
export default function Channel() {
    return (
        <div className="flex">
        <ServerList />
        <ChannelList />
        <ChannelWindow />
        <MemberList />
        </div>
    )
}