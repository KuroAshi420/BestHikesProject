import React, { useEffect, useState } from "react";
import CardMateril from "../../../materiels/materielCard";
import { getmateriels } from "../../../../Redux/actions/actionMateriel";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import SearchMateriel from '../../../Search/serachMatriel'
import '../css/notification.css'

const Materiel = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setloading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setIsAuthenticated(true);
      setRole(decoded.role);
      props.getmateriels()
    }
    setTimeout(() => {
      setloading(false)
    },500);
  }, [localStorage.getItem("token")]);
    return (
        <div className="container-notification ">
        {/* {props.materiels.map((materiel) => (
              <CardMateril key={materiel._id} materiel={materiel} />
            ))} */}
                  
                <SearchMateriel/>
            </div>
       
    )
}


const mapStateToProps = (state) => ({
  materiels: state.materiels.materiels,
});
export default connect(mapStateToProps, { getmateriels }) (Materiel)