import React, { useState } from 'react';

const ServerDialogue = () => {
  const [isUpdated, setIsUpdated] = useState(false);

  const handleOptionClick = () => {
    setIsUpdated(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className={`w-full max-w-md p-6 bg-gray-700 rounded-lg shadow-lg relative flex flex-col transition-all duration-300 ${isUpdated ? 'h-[300px]' : 'h-[500px]'}`}>
        {!isUpdated ? (
          <>
            <h2 className="text-3xl font-bold text-white text-center mb-4">Create Your Server</h2>
            <p className='text-md font-medium text-center mb-4 text-gray-300'>
              Your Server is where you and your friends hang out. Make yours and start talking.
            </p>
            <div className="flex flex-col space-y-4 overflow-y-auto mb-16 hide-scrollbar">
              {['Create my own Server', 'Gaming', 'School club', 'Study Group', 'Friends', 'Artists', 'Local Community'].map((item, index) => (
                <div
                  key={index}
                  className='w-full p-4 bg-gray-600 text-white rounded-lg flex justify-between items-center hover:bg-gray-500 transition duration-200 cursor-pointer shadow-md'
                  onClick={handleOptionClick}
                >
                  <p className='font-semibold'>{item}</p>
                  <p className='text-xl'>{'>'}</p>
                </div>
              ))}
              <div className='p-0 text-gray-300 font-medium text-center'>
                Start from template
              </div>
              <p className="text-sm text-gray-400 text-center mt-2">
                Explore ready-made servers to kickstart your community.
              </p>
            </div>
            <p className="text-sm text-gray-400 text-center mb-2">
              Already have an invite?
            </p>
            <button className="absolute bottom-2 left-2 right-2 bg-gray-600 text-white py-3 rounded-lg shadow-lg hover:bg-gray-500 transition duration-200">
              Join the Server
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white text-center mb-4">Tell Us More About Your Server</h2>
            <p className='text-md font-medium text-center mb-4 text-gray-300'>
              In order to help you with your setup,is your new server for just a few friends, or larger community
            </p>
            <div className="flex flex-col space-y-4 mb-4">
              <div className='w-full p-4 bg-gray-600 text-white rounded-lg flex justify-between items-center shadow-md'>
                <p className='font-semibold'>For me and my friends</p>
              </div>
              <div className='w-full p-4 bg-gray-600 text-white rounded-lg flex justify-between items-center shadow-md'>
                <p className='font-semibold'>For club and community</p>
              </div>
            </div>
            <button className="absolute bottom-4 left- right-80 bg-gray-600 text-white py-3 rounded-lg shadow-lg hover:bg-gray-500 transition duration-200">
              Back
            </button>
          </>
        )}
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
