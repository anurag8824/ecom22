import api, { API_BASE_URL } from "../../../config/api";
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

// Create
export const createSubCategory = (subcategoryData) => async (dispatch) => {
  dispatch({ type: CREATE_SUBCATEGORY_REQUEST });
  try {
    const { data } = await api.post(`${API_BASE_URL}/api/subcategories`, subcategoryData);
    dispatch({ type: CREATE_SUBCATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_SUBCATEGORY_FAILURE, payload: error.message });
  }
};

// Get All
export const getAllSubCategories = (jwt) => async (dispatch) => {
  dispatch({ type: GET_ALL_SUBCATEGORIES_REQUEST });
  const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/subcategories`,config);
    dispatch({ type: GET_ALL_SUBCATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_SUBCATEGORIES_FAILURE, payload: error.message });
  }
};

// Get By ID
export const getSubCategoryById = (id) => async (dispatch) => {
  dispatch({ type: GET_SUBCATEGORY_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/subcategories/${id}`);
    dispatch({ type: GET_SUBCATEGORY_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SUBCATEGORY_BY_ID_FAILURE, payload: error.message });
  }
};

// Update
export const updateSubCategory = (id, updatedData) => async (dispatch) => {
  dispatch({ type: UPDATE_SUBCATEGORY_REQUEST });
  try {
    const { data } = await api.put(`${API_BASE_URL}/api/subcategories/${id}`, updatedData);
    dispatch({ type: UPDATE_SUBCATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_SUBCATEGORY_FAILURE, payload: error.message });
  }
};

// Delete
export const deleteSubCategory = (id) => async (dispatch) => {
  dispatch({ type: DELETE_SUBCATEGORY_REQUEST });
  try {
    await api.delete(`${API_BASE_URL}/api/subcategories/${id}`);
    dispatch({ type: DELETE_SUBCATEGORY_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_SUBCATEGORY_FAILURE, payload: error.message });
  }
};

// Get By Category ID
export const getSubCategoriesByCategoryId = (categoryId) => async (dispatch) => {
  dispatch({ type: GET_SUBCATEGORIES_BY_CATEGORY_ID_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/subcategories/category/${categoryId}`);
    dispatch({ type: GET_SUBCATEGORIES_BY_CATEGORY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SUBCATEGORIES_BY_CATEGORY_ID_FAILURE, payload: error.message });
  }
};
