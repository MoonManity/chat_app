import React from "react";


const Header = (props) => {

    return(
        <div>
            <header>
                <h1>Our Chat</h1>     
                <h2>{ props.username }</h2>
                <h2>{ props.roomId }</h2>
                <input type="button" className="exit-button" id="exit-button" onClick={ props.remove } value="Exit"/>
            </header>
        </div>
    );
};

export default Header;
