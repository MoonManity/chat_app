import React from "react";
import { getCookies } from "./index";
import { getXmlRequestObject } from "./CodeInput";

const Header = () => {
    const removeUser = () => {
        let cookies = getCookies();
        let username = cookies["username"];
        let id = cookies["server"];
        let xhr = getXmlRequestObject();
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                console.log(`Cookies removed and user: ${username} has been removed from server: ${id}`);
                console.log(xhr.responseText);
                document.cookie = "username=; expires=expired";
                document.cookie = "server=; expires=expired";
                window.location.reload();
            }
        }
        xhr.open("POST",`http://localhost:5885/removeUser/${id}/${username}`);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.send(null);
    }
    return(
        <div>
            <header>
                <h1>Our Chat</h1>     
                <input type="button" className="exit-button" id="exit-button"onClick={ () => {
                        removeUser();
                    } 
                } value="Exit"/>
            </header>
        </div>
    );
};

export default Header;
