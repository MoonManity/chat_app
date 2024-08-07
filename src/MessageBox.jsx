import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import Message from "./Message";
import { API_URL } from "./App";

const MessageBox = (props) => {
    const sendMessage = () => {
        let message = document.getElementById("message-input").value;
        console.log(message);
        setInputMessage(message);
        const socket = io(`http://${API_URL}:5885`);
        console.log(`{ username: ${props.username}, id: ${props.roomId}, message : ${message}}`);
        console.log("sendMessage -> messages", messages);
        socket.emit('message', { username: props.username, id: props.roomId, message : message })
    }

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        //Establish a WebSocket connection when the component mounts in the application
        const socket = io(`http://${API_URL}:5885`);
        
        //Listen for incoming messages
        socket.on('message', (data) => {
            console.log("Data from socket:", data);
            console.log("Data.Messages from socket:", data.messages);
            let ls = [];
            if (data.id == props.roomId){
                console.log("blah", data.messages);
                // data.messages.map((item) => (ls.push(item)) )
                for (const item in data.messages){
                    ls.push(data.messages[item]);
                }
            }
            setMessages(ls);
        })
         return () => { socket.disconnect() };

     },[inputMessage]);

    useEffect( async ()=>{
        let request = await fetch(`http://${API_URL}:5885/getInitMessages/${props.roomId}`);
        try{
            const response = await request.json();
            console.log(response);
            let ls = [];
            console.log("blah", response.messages);
            for (const item in response.messages){
                ls.push(response.messages[item]);
            }
            setMessages(ls);
        }catch (e){
            //This would be where we would add any animations for user authentication errors.
            console.log(`User ran into a problem when joining room ${props.roomId}`);
        }
    }, [props.roomId])

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
