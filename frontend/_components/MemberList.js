import React, {useEffect, useState} from 'react';
import UserProfile from './UserProfile';

const MemberList = ({data}) => {
  if(data==null || data==undefined) {
    return <span>Loading members</span>
  }

  const [members, setMembers]=useState(data.membersList);

  

  return (
    <div className="w-64 h-screen p-4">
      <h3 className="font-semibold mb-4 text-gray-400 text-sm uppercase">Members</h3>
      <ul>
      {(members!=null)?(members.map((member, index) => (
        <UserProfile userID={member} key={member}/>
      ))):(<span>Loading</span>)}
      </ul>
    </div>
  );
};

export default MemberList;
