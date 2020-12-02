import React, { useEffect, useState } from "react";

import axios from "axios";
import '../css/notification.css'
import PublicationCard from "../../../Publication/publicationCard";


const Pub = (props) => {
  const [pub, setPub] = useState([]);
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // const decoded = jwt_decode(token);
    // setUserID(decoded.id);
    // setUserName(decoded.userName);
    // setUserPassword(decoded.password);
    // setUserRole(decoded.role);
    // setUserEmail(decoded.email);
    // setUserPicture(decoded.profilePicture);
    // setUpdatedUser({
    //   phone: decoded.phone,
    //   adress: decoded.adress,
    //   password: decoded.password,
    // });

    axios
    .get("http://localhost:5000/api/getpub")
    .then((res) => {
      console.log(res);
     setPub(res.data)
    })
    .catch((err) => {
      console.log(err.response);
    });
  
  
  }, []);
 console.log('kkk',pub)

    return (
        <div className="container-notification ">
        {pub.map((pub) => (
              <PublicationCard key={pub._id} pub={pub} />
            ))}
                  
                
            </div>
       
    )
}



export default Pub