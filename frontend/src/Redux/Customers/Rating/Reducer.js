import {
  CREATE_RATING_REQUEST,
  CREATE_RATING_SUCCESS,
  CREATE_RATING_FAILURE,
  GET_PRODUCTS_RATING_REQUEST,
  GET_PRODUCTS_RATING_SUCCESS,
  GET_PRODUCTS_RATING_FAILURE
} from './ActionType';

const initialState = {
  ratings: [],
  userRating: null,
  loading: false,
  error: null,
  success: false
};

const RatingReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Rating
    case CREATE_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };
    case CREATE_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        ratings: [...state.ratings, action.payload],
        userRating: action.payload,
        error: null,
        success: true
      };
    case CREATE_RATING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };

    // Get Product's Ratings
    case GET_PRODUCTS_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_PRODUCTS_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        ratings: action.payload,
        error: null
      };
    case GET_PRODUCTS_RATING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default RatingReducer;