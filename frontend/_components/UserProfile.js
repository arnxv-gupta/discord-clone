import { useEffect, useState } from "react"

export default function UserProfile({userID}) {
    let [data, setData] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:3030/userInfo?userID=${userID}`).then(res=>res.json()).then(data=>{
            setData(data.res);
          });
    }, [])

    return (
        <div>
            {data.username}
        </div>
    )
}