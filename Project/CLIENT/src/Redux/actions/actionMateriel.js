import { GET_MATERIERLS, GET_MATERIERL, GET_MATERIERLTYPE, GET_MATERIERLMARQUE, GET_MATERIERLLIEUX } from "./actionTypes";
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


export const getMaterielType =  () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/materiel/getType")
    .then((res) => dispatch({ type: GET_MATERIERLTYPE, payload: res.data }))
    .catch((err) => console.log(err));
};

export const getMaterielMarque =  () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/materiel/getMarque")
    .then((res) => dispatch({ type: GET_MATERIERLMARQUE, payload: res.data }))
    .catch((err) => console.log(err));
};

export const getMaterielLieux =  () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/materiel/getLieux")
    .then((res) => dispatch({ type: GET_MATERIERLLIEUX, payload: res.data }))
    .catch((err) => console.log(err));
};

export const filterMateriel =  (index) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/materiel/findMateriel/${index}`)
    .then((res) => dispatch({ type: GET_MATERIERLS, payload: res.data }))
    .catch((err) => console.log(err));
};