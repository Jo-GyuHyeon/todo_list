import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';

export const SHOW_ALL = 'visibilityFilter/SHOW_ALL';
export const SHOW_ACTIVE = 'visibilityFilter/SHOW_ACTIVE';
export const SHOW_COMPLETED = 'visibilityFilter/SHOW_COMPLETED';
export const SHOW_EXPIRED = 'visibilityFilter/SHOW_EXPIRED';
const SET_VISIBILITYFILTER = 'visibilityFilter/SET_VISIBILITYFILTER';

export const setVisibilityFilter = createAction(SET_VISIBILITYFILTER);

const initialState = {
  filter: SHOW_ALL
};

export default handleActions(
  {
    [SET_VISIBILITYFILTER]: (state, action) =>
      produce(state, draft => {
        draft.filter = action.payload;
      })
  },
  initialState
);
