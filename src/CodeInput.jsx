import React from "react";
import { getCookies } from "./index";

const getXmlRequestObject = () => {
        return new XMLHttpRequest();
}
const CodeInput = () => {

    const createRoom = () => {
        let xhr = null;
        xhr = getXmlRequestObject();

        let hostInput = document.getElementById("host-name-input");
        let codeInput = document.getElementById("code-input");
        let idInput = document.getElementById("id-input");

        let host = hostInput.value;
        let id = idInput.value;
        let code = codeInput.value;

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200){
                if(xhr.responseText == "Success"){
                    console.log(`Room with id: ${id} was created by ${host}`);
                    document.cookie = `username=${host};`;
                    document.cookie = `server=${id};`;

                    setTimeout(() => {
                       window.location.reload();
                    }, 500);
                }else{
                    //Will want to handle errors from the API here probably
                    console.log("There was a problem with your submission");
                }
            }
        }
        xhr.open("POST", `http://localhost:5885/newServer/${host}/${id}/${code}`);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.send(JSON.stringify({"data": `User: ${ host } created a room  with id: ${ id } with code: ${ code } `}));
    }

    const joinRoom = () => {
        let xhr = null;
        xhr = getXmlRequestObject();
    
        let userInput = document.getElementById("username-input");
        let userRoomId = document.getElementById("room-id-input");
        let joinInput = document.getElementById("join-input");

        let username = userInput.value;
        let id = userRoomId.value;
        let joinCode = joinInput.value;

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200){
                console.log(`User: ${ username } joined room ${ id } with code ${ joinCode } `);
                if(xhr.responseText == "Success"){
                    document.cookie = `username=${username};`;
                    document.cookie = `server=${id};`;

                    setTimeout(() => {
                       window.location.reload();
                    }, 500);
                }
            }
        }
        xhr.open("POST", `http://localhost:5885/addUser/${username}/${id}/${joinCode}`);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.send(JSON.stringify({"data": `User: ${ username } joined room ${ id } with code ${ joinCode } `}));
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
                        <input type="button" id="join-button" className="access-button" onClick={ joinRoom } value="Submit" />
                    </div>
                </div>
            </div> 
        </div> 
    );
};

export default CodeInput;
export { getXmlRequestObject };
