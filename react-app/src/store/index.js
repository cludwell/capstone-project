import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import albumReducer from './albums';
import purchasesReducer from './purchases';
import bandReducer from './bands';
import userReducer from './users';
import wishReducer from './wishlists';
import songReducer from './songs';
import cartReducer from './carts';

const rootReducer = combineReducers({
  session,
  albums: albumReducer,
  purchases: purchasesReducer,
  bands: bandReducer,
  users: userReducer,
  wishes: wishReducer,
  songs: songReducer,
  cart: cartReducer
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
