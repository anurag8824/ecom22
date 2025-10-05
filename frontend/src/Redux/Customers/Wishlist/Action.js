import {
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAILURE,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAILURE,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAILURE,
} from "./ActionType";
import api, { API_BASE_URL } from "../../../config/api";

// Fetch wishlist
export const getWishlist = (jwt, sortBy = null) => async (dispatch) => {
  dispatch({ type: GET_WISHLIST_REQUEST });
  
  try {
    let url = `${API_BASE_URL}/api/wishlist`;
    if (sortBy) {
      url += `?sortBy=${sortBy}`;
    }
    
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    
    dispatch({ type: GET_WISHLIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ 
      type: GET_WISHLIST_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
  }
};

// Add to wishlist
export const addToWishlist = (productId, jwt) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_WISHLIST_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await api.post(
      `${API_BASE_URL}/api/wishlist/add/${productId}`,
      {},
      config
    );

    dispatch({
      type: ADD_TO_WISHLIST_SUCCESS,
      payload: data,
    });

    return { success: true, data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    
    dispatch({
      type: ADD_TO_WISHLIST_FAILURE,
      payload: errorMessage,
    });

    return { success: false, error: errorMessage };
  }
};

// Remove from wishlist
export const removeFromWishlist = (productId, jwt) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FROM_WISHLIST_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    await api.delete(`${API_BASE_URL}/api/wishlist/remove/${productId}`, config);

    dispatch({
      type: REMOVE_FROM_WISHLIST_SUCCESS,
      payload: productId,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_WISHLIST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
