
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import productReducer from './reducer/Product_reducer'

const store = createStore(productReducer, applyMiddleware(thunk));

export default store;

