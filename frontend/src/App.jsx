import React from 'react';
import './index.css'
import ServerList from './components/ServerList.jsx';
import ChannelList from './components/ChannelList';
import ChatWindow from './components/ChatWindow';
import MemberList from './components/MemberList.jsx';
import VoiceControls from './components/VoiceControls.jsx';

function App() {
  return (
    <div className="flex h-screen bg-discord-light">
      <ServerList />
      <ChannelList />
      <div className="flex flex-col flex-1">
        <ChatWindow />
        <VoiceControls />
      </div>
      <MemberList />
    </div>
  );
}

export default App;