import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import todo from './todo';

const rootReducer = combineReducers({
  pender: penderReducer,
  todo
});

export default rootReducer;
