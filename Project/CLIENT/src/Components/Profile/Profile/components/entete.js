import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../css/entete.css";
import jwt_decode from "jwt-decode";
import { updateUser, getUser } from "../../../../Redux/actions/actionUser";
import axios from "axios";
const Entete = (props) => {
  // const [formData, setFormData] = useState("");
  const [userName, setUserName] = useState();
  const [userID, setUserId] = useState();
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setUserName(decoded.userName);
    setUserId(decoded.id)
    props.getUser(decoded.id)
  }, []);

  
  // const [progressPercent, setProgressPercent] = useState(0);
  // const [error, setError] = useState({
  //   found: false,
  //   message: "",
  // });
  // /** end states */

  // // Upload image
  // const upload = ({ target: { files } }) => {
  //   let data = new FormData();
  //   data.append("categoryImage", files[0]);
  //   data.append("name", files[0].name);
  //   data.append("user",userID)
  //   setFormData(data);
  // };

  // // Submit Form
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setInfo({
  //     image: "",
  //     name: "",
  //   });
  //   setProgressPercent(0);
  //   const options = {
  //     onUploadProgress: (progressEvent) => {
  //       const { loaded, total } = progressEvent;
  //       let percent = Math.floor((loaded * 100) / total);
  //       console.log(`${loaded}kb of ${total}kb | ${percent}%`);
  //       setProgressPercent(percent);
  //     },
  //   };
  //   axios
  //     .put(`http://localhost:5000/users/updateimage/${userID}`, formData, options)
  //     .then((res) => {
  //       console.log(res.data);
  //       setTimeout(() => {
  //         setInfo(res.data.category);
  //         setProgressPercent(0);
  //       }, 1000);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       setError({
  //         found: true,
  //         message: err.response.data.errors,
  //       });
  //       setTimeout(() => {
  //         setError({
  //           found: false,
  //           message: "",
  //         });
  //         setProgressPercent(0);
  //       }, 3000);
  //     });
  // };
  // console.log("decodedddddd",props.user)
  const [formData, setFormData] = useState("");
  const [info, setInfo] = useState({
    image: "",
    name: "",
  });
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState({
    found: false,
    message: "",
  });
  /** end states */

  // Upload image
  const upload = ({ target: { files } }) => {
    let data = new FormData();
    data.append("categoryImage", files[0]);
    data.append("name", files[0].name);
      
    setFormData(data);
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo({
      image: "",
      name: "",
    });
    setProgressPercent(0);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setProgressPercent(percent);
      },
    };
    axios
    .put(`http://localhost:5000/users/updateimage/${userID}`, formData, options)
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          setInfo(res.data.category);
          setProgressPercent(0);
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response);
        setError({
          found: true,
          message: err.response.data.errors,
        });
        setTimeout(() => {
          setError({
            found: false,
            message: "",
          });
          setProgressPercent(0);
        }, 3000);
      });
  };
  return (
    <div>
      <div className="profil">
        <div className="profil-cover">
          <img
            className="profil-cover-img"
            src="https://i.imgur.com/571SkHH.png"
          />
          
        </div>
        <div className="profil-picture">
          <img
            className="profil-pictuce-img"
            src={`http://localhost:5000/${props.user.image}`}
          />
<div className="middle">
<form onSubmit={handleSubmit}>
        <div className="progress mb-3 w-100"  style={{display:'none'}}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progressPercent}%` }}
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
           
          >
            {progressPercent}
          </div>
        </div>
        {/* <div>
          <input
            type="file"
            className="file-inputp"
            
           
          /> */}
          {/* <label className="custom-file-label" htmlFor="inputGroupFile04">
            Choose file
          </label> */}
          <div class="upload-btn-wrapperp">
  <button class="btnp">+</button>
  <input type="file" name="myfile"  aria-describedby="inputGroupFileAddon04"
            onChange={upload}id="inputGroupFile04"/>
</div>
        {/* </div> */}
        <button type="submit" className="btn-upl">
          ADD
        </button>
      </form>
</div>

        </div>
        <span className="profil-user-name">{userName}</span>
      
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps, { updateUser, getUser })(Entete);
