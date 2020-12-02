import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import "../Acceuil/cardEvent.css"
import ModalEvent from "../Modals/ModalEvent";
import Button from "@material-ui/core/Button"
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import io from "socket.io-client";
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentsList from '../CardsModel/commentsList'
import SimpleModal from "../CardsModel/commentsModal"
import { updateUser, getUser } from "../../Redux/actions/actionUser";
import { deletePublication } from "../../Redux/actions/actionPublication";
import "./publicationCard.css"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const socket = io.connect('http://localhost:4000')
function PublicationCard(props) {

    const [contentComment, setComment] = useState("")
    const [userID ,setUserID] = useState("");
    const [userImage ,setUserImage] = useState("");
    const [publication, setPublication] = useState(props.pub);
    const [CommentLists, setCommentLists] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState("");

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
        socket.emit('postpub', post)
        
        setComment("")
    }
  
  
    useEffect(() => {
  
      socket.on('postpub', (post) => {
        if(post._id === publication._id)
        setPublication(post)
       
   
    })

    props.getUser(props.pub.user)
      if (localStorage.getItem("token") !== null) {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
     
        setUserImage(decoded.image)
        setUserID(decoded.id)
        setIsAuthenticated(true);
        setRole(decoded.role);
        console.log("decoded",decoded)
      }
    
    }, []);
   
    console.log('props.pub.user.id')
    console.log(props.pub.user)
    console.log("props.pub._id",props.pub._id)
  const deletePub = (e) => {
    e.preventDefault()
    props.deletePublication(props.pub._id)
  }
    return (
        <div className="publicationCard">
            <div className="publicationCard-user">
           <div style={{    width: "90%",display: "flex", alignItems: "center",justifyContent: "flex-start"}}>
           <img className="comment-user-image" src={`http://localhost:5000/${userImage}`}/>  
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
              <p style={{margin:"0", fontSize:"20px", fontWeight:"600"}}>{props.pub.user.userName}</p>
              <p style={{margin:"0"}}>12 september 2020</p>
              </div>
           </div>
           {((isAuthenticated && role === "admin") ||
           (isAuthenticated && props.pub.user._id === userID)) && (
                <a style={{cursor:"pointer"}} onClick={deletePub}>
                <DeleteForeverIcon style={{fontSize:"30px",color:"#8e8e8e"}}/>
              </a>
             
         )}
              
              
            </div>
            <div className="publicationCard-content">
    <p>{props.pub.content}</p>
            </div>
            <div className="publicationCard-img">
               <img className="mt-3"
        src={`http://localhost:5000/${props.pub.image}`}
        alt={`${props.pub.name}`}
        style={{ width: "359px" }}/>
            </div>

            <div className="pub-reactions">
            <div className="pub-likes">
            <FavoriteIcon color="secondary"/>
            <p>57 likes</p>
            </div>
            <SimpleModal publication={publication} />

</div>

  {/* <div className="pub-btn">
    {publication.comment.map( e => (
  <div key= {e._id}> {e} </div>  
    ))}</div>
 */}
<div className="pub-comment">
<CommentsList comments={publication.comment} allComments={false} />
                <div className="comment-user-image-container">
                   <img className="comment-user-image" src={`http://localhost:5000/${userImage}`}/>
                   <input className="comment-inpt" type="text" placeholder="add comment..." onChange={handleChange}
                    />
                    
                <Button style={{ width: '20%', height: '35px' }} onClick={onSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
  user: state.users.user,
});
export default connect(mapStateToProps, { updateUser, getUser,deletePublication })(PublicationCard);
