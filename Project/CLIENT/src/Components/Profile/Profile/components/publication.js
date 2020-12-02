import React, { useEffect, useState } from "react";
import CardEvent from "../../../CardsModel/CardEvent";
import { getEvents } from "../../../../Redux/actions/actionEvent";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

import ModalEvent from "../../../Modals/ModalEvent";
import '../css/notification.css'
import ProfilBody from "./profilBody";

const Publication = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setloading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setIsAuthenticated(true);
      setRole(decoded.role);
    }
    setTimeout(() => {
      setloading(false)
    },500);
  }, [localStorage.getItem("token")]);
    return (
        <div className="container-notification ">
        {props.events.map((event) => (
              <CardEvent key={event._id} event={event} />
            ))}
                  
                
            </div>
       
    )
}


const mapStateToProps = (state) => ({
  events: state.events.events,
});
export default connect(mapStateToProps, { getEvents }) (Publication)