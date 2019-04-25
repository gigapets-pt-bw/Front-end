import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from "../actions";

const initialState = {
  users: [
    {
      username: "Ronny",
      password: "password1234",
      children: [
        {
          name: "Ludwick",
          gigapet: {},
          savedFoods: [
            {
              name: "tomato",
              date: "4/23/19",
              category: "vegetable"
            }
          ]
        }
      ]
    }
  ],
  foods: ["fruit", "vegetable", "meat", "dairy", "candy", "greasy"],

  isFetching: false,
  isLoggingIn: false,
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
        isLoggingIn: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginError: "Failed login...",
        isLoggingIn: false
      };
    case FETCH_DATA_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false
        //Something something users: action.payload
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: "Failed to fetch..."
      };
    default:
      return state;
  }
};

export default rootReducer;
