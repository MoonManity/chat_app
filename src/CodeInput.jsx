import React from "react";

const createRoom = async (setUsernameCb, setRoomIdCb) => {
    let username = document.getElementById("host-name-input").value;
    let roomId = document.getElementById("id-input").value;
    let code = document.getElementById("code-input").value;
    
    let request = await fetch(`http://localhost:5885/newServer/${username}/${roomId}/${code}`);
    try{
        let response = await request.json();
        console.log(`Response: ${response["Result"]}`);

        if (response["Result"] == "Success" && username != ''){
            console.log(`Room with id: ${roomId} was created by ${username}`);
            setUsernameCb(username);
            setRoomIdCb(roomId);
        }else{
            console.log("There was a problem with your submission");
        }
    }catch (e){
        //This would be where we would add any animations for user authentication errors.
        console.log("This roomId already exists");
    }

}

const joinRoom = async (setUsernameCB, setRoomIdCB) => {
    let username = document.getElementById("username-input").value;
    let roomId = document.getElementById("join-id-input").value;
    let code = document.getElementById("join-code-input").value;
    
    let request = await fetch(`http://localhost:5885/addUser/${username}/${roomId}/${code}`)
    try{
        const response = await request.json();
        console.log(response);
        if(response["Result"] == "Success"){
            console.log(`User: ${ username } joined room ${ roomId } with code ${ code } `);
            setUsernameCB(username);
            setRoomIdCB(roomId);
        }
    }catch (e){
        //This would be where we would add any animations for user authentication errors.
        console.log(`User ran into a problem when joining room ${roomId}`);
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
                        <input type="text" id="join-id-input" className="access-input" spellCheck="false" placeholder="Room:"/>
                        <input type="text" id="join-code-input" className="access-input" spellCheck="false" placeholder="Code:"/>
                        <input type="button" id="join-button" className="access-button" onClick={ props.functionJR } value="Submit" />
                    </div>
                </div>
            </div> 
        </div> 
    );
};

export { joinRoom, createRoom };
export default CodeInput;
