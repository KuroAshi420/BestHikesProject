import {
  GET_MATERIERLS,
  GET_MATERIERL,
  GET_MATERIERLMARQUE,
  GET_MATERIERLTYPE,
  GET_MATERIERLLIEUX,
} from "../actions/actionTypes";

const initState = {
  materiels: [],
  marque: [],
  type: [],
  lieux: [],
};

const MaterielReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_MATERIERLS:
      return { ...state, materiels: action.payload };
    case GET_MATERIERL:
      return { ...state, materiels: action.payload };
    case GET_MATERIERLTYPE:
      return { ...state, type: action.payload };
    case GET_MATERIERLMARQUE:
      return { ...state, marque: action.payload };
    case GET_MATERIERLLIEUX:
      return { ...state, lieux: action.payload };
    default:
      return state;
  }
};
export default MaterielReducer;
