import React from 'react';

const ServerDialogue = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full h-[500px] max-w-md p-6 bg-gray-700 rounded-lg shadow-lg relative flex flex-col">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Create Your Server</h2>
        <p className='text-md font-medium text-center mb-4 text-gray-300'>
          Your Server is where you and your friends hang out. Make yours and start talking.
        </p>
        <div className="flex flex-col space-y-4 overflow-y-auto mb-16 hide-scrollbar">
          {['Create my own Server', 'Gaming', 'School club', 'Study Group', 'Friends', 'Artists', 'Local Community'].map((item, index) => (
            <div
              key={index}
              className='w-full p-4 bg-gray-600 text-white rounded-lg flex justify-between items-center hover:bg-gray-500 transition duration-200 cursor-pointer shadow-md'
            >
              <p className='font-semibold'>{item}</p>
              <p className='text-xl'>{'>'}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 text-center mb-2">
          Already have an invite?
        </p>
        <button className="absolute bottom-4 left-4 right-4 bg-gray-600 text-white py-3 rounded-lg shadow-lg hover:bg-gray-500 transition duration-200">
          Join the Server
        </button>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}
export default ServerDialogue;
