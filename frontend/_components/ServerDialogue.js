import React, { useState, useRef } from 'react';

const ServerDialogue = () => {
  const [currentStep, setCurrentStep] = useState(1); 
  const [isNotSure, setIsNotSure] = useState(false);
  const containerRef = useRef(null);

  const handleOptionClick = () => {
    setCurrentStep(2); 
    setIsNotSure(false);
    if (containerRef.current) {
      containerRef.current.style.maxHeight = '1000px';
    }
  };

  const handleNotSureClick = () => {
    setIsNotSure(true);
    if (containerRef.current) {
      containerRef.current.style.maxHeight = '1000px';
    }
  };

  const handleBackClick = () => {
    if (isNotSure) {
      setIsNotSure(false);
    } else {
      if (currentStep === 3) {
        setCurrentStep(2);
        if (containerRef.current) {
          containerRef.current.style.maxHeight = '1000px';
        }
      } else if (currentStep === 2) {
        setCurrentStep(1); 
        if (containerRef.current) {
          containerRef.current.style.maxHeight = '500px'; 
        }
      }
    }
  };

  const handleNextToServerName = () => {
    setCurrentStep(3); 
    setIsNotSure(false); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full absolute">
      <div
        ref={containerRef}
        className={`w-full max-w-md p-6 bg-gray-700 rounded-lg shadow-lg relative flex flex-col transition-all duration-300 ${
          currentStep !== 1 || isNotSure ? 'max-h-[1000px]' : 'max-h-[500px]'
        } overflow-hidden`}
        style={{
          transition: 'max-height 0.3s ease-in-out',
        }}
      >
        {currentStep === 1 && !isNotSure ? (
          <>
            <h2 className="text-3xl font-bold text-white text-center mb-4">Create Your Server</h2>
            <p className="text-md font-medium text-center mb-4 text-gray-300">
              Your Server is where you and your friends hang out. Make yours and start talking.
            </p>
            <div className="flex flex-col space-y-4 overflow-y-auto hide-scrollbar flex-grow mb-2">
              {[
                'Create my own Server',
                'Gaming',
                'School club',
                'Study Group',
                'Friends',
                'Artists',
                'Local Community',
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-full p-4 bg-gray-600 text-white rounded-lg flex justify-between items-center hover:bg-gray-500 transition duration-200 cursor-pointer shadow-md"
                  onClick={handleOptionClick}
                >
                  <p className="font-semibold">{item}</p>
                  <p className="text-xl">{'>'}</p>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <p className="text-sm text-gray-400 text-center mb-2">Already have an invite?</p>
              <button className="w-full bg-gray-600 text-white py-3 rounded-lg shadow-lg hover:bg-gray-500 transition duration-200">
                Join the Server
              </button>
            </div>
          </>
        ) : currentStep === 2 && !isNotSure ? (
          <>
            <h2 className="text-2xl font-bold text-white text-center mb-4">Tell Us More About Your Server</h2>
            <p className="text-md font-medium text-center mb-4 text-gray-300">
              In order to help you with your setup, is your new server for just a few friends, or a larger community?
            </p>
            <div className="flex flex-col space-y-4 mb-4">
              <div
                className="w-full p-4 bg-gray-600 text-white rounded-lg flex justify-between items-center shadow-md hover:bg-gray-500 cursor-pointer"
                onClick={handleNextToServerName} 
              >
                <p className="font-semibold">For me and my friends</p>
              </div>
              <div
                className="w-full p-4 bg-gray-600 text-white rounded-lg flex justify-between items-center shadow-md hover:bg-gray-500 cursor-pointer"
                onClick={handleNextToServerName} 
              >
                <p className="font-semibold">For club and community</p>
              </div>
              <div
                className="w-full p-4 bg-gray-200 text-gray-800 rounded-lg flex justify-center items-center shadow-md hover:bg-gray-300 cursor-pointer"
                onClick={handleNotSureClick}
              >
                <p className="font-semibold">Not Sure? You can Skip</p>
              </div>
            </div>
            <div className="flex justify-between mt-auto">
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-500 transition duration-200"
                onClick={handleBackClick} 
              >
                Back
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white text-center mb-4">Customize Your Server</h2>
            <p className="text-md font-medium text-center mb-4 text-gray-300">
              Give your new server a personality with a name and an icon. You can always change it later.
            </p>
            <div className="flex justify-center items-center mb-4 relative">
              <div className="w-16 h-16 border-4 border-dotted border-white rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <label className="block text-white text-sm font-semibold mb-2">Server Name</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-600 text-white rounded-lg shadow-md mb-4"
              placeholder="Enter server name"
            />
            <div className="flex justify-between mt-auto">
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-500 transition duration-200"
                onClick={handleBackClick} 
              >
                Back
              </button>
              <button className="bg-[#5865F2] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#4853d4] transition duration-200">
                Create
              </button>
            </div>
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
};

export default ServerDialogue;
