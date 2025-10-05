import {
  CREATE_RATING_REQUEST,
  CREATE_RATING_SUCCESS,
  CREATE_RATING_FAILURE,
  GET_PRODUCTS_RATING_REQUEST,
  GET_PRODUCTS_RATING_SUCCESS,
  GET_PRODUCTS_RATING_FAILURE
} from './ActionType';
import api from '../../../config/api';

// Create Rating
export const createRating = (ratingData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_RATING_REQUEST });
    try {
      const response = await api.post('/api/ratings/create', ratingData);
      
      dispatch({
        type: CREATE_RATING_SUCCESS,
        payload: response.data
      });
      
      console.log("Rating created successfully:", response.data);
    } catch (error) {
      dispatch({
        type: CREATE_RATING_FAILURE,
        payload: error.response?.data?.message || error.message
      });
      console.error("Error creating rating:", error);
    }
  };
};

// Get Product's Ratings
export const getProductsRating = (productId) => {
  return async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_RATING_REQUEST });
    try {
      const response = await api.get(`/api/ratings/product/${productId}`);
      
      dispatch({
        type: GET_PRODUCTS_RATING_SUCCESS,
        payload: response.data
      });
      
      console.log("Product ratings fetched:", response.data);
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_RATING_FAILURE,
        payload: error.response?.data?.message || error.message
      });
      console.error("Error fetching product ratings:", error);
    }
  };
};