import {
    GET_PUBLICATIONS,
    GET_PUBLICATION,
    
  } from "../actions/actionTypes";
  
  const initState = {
    publications: [],
    
  };
  
  const PublicationReducer = (state = initState, action) => {
    switch (action.type) {
      case GET_PUBLICATIONS:
        return { ...state, publications: action.payload };
      case GET_PUBLICATION:
        return { ...state, publications: action.payload };
     
      default:
        return state;
    }
  };
  export default PublicationReducer;
  