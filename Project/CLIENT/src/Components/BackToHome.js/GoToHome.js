import React from 'react'
import "./GoToHome.css"
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
const GoToHome=()=>{
    return (
        <div className="headerOfpages">
 <a href="/acceuil"><Avatar style={{backgroundColor:"red"}}><HomeIcon /></Avatar> </a>
        </div>
       
    )
}

export default GoToHome
