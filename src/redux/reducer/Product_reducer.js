
const initialState = {
    products: [],
    loading: false,
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_REQUEST':
      case 'ADD_PRODUCT_REQUEST':
      case 'EDIT_PRODUCT_REQUEST':
      case 'DELETE_PRODUCT_REQUEST':
        return { ...state, loading: true, error: null };
  
      case 'FETCH_PRODUCTS_SUCCESS':
        return { ...state, loading: false, products: action.payload };
  
      case 'ADD_PRODUCT_SUCCESS':
        return { ...state, loading: false, products: [...state.products, action.payload] };
  
      case 'EDIT_PRODUCT_SUCCESS':
        return {
          ...state,
          loading: false,
          products: state.products.map((product) =>
            product._id === action.payload._id ? action.payload : product
          ),
        };
  
      case 'DELETE_PRODUCT_SUCCESS':
        return {
          ...state,
          loading: false,
          products: state.products.filter((product) => product._id !== action.payload),
        };
  
        case 'UPDATE_PRODUCT_STATUS_SUCCESS': 
      return {
        ...state,
        loading: false,
        products: state.products.map((product) =>
          product._id === action.payload._id ? { ...product, status: action.payload.status } : product
        ),
      };

      case 'FETCH_PRODUCTS_FAILURE':
      case 'ADD_PRODUCT_FAILURE':
      case 'EDIT_PRODUCT_FAILURE':
      case 'DELETE_PRODUCT_FAILURE':
       case 'UPDATE_PRODUCT_STATUS_FAILURE':
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default productReducer;
  