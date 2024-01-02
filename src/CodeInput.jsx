import React from "react";

const createRoom = async (setUsernameCb, setRoomIdCb) => {
    let username = document.getElementById("host-name-input").value;
    let roomId = document.getElementById("code-input").value;
    let code = document.getElementById("id-input").value;
    
    let request = await fetch(`http://localhost:5885/newServer/${username}/${roomId}/${code}`);
    let response = await request.json();
    console.log(`Response: ${response["Result"]}`);

    if (response["Result"] == "success" && username != ''){
        console.log(`Room with id: ${roomId} was created by ${username}`);

        setUsernameCb(username);
        setRoomIdCb(roomId);

    }else{
        console.log("There was a problem with your submission");
    }
}

const joinRoom = async (setUsernameCB, setRoomIdCB) => {
    let username = document.getElementById("username-input").value;
    let roomId = document.getElementById("room-id-input").value;
    let code = document.getElementById("join-input").value;
    
    let request = await fetch(`http://localhost:5885/addUser/${username}/${roomId}/${code}`)
    let response = await request.json();
    console.log(response);

    if(response["Result"] == "Success"){
        console.log(`User: ${ username } joined room ${ roomId } with code ${ code } `);

        setUsernameCB(username);
        setRoomIdCB(roomId);


    }else{
        console.log(`Result of "join-room": ${response["Result"]}`)
    }
}

const CodeInput = (props) => {

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
                        <input type="button" id="create-button" className="access-button" onClick={ props.functionCR } value="Submit" />
                    </div>
                    <div className="join-room-container">
                        <input type="text" id="username-input" className="access-input" spellCheck="false" placeholder="Username:"/>
                        <input type="text" id="room-id-input" className="access-input" spellCheck="false" placeholder="Room:"/>
                        <input type="text" id="join-input" className="access-input" spellCheck="false" placeholder="Code:"/>
                        <input type="button" id="join-button" className="access-button" onClick={ props.functionJR } value="Submit" />
                    </div>
                </div>
            </div> 
        </div> 
    );
};

export { joinRoom, createRoom };
export default CodeInput;
