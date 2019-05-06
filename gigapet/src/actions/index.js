
import axios from "axios";
import axiosWithAuth from "../axiosAuth";

export const ADD_ENTRY = "ADD_ENTRY";

export const FETCH_ENTRIES = "FETCH_ENTRIES";

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

export const FETCH_CURRENT_CHILD = "FETCH_CURRENT_CHILD";

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

export const createChild = (child, fetch) => dispatch => {
  dispatch({ type: CREATECHILD_START });
    return axiosWithAuth().post(`https://gigapets-pt-bw.herokuapp.com/api/parents/${child.parentId}/children`, child)
    .then(res => {
      dispatch({
        type: CREATECHILD_SUCCESS,
        payload: res.data
      })
      fetch();
    })
    .catch(error => {
      dispatch({type: CREATECHILD_FAILURE, payload: error})
    })
}

export const addFoodEntry = (newEntry, id) => dispatch => {
  return axiosWithAuth().post(`https://gigapets-pt-bw.herokuapp.com/api/foodentries`, newEntry).then(res => {
    axiosWithAuth().get(`https://gigapets-pt-bw.herokuapp.com/api/children/${id}/entries`).then(res => {
      dispatch({ type: ADD_ENTRY, payload: res.data });
    })
  })
  .catch(error => {
    console.log(error);
  })
}

export const fetchFoodEntries = (id, redirect) => dispatch => {
  return axiosWithAuth().get(`https://gigapets-pt-bw.herokuapp.com/api/children/${id}/entries`).then(res => {
    dispatch({ type: FETCH_ENTRIES, id: id, array: res.data})
    redirect();
  })
  .catch(error => {
    console.log(error);
  })
}

export const currentChild = (fetch, currentChild) => dispatch => {
  fetch(currentChild[0]);
  dispatch({ type: FETCH_CURRENT_CHILD, payload: currentChild[0] });
}