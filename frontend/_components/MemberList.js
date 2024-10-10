import React, {useState} from 'react';

const MemberList = ({data}) => {
  if(data==null || data==undefined) {
    return <span>Loading members</span>
  }

  const [members, setMembers]=useState(data.membersList);
console.log(members);

  return (
    <div className="w-64 h-screen p-4">
      <h3 className="font-semibold mb-4 text-gray-400 text-sm uppercase">Members</h3>
      <ul>
      {members.map((member, index) => (
        <li key={index} className="hover:bg-discord-hover text-white p-2 rounded-lg cursor-pointer transition duration-150">
          {member}
        </li>
      ))}
      </ul>
    </div>
  );
};

export default MemberList;
