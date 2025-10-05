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

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLIST_REQUEST:
    case ADD_TO_WISHLIST_REQUEST:
    case REMOVE_FROM_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: action.payload,
      };

    case ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: [...state.wishlist, action.payload],
      };

    case REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: {
          ...state.wishlist,
          data: {
            ...state.wishlist.data,
            wishlist: {
              ...state.wishlist.data.wishlist,
              items: state.wishlist.data.wishlist.items.filter(
                (item) => item.product._id !== action.payload
              ),
            },
          },
        },
      };


    case GET_WISHLIST_FAILURE:
    case ADD_TO_WISHLIST_FAILURE:
    case REMOVE_FROM_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
