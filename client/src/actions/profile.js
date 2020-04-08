import axios from 'axios';
//import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';
import { setAlert } from './alert';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    console.log(res);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create or Update Profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(
      setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success', 3000)
    );
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    const errs = error.response.data.errors;
    if (errs) {
      errs.forEach((error) => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    console.error(error.message);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('api/profile/experience', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Added', 'success', 3000));
    history.push('/dashboard');
  } catch (error) {
    console.log(error);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    const errs = error.response.data.errors;
    if (errs) {
      errs.forEach((error) => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    console.error(error.message);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Added', 'success', 3000));
    history.push('/dashboard');
  } catch (error) {
    console.log(error);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    const errs = error.response.data.errors;
    if (errs) {
      errs.forEach((error) => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    console.error(error.message);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
