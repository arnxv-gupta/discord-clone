import React, {useContext, useEffect, useState} from 'react';
import UserItem from './UserItem';
import { appContext } from './ServerWindow';

const MemberList = () => {
  const data = useContext(appContext)

  if(data==null || data==undefined) {
    return;
  }

  const [members, setMembers]=useState(data.membersList);

  return (
    <div className="w-64 h-screen p-4 bg-[#2B2D31]">
      <h3 className="font-semibold mb-4 text-sm uppercase">Members</h3>
      <ul>
      {(members!=null)?(members.map((member, index) => (
        <UserItem userID={member} key={member}/>
      ))):(<span>Loading</span>)}
      </ul>
    </div>
  );
};

export default MemberList;
