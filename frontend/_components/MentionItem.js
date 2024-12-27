import { useEffect, useState } from "react"

export default function MentionItem({userID}) {

    const [data, setData] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:3030/userInfo?userID=${userID}`).then(res=>res.json()).then(data=>{
            //console.log(data);
            setData(data.res);
          })
    }, [])

    if(data==null) return

    return (
        <span>
            {data.username}
        </span>
    )
    
}