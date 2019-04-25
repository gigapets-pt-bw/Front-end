// import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_START });
  //   return axios
  //     .post("http://localhost:5000", credentials)
  //     .then(res => {
  //       localStorage.setItem("token", res.data);
  //       dispatch({ type: LOGIN_SUCCESS });
  //     })
  //     .catch(err => {
  //       if (err) {
  //         localStorage.removeItem("token");
  //       }
  //       dispatch({ type: LOGIN_FAILURE });
  //     });
};

export const fetch = user => dispatch => {
  dispatch({ type: FETCH_DATA_START });
  // return axios.get("http://localhost:5000/users").then(res => {
  //     dispatch({
  //         type: FETCH_DATA_SUCCESS,
  //         payload: res.results.filter(user=>user.username=user)
  //     })
  // })
  // .catch(err => {
  //     dispatch({type: FETCH_DATA_FAILURE, payload: err.status})
  // })
};
