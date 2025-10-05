import api, { API_BASE_URL } from "../../../config/api";
import {
  CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE,
  GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,
  UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE
} from "./ActionType";

// Create category
export const createCategory = (categoryData, jwt) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    const config = { headers: { Authorization: `Bearer ${jwt}` } };
    const { data } = await api.post(`${API_BASE_URL}/api/categories`, categoryData, config);
    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message });
  }
};

// Get all categories
export const getCategories = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const { data } = await api.get(`${API_BASE_URL}/api/categories`, config);
    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_FAILURE, payload: error.message });
  }
};


// Update category
export const updateCategory = (id, updateData, jwt) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    const config = { headers: { Authorization: `Bearer ${jwt}` } };
    const { data } = await api.put(`${API_BASE_URL}/api/categories/${id}`, updateData, config);
    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: error.message });
  }
};

// Delete category
export const deleteCategory = (id, jwt) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    const config = { headers: { Authorization: `Bearer ${jwt}` } };
    await api.delete(`${API_BASE_URL}/api/categories/${id}`, config);
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_CATEGORY_FAILURE, payload: error.message });
  }
};
