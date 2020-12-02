// import { GET_PARTICIPANTS, GET_PARTICIPANTt } from "./actionTypes";
// import axios from "axios";

// export const getParticipants =  () => async (dispatch) => {
//   await axios
//     .get("http://localhost:5000/participantss/")
//     .then((res) => dispatch({ type: GET_PARTICIPANTS, payload: res.data }))
//     .catch((err) => console.log(err));
// };

// export const getParticipant =  (query) => async (dispatch) => {
//   await axios
//     .get(`http://localhost:5000/participantss/${query}`)
//     .then((res) => dispatch({ type: GET_PARTICIPANTt, payload: res.data }))
//     .catch((err) => console.log(err));
// };

// export const addParticipantsss = (userID,eventID) => (dispatch) => {
//   axios
//     .post(`http://localhost:5000/participantss/add/${userID}/${eventID}`,)
//     .then((res) => dispatch(getParticipant()))
//     .catch((err) => console.log(err));
// };

