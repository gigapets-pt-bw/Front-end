
import axios from "axios";
import axiosWithAuth from "../axiosAuth";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const CREATECHILD_START = "CREATECHILD_START";
export const CREATECHILD_SUCCESS = "CREATECHILD_SUCCESS";
export const CREATECHILD_FAILURE = "CREATECHILD_FAILURE";

export const login = (credentials, redirect, fetch) => dispatch => {
  dispatch({ type: LOGIN_START });
    return axios
      .post("https://gigapets-pt-bw.herokuapp.com/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", credentials.username);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        redirect();
        fetch();
      })
      .catch(err => {
        if (err) {
          localStorage.removeItem("token");
        }
        dispatch({ type: LOGIN_FAILURE });
      });
};

export const register = (credentials, redirect, fetch) => dispatch => {
  dispatch({ type: REGISTER_START });
    return axios.post('https://gigapets-pt-bw.herokuapp.com/api/register', credentials)
    .then(res => {
      console.log(res.data)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", credentials.username);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data }) //res.data will return the user and its token
      redirect();
      fetch();
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAILURE, payload: err});
    })
}

export const fetchChildren = id => dispatch => {
  dispatch({ type: FETCH_DATA_START });
  return axiosWithAuth().get(`https://gigapets-pt-bw.herokuapp.com/api/parents/${id}/children`).then(res => {
      console.log(res);
      dispatch({
          type: FETCH_DATA_SUCCESS,
          payload: res.data
      })
  })
  .catch(error => {
      dispatch({type: FETCH_DATA_FAILURE, payload: error})
  })
};

export const createChild = (child, id) => dispatch => {
  dispatch({ type: CREATECHILD_START });
    return axiosWithAuth().post(`https://gigapets-pt-bw.herokuapp.com/api/parents/${id}/children`, child)
    .then(res => {
      dispatch({
        type: CREATECHILD_SUCCESS,
        payload: res.data
      })
    .catch(error => {
      dispatch({type: CREATECHILD_FAILURE, payload: error})
    })
  })
}
