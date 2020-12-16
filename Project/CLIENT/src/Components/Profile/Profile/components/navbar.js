import React from "react";
import "../css/navbar.css";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import ChatIcon from "@material-ui/icons/Chat";

const NavBar = () => {
  return (
    <div style={{position:'relative'}}>
      <div style={{position:'absolute',top: "-96px",
    right: "100px"}}>
        <img src="https://i.imgur.com/bfE5EHE.png" style={{width:"150px"}}/>
      </div>
 <div className="navbar-profil">
      <div className="navbar-profil-left">
        <a className="navbar-profil-link" href="/acceuil">
          Home
        </a>
        <a className="navbar-profil-link" href="/allevents">
          Events
        </a>
        <a className="navbar-profil-link" href="/allMateriels">
         comping materials
        </a>
        {/* <a className="navbar-profil-link" href="/photos">
          Photos
        </a> */}
        <a className="navbar-profil-link" href="/videos">
          Videos
        </a>
      </div>
      <div className="navbar-profil-right">
        <button className="navbar-profil-btn">
          <ChatIcon  style={{ fontSize: 40 , color: "#eee"}} />{" "}
        </button>
        
        <a href="/filterEvents">
        <button className="navbar-profil-btn">
          <SearchSharpIcon  style={{ fontSize: 40 , color:" #eee" }} />
        </button>
        </a>
        <button className="navbar-profil-btn" style={{color:"#eee"}}>...</button>
      </div>
    </div>
    </div>
   
  );
};

export default NavBar;
