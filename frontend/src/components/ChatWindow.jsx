import React from 'react';

const ChatWindow = () => {
  return (
    <div className="flex-1 bg-discord-light text-white p-6 flex flex-col justify-between">
      <div className="flex-grow overflow-auto space-y-4 bg-discord-chat p-4 rounded-lg">
        <div className="text-sm font-medium">Welcome to the general chat!</div>
        <div className="text-sm font-medium">Message #1</div>
        <div className="text-sm font-medium">Message #2</div>
      </div>
      <div className="mt-4 flex items-center">
        <input
          className="flex-grow p-3 bg-discord-input rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Type a message"
        />
      </div>
    </div>
  );
};

export default ChatWindow;
