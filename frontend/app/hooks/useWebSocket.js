const { useState, useEffect } = require("react")

const useWebSocket = (url, userID)=>{
    const [ws, setWS] = useState(null);
    const [socketData, setSocketData] = useState(userID)

    useEffect(()=>{

        const socket = new WebSocket(url);
        setWS(socket);

        socket.onopen = ()=>{
            socket.send(userID)
        }
            
        socket.onmessage = (event) =>{
            console.log(event.data, "Data websocket!");
            
            setSocketData(event.data)
        }

        // return ()=>{
        //     socket.close();
        // };
    }, [url])

    const sendMessage = (message)=>{
        if(ws) {
            console.log(message);
            ws.send(message);
        }
    }

    return {socketData, setSocketData, sendMessage};
}

export default useWebSocket;