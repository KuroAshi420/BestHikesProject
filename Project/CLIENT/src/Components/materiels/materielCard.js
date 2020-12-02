import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import LockOpen from "@material-ui/icons/LockOpen";
// import Visibility from "@material-ui/icons/Visibility";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./materielCard.css";
import jwt_decode from "jwt-decode";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from "react-redux";
import { deleteMateriel,updateDispo } from "../../Redux/actions/actionMateriel";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#F50057",
  },
}));

 function CardMateril(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [userID, setUserID] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [togle, setTogle] = useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setTogle({ ...togle, [event.target.name]: event.target.checked });
    props.updateDispo(props.materiel._id, togle.checkedA)
  };
console.log('togle', togle.checkedA)
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setUserID(decoded.id);
      setIsAuthenticated(true);
      setRole(decoded.role);
    }
  }, []);
  return (
    <div className="card-container">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <img
              className="avatar-card-materiel"
              src="https://image.flaticon.com/icons/svg/2971/2971985.svg"
            />
          }
          title={
            <h2 style={{ color: "#eee", fontSize: "35px" }}>
              {props.materiel.type}
            </h2>
          }
          style={{backgroundColor:'#76B38F'}}
        />

        <img src={`http://localhost:5000/${props.materiel.image}`} alt="img" style={{width:'100%'}}/>
        {console.log(props.materiel.imagePath)}
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon color={"error"} fontSize="large"  />
        </IconButton>
        <IconButton aria-label="Visibility">
          <Visibility  fontSize="large"/>
        </IconButton>
        <IconButton aria-label="Lock">
          <AddShoppingCartIcon color={"error"} fontSize="large" />
        </IconButton>
         */}
          {((isAuthenticated && role === "admin") ||
            (isAuthenticated && props.materiel.user === userID)) && (
            <div>
              <a style={{ cursor: "pointer" }}  onClick={() => props.deleteMateriel(props.materiel._id)}>
                <DeleteForeverIcon
                  style={{ fontSize: "40px", color: "#76B38F" }}
                />
              </a>
              <FormControlLabel
                control={
                  <Switch
                    checked={togle.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                    color="#76B38F"
                  />
                }
                label="disponible"
              />
            </div>
          )}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{ background: "#76B38F", color: "white" }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {" "}
              <h2 style={{ color: "rgb(0, 150, 136)" }}>Descreption</h2>
            </Typography>
            <Typography paragraph>
              <p style={{ fontSize: "17px" }}>{props.materiel.descreption}</p>
            </Typography>
            <Typography paragraph>
              <h3 style={{ color: "rgb(0, 150, 136)" }}>Marque</h3>{" "}
              <p style={{ fontSize: "17px" }}>{props.materiel.marque}</p>
              <h3 style={{ color: "rgb(0, 150, 136)" }}>Price</h3>{" "}
              <p style={{ fontSize: "17px" }}>{props.materiel.price}</p>
              <h3 style={{ color: "rgb(0, 150, 136)" }}>Quantity</h3>{" "}
              <p style={{ fontSize: "17px" }}>{props.materiel.quantity}</p>
              <h3 style={{ color: "rgb(0, 150, 136)" }}>Location</h3>{" "}
              <p style={{ fontSize: "17px" }}> {props.materiel.lieux}</p>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
export default connect(null, { deleteMateriel,updateDispo })(CardMateril);