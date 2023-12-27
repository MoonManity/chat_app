import React from "react";
import Message from "./Message";
import { useState } from "react";

   
const MessageBox = () => {
    const [ components, setComponents ] = useState([]);
    const getMessage = () => {
        let inputBox = document.getElementById("message");
        let newMessage = inputBox.value;
        console.log(`Message: ${newMessage}`);
        return newMessage;
    }
    const addMessage = () => {
        setComponents([...components, getMessage()]);
    }
    return (
            <div id="box-root" >
                <div className="input-container">
                    <input className="input-box" id="message" type="text" placeholder="Message..." />
                    <input className="input-button" type="submit" onClick={ addMessage }/> 
                </div>
                {components.map((item) => ( <Message message={ item }/>) )}
            </div>
    );
};

export default MessageBox;
