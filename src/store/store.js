import rootReducer from '../reducers/rootReducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export default (initialState) => {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
};
