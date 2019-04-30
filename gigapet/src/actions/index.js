
import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const login = (credentials, redirect) => dispatch => {
  dispatch({ type: LOGIN_START });
    return axios
      .post("https://gigapets-pt-bw.herokuapp.com/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        redirect();
      })
      .catch(err => {
        if (err) {
          localStorage.removeItem("token");
        }
        dispatch({ type: LOGIN_FAILURE });
      });
};

export const register = (credentials, redirect) => dispatch => {
  dispatch({ type: REGISTER_START });
    return axios.post('https://gigapets-pt-bw.herokuapp.com/api/register', credentials)
    .then(res => {
      console.log(res.data)
      localStorage.setItem("token", res.data.token);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data }) //res.data will return the user and its token
      redirect();
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAILURE, payload: err});
    })
}

export const fetch = user => dispatch => {
  dispatch({ type: FETCH_DATA_START });
  // return axios.get("http://localhost:5000/user/").then(res => {
  //     dispatch({
  //         type: FETCH_DATA_SUCCESS,
  //         payload: 
  //     })
  // })
  // .catch(error => {
  //     dispatch({type: FETCH_DATA_FAILURE, payload: error})
  // })
};
