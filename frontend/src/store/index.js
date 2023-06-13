import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import items from './item';
import stores from './store';
import currentStore from './currentStore';
import storeItems from './storeItem';
import cartItems from './cartItem';
import orders from './order';

const rootReducer = combineReducers({
  // mini reducers
  session,
  stores,
  currentStore,
  items,
  storeItems,
  cartItems,
  orders,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
