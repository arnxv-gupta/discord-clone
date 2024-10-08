import React from 'react';

const members = ['Alice', 'Bob', 'Charlie', 'Dave'];

const MemberList = () => {
  return (
    <div className="w-64 h-screen bg-[#282828] text-gray-300 p-4">
      <h3 className="font-semibold mb-4 text-gray-400 text-sm uppercase">Members</h3>
      {members.map((member, index) => (
        <div key={index} className="hover:bg-discord-hover text-white p-2 rounded-lg cursor-pointer transition duration-150">
          {member}
        </div>
      ))}
    </div>
  );
};

export default MemberList;
