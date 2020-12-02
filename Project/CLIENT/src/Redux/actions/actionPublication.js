import { GET_PUBLICATIONS, GET_PUBLICATION } from "./actionTypes";
import axios from "axios";

export const getPublications =  () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/publication/")
    .then((res) => dispatch({ type: GET_PUBLICATIONS, payload: res.data }))
    .catch((err) => console.log(err));
};

export const getPublication =  (id) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/publication/${id}`)
    .then((res) => dispatch({ type: GET_PUBLICATION, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addPublication = (newPublication) => (dispatch) => {
  axios
    .post("http://localhost:5000/publication/add", newPublication)
    .then((res) => dispatch(getPublications()))
    .catch((err) => console.log(err));
};

export const uploadPublication =  () => async (dispatch) => {
    await axios
      .post("http://localhost:5000/publication/upload")
      .then((res) => dispatch())
      .catch((err) => console.log(err));
  };

  export const deletePublication = (id) => (dispatch) => {
    axios
      .delete(`http://localhost:5000/api/delete/${id}`)
      .then((res) => dispatch(getPublications()))
      .catch((err) => console.log(err));
  };