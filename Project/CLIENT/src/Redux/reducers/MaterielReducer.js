import {
    GET_MATERIERLS,
    GET_MATERIERL,
    
  } from "../actions/actionTypes";
  
  const initState = {
    materiels: [],
    
  };
  
  const MaterielReducer = (state = initState, action) => {
    switch (action.type) {
      case GET_MATERIERLS:
        return { ...state, materiels: action.payload };
      case GET_MATERIERL:
        return { ...state, materiels: action.payload };
     
      default:
        return state;
    }
  };
  export default MaterielReducer;
  