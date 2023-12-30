import React from "react";
import Header from "./Header";
import MessageBox from "./MessageBox";
import CodeInput from "./CodeInput";
import { getCookies } from "./index";

const App = () => {
    let cookies = getCookies();
    if(!(cookies["username"] && cookies["server"])){
        return(
            <CodeInput />
        )
    }else{
        return(
            <div>
            <Header /> 
            <MessageBox /> 
            </div>
        )
    }
}

export default App;


