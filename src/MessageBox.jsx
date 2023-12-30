import React from "react";
import Message from "./Message";
import { useState } from "react";
import { getCookies } from "./index";
import { getXmlRequestObject } from "./CodeInput";

const sendMessage = (message) => {
    let cookies = getCookies();
    let username = cookies["username"];
    let id = cookies["server"];
    let xhr = getXmlRequestObject();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 201){
            console.log(`Message for user: ${username} has been sent to room with id: ${id}`);
            console.log(xhr.responseText);
            getMessages();
        }
    }
    xhr.open("POST",`http://localhost:5885/sendMessage?id=${id}&username=${username}&message=${message}`);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(null);
}

const getMessages = () => {
    let xhr = getXmlRequestObject();
    let cookies = getCookies();
    let id = cookies["server"];
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(`Messages for room with id: ${id}`);
            let messageDict = JSON.parse(xhr.responseText);
            // let lsit = [];
            // let num = 0
            console.log(Object.entries(messageDict['data']));
            Object.entries(messageDict['data']).forEach(item => {
               console.log(item[1]);
            });
        }
    }
    xhr.open("GET",`http://localhost:5885/sendMessage?id=${id}`);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(null);
}

const getMessage = () => {
    let inputBox = document.getElementById("message");
    let newMessage = inputBox.value;
    sendMessage(newMessage);
    console.log(`Message: ${newMessage}`);
    console.log("printing new dict from inside getMessage");
    return {'Message': newMessage, 'Username':  getCookies()["username"] };
}

// ------------------------------------------------------------------------------------------------------------------
const MessageBox = () => {
    const [ components, setComponents ] = useState([]);
    const addMessage = () => {
        setComponents([...components, getMessage()]);
    }

    return (
            <div id="box-root" >
                <div className="input-container">
                    <input className="input-box" id="message" type="text" placeholder="Message..." />
                    <input className="input-button" type="submit" onClick={ addMessage }/> 
                </div>
                {components.map((item) => ( <Message message={ item["Message"] } username={ item["Username"] }/>) )}
            </div>
    );
};

export default MessageBox;
