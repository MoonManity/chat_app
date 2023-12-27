import React from "react";
import { getXmlRequestObject } from "./index";
const CodeInput = () => {
    let xhr = null;

    const createRoom = () => {
        let hostInput = document.getElementById("host-name-input");
        let codeInput = document.getElementById("code-input");
        let idInput = document.getElementById("id-input");
        let host = hostInput.value;
        let id = idInput.value;
        let code = codeInput.value;
        xhr = getXmlRequestObject();
        xhr.onreadystatechange = () => {
            if (xhr.readystate == 4 && xhr.status == 201){
                console.log(`Room with id: ${id} was created by ${host}`)
            }
        }
        xhr.open("POST", `http://localhost:5885/newServer/${host}/${id}/${code}`)
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    }

    const joinRoom = () => {
        let userInput = document.getElementById("username-input");
        let userRoomId = document.getElementById("room-id-input");
        let joinInput = document.getElementById("join-input");
        if (userInput && userRoomId && joinInput){
            let username = userInput.value;
            let id = userRoomId.value;
            let joinCode = joinInput.value;
            xhr = getXmlRequestObject();
            xhr.onreadystatechange = () => {
                if (xhr.readystate == 4 && xhr.status == 200){
                    console.log(`User: ${ username } joined room ${ id } with code ${ joinCode } `)
                }
            }
            xhr.open("POST", `http://localhost:5885/addUser/${username}/${id}/${joinCode}`)
            xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        }
    }

    return (
        <div className="page-overlay">
            <div className="access-box">
                <div className="access-header">
                    <h2>Create Room</h2>
                    <h2>/</h2>
                    <h2>Join Room</h2>
                </div>
                <div className="access-input-container">
                    <div className="create-room-container">
                        <input type="text" id="host-name-input" className="access-input" spellCheck="false" placeholder="Host Name:"/>
                        <input type="text" id="id-input" className="access-input" spellCheck="false" placeholder="Id:"/>
                        <input type="text" id="code-input" className="access-input" spellCheck="false" placeholder="Code:"/>
                        <input type="button" id="create-button" className="access-button" onClick={ createRoom } value="Submit" />
                    </div>
                    <div className="join-room-container">
                        <input type="text" id="username-input" className="access-input" spellCheck="false" placeholder="Username:"/>
                        <input type="text" id="room-id-input" className="access-input" spellCheck="false" placeholder="Room:"/>
                        <input type="text" id="join-input" className="access-input" spellCheck="false" placeholder="Code:"/>
                        <input type="button" id="join-button" className="access-button" onClick={ joinRoom() } value="Submit" />
                    </div>
                </div>
            </div> 
        </div> 
    );
};

export default CodeInput;
