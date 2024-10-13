"use client"
import React, { useEffect, useState } from 'react';

const UserProfile = ({userID}) => {

  const [userData, setUserData] = useState(null);

  useEffect(()=>{
    console.log(userID);
    
    console.log(`http://localhost:3030/userInfo?userID=${userID}`);
    
   async function getData() {
    await fetch(`http://localhost:3030/userInfo?userID=${userID}`).then(res=>res.json()).then(data=>{
      console.log(data);
      
      setUserData(data.res);
    })
   }

   getData()

  }, [])

  return (
    <div className="bg-[#282828] p-4 text-white">
      <div className="flex items-center">
        <img 
        className="w-10 h-10 bg-gray-600 rounded-full"
        src={(userData!=null?(userData.pfpURL):("Loading"))}
        />
        <div className="ml-2">
          <p className="font-bold">{(userData!=null?(userData.username):("Loading"))}</p>
          <p className="text-sm text-gray-400">#1234</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
