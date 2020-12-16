import React, { useEffect, useState } from "react";
import "../css/profilBody.css";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import CakeIcon from "@material-ui/icons/Cake";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import Publication from "./publication";
import Tripies from "./Tripies";
import { connect } from "react-redux";

import jwt_decode from "jwt-decode";
import { updateUser, getUser } from "../../../../Redux/actions/actionUser";
import { Input } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
const ProfilBody = (props) => {
  const classes = useStyles();

  const [isEditable, setIsEditable] = useState(false);
  const [userID, setUserID] = useState();
  const [userName, setUserName] = useState();
  const [userPassword, setUserPassword] = useState();
  const [userRole, setUserRole] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPicture, setUserPicture] = useState();
  const [userPhone, setUserPhone] = useState();
  const [userAdress, setUserAdress] = useState();
  const [updatedUser, setUpdatedUser] = useState({
    phone: userPhone,
    adress: userAdress,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setUserID(decoded.id);
    setUserName(decoded.userName);
    setUserPassword(decoded.password);
    setUserRole(decoded.role);
    setUserEmail(decoded.email);
    setUserPicture(decoded.profilePicture);
    // setUpdatedUser({
    //   phone: decoded.phone,
    //   adress: decoded.adress,
    //   password: decoded.password,
    // });
    props.getUser(decoded.id)
  }, []);
  console.log("userphone", userPhone)
  console.log("userInfo", props.userprofil)
  return (
    <div style={{display:'flex', flexDirection:'column', width:"30%", position:'relative'}}>
      <div style={{height:"300px"}}>
        <img src="https://i.imgur.com/EASc9Xa.png" style={{height: "300px",
    position: "absolute",
    top: "-167px",
    left: '-28px'}}/>
      </div>
 <div className="profilBody">
      <div className="col-12">
        <div className="profil-info">
          <div className="profil-info-title">User Information</div>

          <div className="profil-info-descreption">
            <ul className="profil-info-list">
              <li className="profil-info-cordonne">
                <HomeIcon style={{ fontSize: 40 , color: "#fff"}} />{" "}
                {isEditable ? (
                  <Input
                    type="text"
                    value={userAdress}
                    onChange={(event) => {
                      setUserAdress(event.target.value);
                    }}
                  />
                ) : (
                  <span className="icon-descprection" style={{marginLeft:'10px'}}>{props.userprofil.adress}</span>
                )}
              </li>
              <li className="profil-info-cordonne">
                <WorkIcon style={{ fontSize: 40 , color: "#fff"}}  />
                <span className="icon-descprection" style={{marginLeft:'10px'}}>{userEmail}</span>
              </li>
              <li className="profil-info-cordonne">
                <CakeIcon style={{ fontSize: 40 , color: "#fff" }} />{" "}
                <span className="icon-descprection" style={{marginLeft:'10px'}}>28/09/1994</span>
              </li>
              <li className="profil-info-cordonne">
                <PhoneIphoneIcon style={{ fontSize: 40 ,  color: "#fff"}}  />

                {isEditable ? (
                  <Input
                    type="tel"
                    value={userPhone}
                    onChange={(event) => {
                      setUserPhone(event.target.value);
                    }}
                  />
                ) : (
                  <span className="icon-descprection" style={{marginLeft:'10px'}}>{props.userprofil.phone}</span>
                )}
              </li>
              {/* <li className="profil-info-cordonne">
                <FacebookIcon style={{ fontSize: 40 ,  color: "#fff" }}  />
                <span className="icon-descprection" style={{marginLeft:'10px'}}>
                  Lien de profil Facebook
                </span>
              </li> */}
              {/* <li className="profil-info-cordonne">
                <InstagramIcon style={{ fontSize: 40 ,  color: "#fff" }}  />{" "}
                <span className="icon-descprection" style={{marginLeft:'10px'}}>Lien Instagram </span>
              </li> */}
              {/* <li className="profil-info-cordonne">
              <h6 style={{ color: "#fff"}}>Password</h6>
             
                {isEditable ? (
                  <Input
                    type="password"
                    value={userPassword}
                    onChange={(event) => {
                      setUserPassword(event.target.value);
                      setUpdatedUser({
                        ...updatedUser,
                        password: event.target.value,
                      });
                    }}
                  />
                ) : (
                  <span className="icon-descprection" style={{marginLeft:'10px'}}>PAssword</span>
                )}
           
              </li> */}
            </ul>
            <center>
              {isEditable && (
                <div>
                  <Button
                    variant="contained"
                    size={isEditable ? "medium" : "small"}
                    className={classes.button}
                    startIcon={<CancelIcon />}
                    onClick={() => {
                      setIsEditable(!isEditable);
                    }}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={() => {
                      props.updateUser(userID, {phone:userPhone,adress:userAdress});
                      setIsEditable(!isEditable);
                    }}
                  >
                    save
                  </Button>
                </div>
              )}
              {!isEditable && (
                <Button
                  variant="contained"
                  style={{backgroundColor:"#66C6BF",color:"white"}}
                  size="medium"
                  className={classes.button}
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setIsEditable(!isEditable);
                  }}
                >
                  edit
                </Button>
              )}
            </center>
          </div>
        </div>
      
      </div>

      {/* <div className="profil-publications col-8">
              
            </div> */}
    </div>
    </div>
   
  );
};
const mapStateToProps = (state) => ({
  userprofil: state.user.user,
});
export default connect(mapStateToProps, { updateUser, getUser })(ProfilBody);
