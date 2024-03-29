import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode'
import { addMateriel } from "../../Redux/actions/actionMateriel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from '@material-ui/core/TextField';

import { connect } from "react-redux";
import "./AddMateriel.css"
function AddMateriell(props) {
    const [type, setType] = useState("");
    const [marque, setMarque] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [lieux, setLieux] = useState("");
    const [descreption, setDescreption] = useState("");
  
    const [userID, setUserID] = useState("");
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
      user: userID,
      type : "",
      marque :"",
      price :"" ,
      quantity : "",
      lieux : "", 
      descreption :"",
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
      data.append("type",type);
      data.append("marque",marque);
      data.append("price",price);
      data.append("quantity",quantity);
      data.append("lieux",lieux);
      data.append("descreption",descreption);
      data.append("user",userID);
        
      setFormData(data);
    };
  
    // Submit Form
    const handleSubmit = (e) => {
      e.preventDefault();
      setInfo({
        image: "",
        name: "",
        type,
        price,
        marque,
        quantity,
        lieux,
        descreption,
        
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
        .post("http://localhost:5000/materiel/add_materiel", formData, options)
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

    <div className="container-fluid" style={{display:'flex',}}>
<div className="add-mat-backg">

</div>
<div className="add-materiel">
           <form onSubmit={handleSubmit} style={{   display: "flex",
    width: "40%",
    height: "100%",
    flexDirection: "column",
    justifyContent:"space-between" }}>
        <h2 className="add-materiel-title">ADD Materiel</h2>
       
        <div className="input-form-container">
        <TextField id="standard-basic" label="add type ..."
          className="input-materiel"
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        
        </div>
        
        <div className="input-form-container">
        <TextField
          className="input-materiel"
          label="add marque..."
          value={marque}
          onChange={(e) => setMarque(e.target.value)}
        />
</div>
        
      <div className="input-form-container">
        <TextField
          className="input-materiel"
          label="add price..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
</div>
   
      <div className="input-form-container">
        <TextField
          className="input-materiel"
          label="add quantity..."
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
</div>
        
       <div className="input-form-container">
        <TextField
          className="input-materiel"
          label="add location..."
          value={lieux}
          onChange={(e) => setLieux(e.target.value)}
        />
</div>
       
        <div className="input-form-container">
        <TextField
          className="input-materiel"
          label="add descreption..."
          value={descreption}
          onChange={(e) => setDescreption(e.target.value)}
        />
</div>
       
     
        <label className="add-materiel-labes">Add Picture</label>
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
      
        </div>
        <div className="add-mat-backg">

</div>
    </div>
        
    )
}

export default connect(null, { addMateriel }) (AddMateriell)
