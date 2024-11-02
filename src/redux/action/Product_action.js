import axios from 'axios';

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const response = await axios.get('http://localhost:5000/api/v1/product/get');
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

export const addProduct = (product) => async (dispatch) => {
  dispatch({ type: 'ADD_PRODUCT_REQUEST' });
  try {
    const response = await axios.post('http://localhost:5000/api/v1/product/post', product);
    dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADD_PRODUCT_FAILURE', payload: error.message });
  }
};

export const editProduct = (id, updatedProduct) => async (dispatch) => {
  dispatch({ type: 'EDIT_PRODUCT_REQUEST' });
  try {
    const response = await axios.put(`http://localhost:5000/api/v1/product/update/${id}`, updatedProduct);
    dispatch({ type: 'EDIT_PRODUCT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'EDIT_PRODUCT_FAILURE', payload: error.message });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: 'DELETE_PRODUCT_REQUEST' });
  try {
    await axios.delete(`http://localhost:5000/api/v1/product/delete/${id}`);
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_PRODUCT_FAILURE', payload: error.message });
  }
};


export const updateProductStatus = (id, status) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PRODUCT_STATUS_REQUEST' });
  try {
    const response = await axios.patch(`http://localhost:5000/api/v1/product/statusupdate/${id}`, { status });
    dispatch({ type: 'UPDATE_PRODUCT_STATUS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_PRODUCT_STATUS_FAILURE', payload: error.message });
  }
};
