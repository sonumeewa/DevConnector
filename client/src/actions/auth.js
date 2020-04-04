import axios from 'axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from './types';
import { setAlert } from './alert';
import { setAuthToken } from '../utils/setAuthToken';

export const logout = (dispatch) => {
  dispatch({ type: LOGOUT });
};
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
      payload: error.message,
    });
  }
};

// register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    var res = await axios.post('api/users', body, config);

    console.log(res);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errs = error.response.data.errors;
    if (errs) {
      errs.forEach((error) => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    console.error(error.message);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login user
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    var res = await axios.post('api/auth/', body, config);

    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errs = error.response.data.errors;
    if (errs) {
      errs.forEach((error) => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    console.error(error);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
