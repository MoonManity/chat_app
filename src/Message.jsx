import React from "react";

const Message = (props) => {
    return (
        <div className="placeholder">
            <div className="output-container">
                <div className="uc">
                    <p>{ props.username }</p>
                </div>
                <div className="message-container">
                    <div className="text-container">
                        <p> { props.message } </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
