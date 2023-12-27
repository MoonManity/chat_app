import React from "react";

const Message = (props) => {
    return (
        <div className="placeholder">
            <div className="message-container">
                <div className="img-container">
                    <img src="https://wallpapercave.com/wp/wp8818047.jpg" />
                </div>
                <div className="text-container">
                    <p> {props.message} </p>
                </div>
            </div>
        </div>
    );
};

export default Message;
