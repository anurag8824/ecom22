// Redux/Auth/Action.js
import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT
} from './ActionTypes';
import { API_BASE_URL } from '../../config/api';

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = error => ({ type: REGISTER_FAILURE, payload: error });

export const register = userData => async dispatch => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    const user = response.data;
    if(user.jwt) localStorage.setItem("jwt", user.jwt);
    dispatch(registerSuccess(user));
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.error || error.message));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

export const sendOtp = ({ mobile }) => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, { mobile });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { message: response.data.message }  // Just a simple success message
    });
    return Promise.resolve(); // So you can handle `.then()` in the component
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.error || error.message));
    return Promise.reject(); // So `.catch()` will run in the component
  }
};


export const loginWithOtp = (mobile, otp, navigate) => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { mobile, otp });
    const data = response.data;

    if (data.newUser) {
      navigate("/register", { state: { mobile: data.mobile } });
    } else if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch(loginSuccess(data));
    }
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.error || error.message));
  }
};

export const getUser = (token) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: GET_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.response?.data?.error || error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};
