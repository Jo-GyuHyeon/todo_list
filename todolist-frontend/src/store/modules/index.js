import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import todo from './todo';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
  pender: penderReducer,
  todo,
  visibilityFilter
});

export default rootReducer;
