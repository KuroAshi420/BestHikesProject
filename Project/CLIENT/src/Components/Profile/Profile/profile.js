import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Entete from "./components/entete";
import NavBar from "./components/navbar";
import ProfilBody from "./components/profilBody";
import Photos from "./components/photos";
import Videos from "./components/Videos";
import Tripies from "./components/Tripies";
import Publication from "./components/publication";
import "./profilss.css"
import { updateUser, getUser } from "../../../Redux/actions/actionUser";
import PublicationCard from '../../Publication/publicationCard'
import axios from "axios";
const Profils = (props) => {
  const [pub, setPub] = useState([]);
  useEffect(() => {
    // if (localStorage.getItem("token") !== null) {
    //   const token = localStorage.getItem("token");
    //   const decoded = jwt_decode(token);

    //   setUserID(decoded.id);
    //   console.log("decoded", decoded);
    // }
    axios
      .get("http://localhost:5000/api/getpub")
      .then((res) => {
        console.log(res);
       setPub(res)
      })
      .catch((err) => {
        console.log(err.response);
      });

  }, []);
    return (
      <div className="profil">
        {/* {pub.map( (x) => {
        <PublicationCard key={x._id} pub={x}/> */}
        {/* })} */
        console.log('zzzzzzzz', pub)
        }
      </div>
    );
  }

  const mapStateToProps = (state) => ({
    user: state.user.user,
  });
  export default connect(mapStateToProps, { updateUser, getUser })(Profils);
