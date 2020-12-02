import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
// import axios from 'axios';
import "../Acceuil/cardEvent.css"
import ModalEvent from "../Modals/ModalEvent";
import { deleteEvent,bookEvent, updateLikes  } from "../../Redux/actions/actionEvent";
// import Button from "@material-ui/core/Button"
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SendIcon from '@material-ui/icons/Send';
import io from "socket.io-client";
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import CommentsList from './commentsList'
import SimpleModal from "./commentsModal"
import { Confirm } from "semantic-ui-react"
import Heart from "react-animated-heart";
const socket = io.connect('http://localhost:4000')
const CardEvent = (props) => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [contentComment, setComment] = useState("")
  const [userID ,setUserID] = useState("");
  const [publication, setPublication] = useState(props.event);
  
  const [open, setopen] = useState(false);
  const handleOpen = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };
    const handleChange = (e) => {
        setComment(e.target.value)
    }
    const onSubmit = (e) => {

      e.preventDefault()
      const comment = {
        "writer": userID,
          "content": contentComment,
          
      }
    publication.comment.push(comment)
    const post = publication
      socket.emit('post', post)
      
      setComment("")
  }

  
console.log("publication",publication)

  useEffect(() => {

    socket.on('post', (post) => {
      if(post._id === publication._id)
      setPublication(post)
  })

    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setIsAuthenticated(true);
      setRole(decoded.role);
      setUserName(decoded.userName);
      setUserID(decoded.id)
      console.log("decoded",decoded)
    }
  }, [localStorage.getItem("token")]);
  

  const [isClick, setClick] = useState(false);
    return (
     
        
           <div className="ui card" style={{width:'400px'}}>
        <div className="content" style={{backgroundColor:"#76B38F", color:"#fff"}}>
          <div className="right floated meta">
            <AddShoppingCartIcon onClick={() => {
                    if (isAuthenticated && role === "participant") {
                      handleOpen();
                    }
                    if (role === "organisator") {
                      alert(
                        "You can't book this event! your are an organisator and must be a participant"
                      );
                    }
                    if (!isAuthenticated) {
                      alert("Please login");
                      history.push('/login')
                    }
                  }} 
            style={{ color: "red",cursor: "pointer", fontSize: '35px'}}/>
            <Confirm
                content="Are you sure ? This operation is ireverrsible !!!"
                  style={{height: "20%",
                    position: "absolute",
                    top: "40%",
                    left:"25%"}}
                  open={open}
                  onCancel={()=>handleClose()}
                  onConfirm={() => {
                    props.bookEvent(userID, props.event._id);
                    handleClose();
                    history.push(`/cart/${userID}`);
                    
                  }}/>
            </div>
          <img className="ui avatar image" src={props.event.cover} style={{float:'left',width:"35px",height:"35px"}} /> <p className="titleeventCard">{props.event.title} </p>
         
        </div>
        <div className="content" style={{display:'flex',flexDirection:"column"}}>
        {/* <button className="btn-card-event" 
          onClick={() => history.push(`/events/${props.event._id}`)}>
                 show details
                </button> */}
                 <div className="col-md-12">
            <p style={{fontSize:"3vh"}}>{props.event.desc}</p>
            <ul style={{listStyle:"none",padding: '0',float: 'left',textAlign: 'justify'}}>
              <li style={{fontSize:"3vh"}}> <span style={{color:"#009688"}}  >Organisator :</span>  {props.event.organisator}</li>
              <li style={{fontSize:"3vh"}}>
              <span style={{color:"#009688"}}> From</span>  {props.event.depart} <span style={{color:"#009688"}}> To</span>{" "}
                {props.event.destination}{" "}
              </li>
              <li style={{fontSize:"3vh"}}><span style={{ color:'#009688'}}>Date :</span> {props.event.date}</li>
              <li style={{fontSize:"3vh"}}><span style={{color:"#009688"}}>Disponible Places :</span> {props.event.places}</li>
              <li style={{fontSize:"3vh"}}><span style={{color:"#009688"}}>Price : </span>{props.event.price}</li>
            </ul>
            </div>
         
                {((isAuthenticated && role === "admin") ||
           (isAuthenticated &&
          role === "organisator" &&
               props.event.organisator === userName)) && (
            <div
             style={{ display: "flex", justifyContent: "space-around" }}
           >
            <ModalEvent event={props.event} />
               <Fab
                 size="small"
                 aria-label="delete"
                 onClick={() => props.deleteEvent(props.event._id)}
             >
               <DeleteIcon />
             </Fab>
         </div>
         )}
        </div>
        <div className="image">
          <img src={props.event.cover}/>
        </div>
        <div className="content">
          <span className="right floated">
            <i className="heart outline like icon" />
            {props.event.like}
          </span>
          <div style={{display:"flex",flexDirection:"row"}}>
          <i className="comment icon" />
          <SimpleModal publication={publication} />
          </div>
        </div>
        <div className="extra content">
          <div className="ui large transparent left icon input">
           
            <input type="text" placeholder="Add Comment..." onChange={handleChange}
               value={contentComment}/>
            <SendIcon style={{fontSize:'23px', color:'#2196F3',cursor: "pointer"}} onClick={onSubmit}/> 
            {/* <Button ><i className="send outline icon" /></Button> */}
          </div>
        </div>
      </div>
   
    )
              }
export default connect(null, { deleteEvent, bookEvent, updateLikes  })(CardEvent);
