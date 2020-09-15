import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';
//Load User
export const loadUser = () => async dispatch => {
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    console.log('load below!');
    const res = await axios.get(
      // 'http://localhost:5000/api/auth'
      '/api/auth'
      // , {
      // headers: {
      //   'Access-Control-Allow-Origin': 'http://localhost:5000/api/auth',
      // },
      // }
    );
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
//Register User
// export const register = ({ name, email, password }) => async dispatch => {
export const register = formData => async dispatch => {
  console.log('we get here');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // const  = JSON.stringify({ name, email, password });
  console.log(formData);
  try {
    const res = await axios.post('/api/users', formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    console.log(err.response.data.errors);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login User
export const login = (email, password) => async dispatch => {
  // export const login = formData => async dispatch => {
  // const body = { email, password };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  console.log(body);

  // console.log(formData);
  try {
    console.log('get here');
    const res = await axios.post(
      '/api/auth',
      // { email, password },
      body,
      // formData,
      config
    );

    console.log('never get here');
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};

// export const register = formData => async dispatch => {
//   try {
//     const res = await axios.post('/api/users', formData);

//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: res.data,
//     });
//     // dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: REGISTER_FAIL,
//     });
//   }
// };
