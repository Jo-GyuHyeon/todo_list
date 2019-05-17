import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import base from './base';
import todo from './todo';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
  pender: penderReducer,
  base,
  todo,
  visibilityFilter
});

export default rootReducer;
