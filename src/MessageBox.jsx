import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import Message from "./Message";

const MessageBox = (props) => {

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    
    const sendMessage = () => {
        let message = document.getElementById("message-input").value;
        console.log(message);
        setInputMessage(message);
        const socket = io('http://localhost:5885');
        console.log(`( MessageBox: sendMessage )${ inputMessage }`);
        console.log(`( MessageBox: sendMessage ) Id: ${ props.roomId }`);
        socket.emit('message', { username: props.username, id: props.roomId, message : message })
    }


    useEffect(() => {
        //Establish a WebSocket connection when the component mounts in the application
        const socket = io('http://localhost:5885');
        
        //Listen for incoming messages
        socket.on('message', (data) => {
            console.log("Data from socket:", data);
            console.log("Data.Messages from socket:", data.messages);
            console.log(Object.entries(data.messages));
            let ls = [];
            if (data.id == props.roomId){
                Object.entries(data.messages)
                    .forEach(item => { ls.push(item[1]) });
            }
            setMessages(ls);
        })
         return () => { socket.disconnect() };

     },[inputMessage]);

    return (
            <div id="box-root" >
                <div className="input-container">
                    <input className="input-box" id="message-input" type="text"  placeholder="Message..." />
                    <input className="input-button" type="submit" onClick={ sendMessage }/> 
                </div>
                 { messages.map( (item) => ( <Message message={ item.message } username={ item.username }/> )) }
            </div>
    );
};

export default MessageBox;
