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
  CREATECHILD_FAILURE,
  FETCH_CURRENT_CHILD,
  ADD_ENTRY,
  FETCH_ENTRIES
} from "../actions";

const initialState = {
  user: {},
  children: [],
  currentChild: {},
  foodEntries : [],
  foods: ["fruit", "vegetable", "meat", "dairy"],
  isFetching: false,
  isLoggingIn: false,
  creatingChild: false,
  test: {},
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
      return {
        ...state,
        creatingChild: false,
        children: [...state.children, action.payload]
      };
    case CREATECHILD_FAILURE:
      return {
        ...state,
        creatingChild: false,
        error: "Failed to fetch..."
      };
    case FETCH_CURRENT_CHILD:
      return {
        ...state,
        currentChild: action.payload
      }
    case FETCH_ENTRIES:
      let entries = action.array.filter(entry => entry.childId === action.id)
      return {
        ...state,
        foodEntries: entries
      }
    case ADD_ENTRY:
      return {
        ...state,
        test: action.test,
        foodEntries: [...state.foodEntries, action.payload]
      }
    default:
      return state;
  }
};

export default rootReducer;
