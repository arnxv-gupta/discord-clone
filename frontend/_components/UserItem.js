"use client"
import React, { useEffect, useState } from 'react';

const UserItem = ({userID}) => {

  const [userData, setUserData] = useState(null);

  useEffect(()=>{
   async function getData() {
    await fetch(`http://localhost:3030/userInfo?userID=${userID}`).then(res=>res.json()).then(data=>{
      //console.log(data);
      setUserData(data.res);
    })
   }

   getData()

  }, [])

  return (
    <div className="p-3 text-white text-sm hover:bg-[#35373C] rounded">

      <div className="flex items-center">
        <img 
        className="w-9 h-9 bg-gray-600 rounded-full"
        src={(userData!=null?(userData.pfpURL):("Loading"))}
        />
        <span>{(userData!=null)?userData.onlinePresence:null}</span>
        <div className="ml-2">
          <p className="font-bold">{(userData!=null?(userData.username):("Loading"))}</p>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
