import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getEvents } from "../../Redux/actions/actionEvent";
import { getUsers } from "../../Redux/actions/actionUser";
import "./listParticipant.css"
import GoToHome from "../BackToHome.js/GoToHome";
import Pdf from "react-to-pdf";
const ListParticipants = (props) => {
  const idEvent = props.match.params.Myid;
  useEffect(() => {
    props.getEvents(idEvent);
    props.getUsers();
    // window.location.reload(false)
   
  }, []);
  console.log('participant table',props.event)
 
 
//   const tab = props.participant.map((participant) =>
//     props.users.filter((user) => user._id === participant.participant)
//   );
  
//  for (let i = 0 ; i<tab.length; i++) {
  
//    for (let j = 0 ; j<props.participant.length; j++){

//     if ( tab[i][0]._id === props.participant[j].participant ){
    
//      tab[i][0].nombredeplace =  props.participant[j].NombrePlace
     
//     }
//    }
  
//  }
  
const options = {
  orientation: 'landscape',
  unit: 'in',
  format: [700,900]
};
const ref = React.createRef();
  return (
    <div className="container" style={{paddingBottom:'5%',display:"flex", flexDirection:'column', alignItems:'center'}} >
      <GoToHome/>
      {/* <div
        className="custom-shadow card border-0 my-5  card-participant"
        style={{ opacity: "0.8" }}
      >
        <span className="list-participant-title">List Participant</span>
        {props.event.map((a) =>
        
          a.participant.map((user) => (
            console.log('user',user),
            <div className="list-Participant">
              <div className="participant-info"> <span className="span-info">Name : </span> {user.participant.userName}</div>
              <div className="participant-info"><span className="span-info">Email : </span>{user.participant.email}</div>
              <div className="participant-info"><span className="span-info">Phone : </span>{user.participant.phone}</div>
              <div className="participant-info"><span className="span-info">Nombre de places réservé : </span>{user.NombrePlace}</div>
            </div>
          ))
        )}
      </div> */}
      <Pdf targetRef={ref} filename="participant-list.pdf"  options={options} >
        {({ toPdf }) => <button className="pdf-btn" onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
      <div ref={ref}>
      <h2 className="list-participant-title">List Participant</h2>
      <div className="container-partcipant-event">
        <div className='title-table-participant'>
        <span className="span-info">Name</span>
        </div>
        <div className='title-table-participant' style={{width:"450px"}}>
        <span className="span-info">Email</span>
        </div>
        <div className='title-table-participant'>
        <span className="span-info">Phone</span>
        </div>
        <div className='title-table-participant'>
        <span className="span-info">Reserved places</span>
          </div>
      </div>
      {props.event.map((a) =>
        
        a.participant.map((user) => (
      <div className="container-partcipant-event" style={{marginTop:'3%'}}>
        <div className='title-table-participant'>
        <span className="span-info-partc">{user.participant.userName}</span>
        </div>
        <div className='title-table-participant' style={{width:"450px"}}>
        <span className="span-info-partc">{user.participant.email} </span>
        </div>
        <div className='title-table-participant'>
        <span className="span-info-partc">{user.participant.phone}</span>
        </div>
        <div className='title-table-participant'>
        <span className="span-info-partc">{user.NombrePlace}</span>
          </div>
      </div>
          ))
          )}
      </div>
  

      </div>
      
    
  
    
  );
};
const mapStateToProps = (state) => ({
  event: state.events.events,
  users: state.users.users,
});
export default connect(mapStateToProps, { getEvents, getUsers })(
  ListParticipants
);
