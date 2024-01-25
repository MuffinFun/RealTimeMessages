import '../App.css'
import { useRef, useState } from 'react'


const WebSockets = () =>{

    // eslint-disable-next-line no-unused-vars
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('')
    const socket = useRef()
    const [username, setUsername] = useState('')
    const [connected, setConnected] = useState(false)

    const setInputValue = (e)=>{
        setValue(e.target.value)
    }

    const connect = () =>{
        socket.current = new WebSocket('ws://localhost:5000')


        socket.current.onopen =()=>{
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        } 

        socket.current.onmessage = (event)=>{
            const message = JSON.parse(event.data)
            setMessages(prev=>[message, ...prev])
        }

        socket.current.onclose = ()=>{
            console.log('user disconected')
        }

        socket.current.onerror = ()=>{
            console.log('error connection')
        }

    }

    const sendMessage = async () =>{
       const message = {
        username,
        id: Date.now(),
        message: value,
        event: 'message'
       }
       socket.current.send(JSON.stringify(message))
       setValue('')
    }

    if(!connected){
        return (
            <div className="center">
            <div>
                <div className="form">
                    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='input your name'/>
                    <button onClick={connect}>CONNECT</button>
                </div>
            </div>
        </div>
        )
    }

    return (
    <div className="center">
        <div>
            <div className="form">
                <label htmlFor="input" >Write a message</label>
                <input type="text" value={value} onChange={setInputValue}/>
                <button onClick={sendMessage}>SEND</button>
            </div>
            <div className="messages">
                {!(messages.length === 0) ? messages.map(mess=>
                   <div key={mess.id}>
                    {
                        mess.event === 'connection'
                        ?
                        <div className='connection_message'>User {mess.username} connected</div>
                        : 
                         <div className='message'>{mess.username}: {mess.message}</div>
                    }
                   </div>
                ):<p>empty list</p>}
            </div>
        </div>
    </div>
    )
}

export default WebSockets;