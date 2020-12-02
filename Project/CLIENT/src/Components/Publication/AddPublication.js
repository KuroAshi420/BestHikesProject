
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
function AddPub() {
  const [userID, setUserID] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);

      setUserID(decoded.id);
      console.log("decoded", decoded);
    }
  }, [localStorage.getItem("token")]);
  /** start states */
  const [formData, setFormData] = useState("");
  const [info, setInfo] = useState({
    image: "",
    name: "",
    user: "",
    content : ""
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
    data.append("content",content);
    data.append("user",userID)
    setFormData(data);
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo({
      image: "",
      name: "",
      content
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
      .post("http://localhost:5000/api/category", formData, options)
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
  const handleChange = (e) => {
    setContent(e.target.value)
}
  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="d-flex justify-content-center align-items-center flex-column"
    >
      {error.found && (
        <div
          className="alert alert-danger"
          role="alert"
          style={{ width: "359px" }}
        >
          {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ width: "359px" }}>
        <textarea
          className="textarea-pub"
          rows="4"
          cols="50"
          name="content"
          form="pubform"
          onChange={handleChange}
        >
          Comment?
        </textarea>
        <div className="progress mb-3 w-100">
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
        <div className="custom-file mb-3">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile04"
            aria-describedby="inputGroupFileAddon04"
            onChange={upload}
          />
          <label className="custom-file-label" htmlFor="inputGroupFile04">
            Choose file
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
      <img
        className="mt-3"
        src={`http://localhost:5000/${info.image}`}
        alt={`${info.name}`}
        style={{ width: "359px" }}
      />
    </div>
  );
}

export default AddPub;
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFileImage, faUpload } from '@fortawesome/free-solid-svg-icons'
// // import PublicationSrv from '../../../services/publication';
// // import "./AddPublication.css"
// import { connect } from "react-redux";
// import { addPublication, uploadPublication } from "../../Redux/actions/actionPublication";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// class AddPublication extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             fields: {
//                 content: '12354',
//                 user: '',
//                 photo: '',
//             },
//             selectedFile: null,
//         }
//     }

//     onChangeHandler = event => {
//         this.setState({
//             selectedFile: event.target.files[0],
//             loaded: 0,
//         })
//     }
//     //  addNewPub = () => {

//     //     const data = new FormData()
//     //     data.append('file', this.state.selectedFile)
//     //     this.props.uploadPublication(data)
//     //     let fields = this.state.fields;
//     //     fields["photo"] = data

//     //     this.setState({
//     //         fields
//     //     })
//     //     this.props.addPublication(
//     //         this.state.fields
//     //     );

//     //   };
//       componentDidMount() {

//             if (localStorage.getItem("token") !== null) {
//               const token = localStorage.getItem("token");
//               const decoded = jwt_decode(token);
//               this.setState({
//                 fields: {
//                     user: decoded._id,
//                 },
//               })

//       }}
//     onClickHandler = () => {
//         const data = new FormData()
//         data.append('file', this.state.selectedFile)
//         //data.append('pub', JSON.stringify(this.state.fields))
//          axios
//         .post("http://localhost:5000/publication/upload",data)
//             .then((res) => {
//                 // let fields = this.state.fields;
//                 // fields["photo"] = res.data
//                 // fields["user"] = this.state.fields.user
//                 this.setState({
//                     fields :{
//                         content : "aaa",
//                         user : "123",
//                         photo : res.data,

//                     }
//                 })
//                 console.log('ddddddddddd',this.state.fields)
//                 .post("http://localhost:5000/publication/add",this.state.fields)
//                     .then((res) => {
//                     })

//             })
//           }

//     render() {
//         return (
//             <div>
//                 <main className="home">
//                     <section id="section-content">
//                         <div className="container">
//                             <div className="content-pub">
//                                 <div className="wrapper-pub">
//                                     <div className="row">
//                                         <div className="col-12">
//                                             <div className="div-title">
//                                                 <span>
//                                                     Add Publication
//                                                 </span>
//                                             </div>
//                                             <div className="div-ajout-pub">
//                                                 <textarea className="textarea-pub" rows="4" cols="50" name="content" form="pubform" onChange={this.handleInput}>
//                                                     Comment?
//                                                 </textarea>
//                                                 <form className="form-pub">
//                                                     <label className="custom-file-upload">
//                                                         <span className="social-icon"><FontAwesomeIcon icon={faUpload} color="#28dbb8f7" /></span>

//                                                         <input type="file" name="file" onChange={this.onChangeHandler} />
//                                                             Photo/Vidéo
//                                                     </label>
//                                                     <label className="submit-file">
//                                                         <button type="button" class="btn btn-success btn-block" style={{ backgroundColor: "transparent", border: "#63e4cbf7 1.5px solid", color: "#63e4cbf7", fontSize: "17px", fontWeight: "bold" }}
//                                                             onClick={this.onClickHandler}>Upload</button>
//                                                         {/*<input type="submit" onClick={this.handleSubmit} value="Publier" />*/}
//                                                     </label>
//                                                 </form>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <img src ={Window.location + "/public/1600001561491-2f6c1bb72684bf16ee8d1c8a5c36bf20.jpg"}/>
//                     </section>
//                 </main>
//             </div>
//         );
//     }
// }
// export default  AddPublication