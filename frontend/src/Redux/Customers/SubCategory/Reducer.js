import {
  CREATE_SUBCATEGORY_REQUEST,
  CREATE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_FAILURE,
  GET_ALL_SUBCATEGORIES_REQUEST,
  GET_ALL_SUBCATEGORIES_SUCCESS,
  GET_ALL_SUBCATEGORIES_FAILURE,
  GET_SUBCATEGORY_BY_ID_REQUEST,
  GET_SUBCATEGORY_BY_ID_SUCCESS,
  GET_SUBCATEGORY_BY_ID_FAILURE,
  UPDATE_SUBCATEGORY_REQUEST,
  UPDATE_SUBCATEGORY_SUCCESS,
  UPDATE_SUBCATEGORY_FAILURE,
  DELETE_SUBCATEGORY_REQUEST,
  DELETE_SUBCATEGORY_SUCCESS,
  DELETE_SUBCATEGORY_FAILURE,
  GET_SUBCATEGORIES_BY_CATEGORY_ID_REQUEST,
  GET_SUBCATEGORIES_BY_CATEGORY_ID_SUCCESS,
  GET_SUBCATEGORIES_BY_CATEGORY_ID_FAILURE,
} from "./ActionType";

const initialState = {
  subcategories: [],
  subcategoriesByCategory: [],
  selectedSubCategory: null,
  loading: false,
  error: null,
};

export const subCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SUBCATEGORY_REQUEST:
    case GET_ALL_SUBCATEGORIES_REQUEST:
    case GET_SUBCATEGORY_BY_ID_REQUEST:
    case UPDATE_SUBCATEGORY_REQUEST:
    case DELETE_SUBCATEGORY_REQUEST:
    case GET_SUBCATEGORIES_BY_CATEGORY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: [...state.subcategories, action.payload],
      };

    case GET_ALL_SUBCATEGORIES_SUCCESS:
      return { ...state, loading: false, subcategories: action.payload };

    case GET_SUBCATEGORY_BY_ID_SUCCESS:
      return { ...state, loading: false, selectedSubCategory: action.payload };

    case UPDATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: state.subcategories.map((sub) =>
          sub._id === action.payload._id ? action.payload : sub
        ),
      };

    case DELETE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: state.subcategories.filter((sub) => sub._id !== action.payload),
      };

    case GET_SUBCATEGORIES_BY_CATEGORY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategoriesByCategory: action.payload,
      };

    case CREATE_SUBCATEGORY_FAILURE:
    case GET_ALL_SUBCATEGORIES_FAILURE:
    case GET_SUBCATEGORY_BY_ID_FAILURE:
    case UPDATE_SUBCATEGORY_FAILURE:
    case DELETE_SUBCATEGORY_FAILURE:
    case GET_SUBCATEGORIES_BY_CATEGORY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
