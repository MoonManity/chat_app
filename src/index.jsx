import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

let xhr = null;

const getXmlRequestObject = () => {
    if (!xhr){
        xhr = new XMLHttpRequest;
    }
    return xhr;
}


ReactDOM.render(
    <div>
        <App />
    </div>
,document.getElementById('root'));


export { getXmlRequestObject };
