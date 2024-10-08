import React from 'react';

const textChannels = ['general', 'games', 'music', 'coding'];
const voiceChannels = ['General', 'Gaming', 'Study'];

const ChannelList = () => {
  return (
    <div className="w-64 h-screen bg-discord-light text-gray-300 flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-bold text-white mb-4">Server Name</h2>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-400 text-sm mb-2 uppercase">Text Channels</h3>
          {textChannels.map((channel, index) => (
            <div key={index} className="hover:bg-discord-hover text-white p-2 rounded-lg cursor-pointer transition duration-150">
              # {channel}
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold text-gray-400 text-sm mb-2 uppercase">Voice Channels</h3>
          {voiceChannels.map((channel, index) => (
            <div key={index} className="hover:bg-discord-hover text-white p-2 rounded-lg cursor-pointer transition duration-150">
              🔊 {channel}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
