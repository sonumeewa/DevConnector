import axios from 'axios';
//import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
} from './types';
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

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');
    console.log(res);
    dispatch({
      type: GET_PROFILES,
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

export const getProfileById = (userId) => async (dispatch) => {
  try {
    console.log('Clicked');
    const res = await axios.get(`/api/profile/user/${userId}`);
    console.log('profile' + res.data);
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

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    console.log(res);
    dispatch({
      type: GET_REPOS,
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

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience deleted', 'success'));
  } catch (error) {
    console.log(error);
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

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education deleted', 'success'));
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

export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can not be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Your account has been deleted permanently'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
