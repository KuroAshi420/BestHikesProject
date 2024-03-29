import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updatePlaces, updateEvent,updatePlacesParticipants } from "../../Redux/actions/actionEvent";
import jwt_decode from "jwt-decode";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const CardShopping = (props) => {
  const classes = useStyles();

  const [reserved, setReserved] = useState(0);
  const [disponible, setDisponible] = useState(Number(props.event.places));
  const [userID, setUserID] = useState("vide");
  const[showPaypal, setShowPaypal] = useState(false)
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setUserID(decoded.id);
    }
  }, []);

  const filterEvent = (userID) => {
    console.log("ID: "+userID)
    const x = props.events.map((event) => event.participant.filter(e=>e._id!==userID)) 
    // .participant.filter((participant) => participant._id !== userID);
    console.log("inside filter event: " +x);
  };

  const priceTopay = props.event.price * reserved
  const eventTitle = props.event.title
  async function handleToken(token, addresses) {
    const response = await axios.post(
      "http://localhost:5000/checkout",
      { token, priceTopay ,eventTitle }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }
  return (
    <tr>
      <td className="col-sm-5 col-md-6">
        <div className="media">
          <a className="thumbnail pull-left">
            {" "}
            <img
              className="media-object"
              src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png"
              style={{ width: "72px", height: "72px" }}
            />{" "}
          </a>
          <div className="media-body">
            <h4 className="media-heading" style={{textTransform: "uppercase",color:"red",paddingLeft:"1%"}}>
              <span>{props.event.title}</span>
            </h4>
            <h6 className="media-heading" style={{color:"green",paddingLeft:"1%"}}>
              {" "}
              by: <span>{props.event.organisator}</span>
            </h6>
          </div>
        </div>
      </td>
      <td className="col-sm-1 col-md-1 text-center">
        <strong>{props.event.date}</strong>
      </td>
      <td className="col-sm-1 col-md-1 text-center">
        <strong>{props.event.places - reserved}</strong>
      </td>
      <td
        className="col-sm-1 col-md-1"
        style={{ display: "flex", alignItems: "center", textAlign: "center" }}
      >
        <button
          style={{ borderRadius: "50%" }}
          onClick={() => {
            if (reserved > 0) {
              setDisponible(disponible + 1);
              setReserved(reserved - 1);
            }
          }}
        >
          -
        </button>
        <label>{reserved}</label>
        <button
          style={{ borderRadius: "50%" }}
          onClick={() => {
            if (reserved < props.event.places) {
              setDisponible(disponible - 1);
              setReserved(reserved + 1);
            }
          }}
        >
          +
        </button>
      </td>
      <td className="col-sm-1 col-md-1 text-center">
        <strong>{props.event.price}</strong>
      </td>
      <td className="col-sm-1 col-md-1 text-center">
        <strong>{props.event.price * reserved}</strong>
      </td>
      <td className="col-sm-1 col-md-1">
        {/* <Button
          variant="contained"
          color="secondary"
          size="small"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={() => {
            filterEvent(userID);
            updateEvent(props.event._id);
          }}
        >
          Delete
        </Button> */}
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={() => {
            props.updatePlaces(props.event._id, disponible);
            props.updatePlacesParticipants(props.event._id,userID,reserved)
          }}
        >
          Save
        </Button>
       <StripeCheckout 
        stripeKey="pk_test_51HpGOPLS3K6Zu9OJvFIKPabaAG8xng1CoIIzfeiUdCs0aEhV0K3TbAnkwuaY71J5EnWq5pj3ajtiw8zBZMEOtuwY00ofhLTh9G"
        token={handleToken}
        amount={props.event.price * reserved}
        billingAddress
        shippingAddress
        />
      </td>
    </tr>
  );
};
const mapStateToProps = (state) => ({
  events: state.events.events,
});
export default connect(mapStateToProps, { updatePlaces, updateEvent , updatePlacesParticipants})(
  CardShopping
);
