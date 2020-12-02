import { GET_MATERIERLS, GET_MATERIERL } from "./actionTypes";
import axios from "axios";

export const getmateriels =  () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/materiel/getmateriel")
    .then((res) => dispatch({ type: GET_MATERIERLS, payload: res.data }))
    .catch((err) => console.log(err));
};

export const getmateriel =  (id) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/materiel/${id}`)
    .then((res) => dispatch({ type: GET_MATERIERL, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addMateriel = (newMateriel,options) => (dispatch) => {
  axios
    .post("http://localhost:5000/materiel/add_materiel", newMateriel , options)
    .then((res) => dispatch(getmateriels()))
    .catch((err) => console.log(err));
};

export const deleteMateriel = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:5000/materiel/delete/${id}`)
    .then((res) => dispatch(getmateriels()))
    .catch((err) => console.log(err));
};

export const updateDispo = (id, dispo) => (dispatch) => {
  axios
    .put(`http://localhost:5000/materiel/updateDispo/${id}/${dispo}`,)
    .then((res) => dispatch(getmateriels()))
    .catch((err) => console.log(err));
};


