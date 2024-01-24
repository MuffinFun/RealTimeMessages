import '../App.css'
import {useEffect, useState } from 'react'
import axios from 'axios'
const LongPulling = () =>{

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
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages')
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (error) {
            setTimeout(()=>{
                subscribe()
            }, 500)
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

export default LongPulling;