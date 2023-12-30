import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const getCookies = () =>{
    let dict = {}
    let x = document.cookie;
    x.split(";").map((item, _)=> {
        let s = item.trim().split("=");
        dict[s[0]] = s[1];
    });
    return dict;
}

ReactDOM.render(
    <div>
        <App />
    </div>
,document.getElementById('root'));

export { getCookies };
