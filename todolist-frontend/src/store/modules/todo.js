import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';

const ADD_TODO = 'todos/ADD_TODO';
const GET_TODO = 'todos/GET_TODO';
const UPDATE_TODO = 'todos/UPDATE_TODO';
const REMOVE_TODO = 'todos/REMOVE_TODO';
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const TOGGLE_CHEKC = 'todos/TOGGLE_CHEKC';
const SORT_TODO = 'todos/SORT_TODO';
const INITIALIZE_FORM = 'todos/INITIALIZE_FORM';

// action creators
export const addTodo = createAction(ADD_TODO, meta => meta);
export const getTodo = createAction(GET_TODO, meta => meta);
export const updateTodo = createAction(UPDATE_TODO, meta => meta);
export const removeTodo = createAction(REMOVE_TODO, meta => meta);
export const changeInput = createAction(CHANGE_INPUT);
export const toggleCheck = createAction(TOGGLE_CHEKC);
export const sortTodo = createAction(SORT_TODO);
export const initializeForm = createAction(INITIALIZE_FORM);

let id = 0;

const initialState = {
  todo_item: {
    id: 0,
    pos: 0,
    title: '',
    content: '',
    due_date: new Date(),
    completed: false
  },
  todos: []
};

export default handleActions(
  {
    [ADD_TODO]: (state, action) =>
      produce(state, draft => {
        const todo_item = { ...action.payload, id: id++ };
        draft.todos = [...draft.todos, todo_item];
      }),
    ...pender({
      type: GET_TODO,
      onSuccess: (state, action) =>
        produce(state, draft => {
          const { todos } = action.payload.data;
          draft.todos = todos;
        })
    }),
    [UPDATE_TODO]: (state, action) =>
      produce(state, draft => {
        const edited_todo = action.payload;
        draft.todos = draft.todos.map(todo =>
          todo.id === edited_todo.id ? edited_todo : todo
        );
      }),
    [REMOVE_TODO]: (state, action) =>
      produce(state, draft => {
        const delete_todo_id = action.payload;
        draft.todos = draft.todos.filter(todo => todo.id !== delete_todo_id);
      }),
    [CHANGE_INPUT]: (state, action) =>
      produce(state, draft => {
        draft.todo_item = { ...draft.todo_item, ...action.payload };
      }),
    [TOGGLE_CHEKC]: (state, action) =>
      produce(state, draft => {
        const toggle_id = action.payload;
        draft.todos = draft.todos.map(todo =>
          todo.id === toggle_id ? { ...todo, completed: !todo.completed } : todo
        );
      }),
    [SORT_TODO]: (state, action) =>
      produce(state, draft => {
        draft.todos = action.payload;
      }),
    [INITIALIZE_FORM]: state =>
      produce(state, draft => {
        const initialForm = initialState.todo_item;
        const keys = Object.keys(initialForm);
        keys.forEach(key => {
          draft.todo_item[key] = initialForm[key];
        });
      })
  },
  initialState
);
