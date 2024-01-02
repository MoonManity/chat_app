import React,  { useState, useEffect } from "react";
import Header from "./Header";
import MessageBox from "./MessageBox";
import CodeInput, { createRoom, joinRoom } from "./CodeInput";


const App = () => {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");

    const removeUser = async () => {
        let request = await fetch(`http://localhost:5885/removeUser/${roomId}/${username}`)
        let response = await request.json()
        console.log(response);
        if (response["Result"] = "success"){
            console.log(`Cookies removed and user: ${username} has been removed from server: ${roomId}`);
            window.location.reload();
        }else{
            console.log("removeUser failed");
        }
    }

    if (username != "" && roomId != ""){
        return(
            <div>
                <Header remove = { removeUser }/>
                <MessageBox username = { username } roomId = { roomId }/>
            </div>
        )
    }else{
        return(
            <CodeInput 
                functionCR = { () => {
                    createRoom(setUsername, setRoomId) 
                }} 
                functionJR = { () => {
                    joinRoom(setUsername, setRoomId)
                }} 
            />
        )
    }
}

export default App;


