import '../App.css'
import {useEffect, useState } from 'react'
import axios from 'axios'


const EventSourcing = () =>{

    // eslint-disable-next-line no-unused-vars
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('')

    useEffect(()=>{
        subscribe()
    }, [])


    const setInputValue = (e)=>{
        setValue(e.target.value)
    }

    const subscribe = async () =>{
        const eventSource = new EventSource('http://localhost:5000/connect');
        eventSource.onmessage = (event) =>{
            const message = JSON.parse(event.data);
            console.log(event.data)
            setMessages(prev => [message, ...prev]);
        }
    }
    
    const sendMessage = async () =>{
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
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
                   <div className="message" key={mess.id}>{mess.message}</div>
                ):<p>empty list</p>}
            </div>
        </div>
    
    </div>
    )
}

export default EventSourcing;