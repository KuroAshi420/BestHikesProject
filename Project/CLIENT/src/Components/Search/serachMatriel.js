import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  filterMateriel,
  getMaterielLieux,
  getMaterielMarque,
  getMaterielType,
} from "../../Redux/actions/actionMateriel";

import CardMateril from "../materiels/materielCard";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SearchMateriel = (props) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    props.getMaterielLieux();
    props.getMaterielMarque();
    props.getMaterielType();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.filterMateriel(searchValue);
  };

  return (
    <center style={{width:"100%"}}>
      <div className="container">
        <div className="card border-0 shadow my-5"
        style={{ backgroundColor: "#ffffffa1" }}>
          <div className="card-body p-5">
            <form onSubmit={handleSubmit}>
              

              

              <FormControl className={classes.formControl} color="secondary">
                <InputLabel style={{color:"black"}}>Search materiels ...</InputLabel>
                <Input
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                >
                </Input>
                <FormHelperText style={{fontSize:"16px"}}>Search by type/marque/lieux</FormHelperText>
              </FormControl>

             
              <center>
                <Input type="submit" value="Search" color="secondary" style={{color:"#5DB0D0"}}/>
              </center>
            </form>
          </div>
        </div>
      </div>
      {/* <h4 style={{ color: "white",fontSize:"40px", fontWeight:"bold" }}>Resultat of Search</h4> */}
      <h2 class="ui icon header" style={{color:'#66C6BF'}}>   <i aria-hidden="true" class="search icon" ></i>   Search Result   </h2>
      <div className="container">
        <div className="card border-0 shadow my-5"
        style={{ backgroundColor: "#ffffffa1" }}>
          <div className="card-body p-5">
            <div className="row" style={{ justifyContent: "space-around" }}>
              {props.materiel.map((materiel) => (
                <CardMateril key={materiel._id} materiel={materiel} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </center>
  );
};
const mapStateToProps = (state) => ({
  materiel: state.materiels.materiels,
  type: state.type.type,
  marque: state.marque.marque,
  lieux: state.lieux.lieux,
});

export default connect(mapStateToProps, {
  filterMateriel,
  getMaterielType,
  getMaterielMarque,
  getMaterielLieux,
})(SearchMateriel);

