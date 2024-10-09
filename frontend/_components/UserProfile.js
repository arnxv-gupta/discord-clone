import React from 'react';

const UserProfile = () => {
  return (
    <div className="bg-[#282828] p-4 text-white">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        <div className="ml-2">
          <p className="font-bold">User123</p>
          <p className="text-sm text-gray-400">#1234</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
