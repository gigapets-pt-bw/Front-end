import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE, 
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CREATECHILD_START,
  CREATECHILD_SUCCESS,
  CREATECHILD_FAILURE
} from "../actions";

const initialState = {
  user: {},
  children: [],
  foods: ["fruit", "vegetable", "meat", "dairy"],
  isFetching: false,
  isLoggingIn: false,
  creatingChild: false,
  loginError: "",
  error: ""
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggingIn: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginError: "Failed login...",
        isLoggingIn: false
      };
    case REGISTER_START:
      return {
        ...state,
        isLoggingIn: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        user: action.payload
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        error: action.payload
      };
    case FETCH_DATA_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        children: action.payload
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: "Failed to fetch..."
      };
    case CREATECHILD_START:
      return {
        ...state,
        creatingChild: true
      };
    case CREATECHILD_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        creatingChild: false,
        children: action.payload
      };
    case CREATECHILD_FAILURE:
      return {
        ...state,
        creatingChild: false,
        error: "Failed to fetch..."
      };
    default:
      return state;
  }
};

export default rootReducer;
