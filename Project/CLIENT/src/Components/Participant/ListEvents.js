import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

import CardEvent from "../CardsModel/CardEvent";
import { filterEvents, getEvents } from "../../Redux/actions/actionEvent";
import MyEvent from "./MyEvent";

import { Button, Segment } from "semantic-ui-react";

const ListMyEvents = (props) => {
  const [organisatorName, setorganisatorName] = useState("");
  const [filtredEvent, setFiltredEvent] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setorganisatorName(decoded.userName);
      setFiltredEvent(props.filterEvents(decoded.useState));
    }
  }, []);
  console.log(organisatorName);
  const handleSubmit = (event) => {
    event.preventDefault();
    props.filterEvents(organisatorName);
  };
  return (
    <div style={{minHeight:'100vh',     backgroundImage:"url(https://i.imgur.com/k8VfgjW.jpg)",
    backgroundSize:"cover",
    backgroundPosition:'center',
    backgroundRepeat:"",
    display:'flex',
    alignItems:'center'}}>
<div className="container">
      <div className="card border-0 shadow my-5" style={{padding:"2%", margin:'0 !important'}}>
        <div className="row">
          <center className="col-sm-12 col-md-12 col-md-offset-1">
            <Button inverted style={{backgroundColor:"#5DB0D0"}} onClick={(e)=>handleSubmit(e)}>
              Get My Events
            </Button>
            <center >
              <div>
                <ul style={{display:"flex",justifyContent:"space-around",marginTop:"3%"}}>
                  <h4>Event title</h4>
                  <h4>Date</h4>
                  <h4>action</h4>
                </ul>
              </div>
              <hr/>
              <div>
                {props.events.map((event) => (
                  <div>
                    <MyEvent eventss={event} />
                    {console.log(event)}
                  </div>
                ))}
              </div>
            </center>
          </center>
        </div>
      </div>
    </div>
    </div>
    
  );
};
const mapStateToProps = (state) => ({
  events: state.events.events,
});

export default connect(mapStateToProps, { filterEvents, getEvents })(
  ListMyEvents
);
