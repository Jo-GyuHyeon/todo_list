import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';
import { pender } from 'redux-pender';
import * as TodoAPI from 'lib/api/todo';

const ADD_TODO = 'todos/ADD_TODO';
const GET_TODOS = 'todos/GET_TODOS';
const UPDATE_TODO = 'todos/UPDATE_TODO';
const BULK_UPDATE_TODO = 'todos/BULK_UPDATE_TODO';
const REMOVE_TODO = 'todos/REMOVE_TODO';
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const SORT_TODO = 'todos/SORT_TODO';
const INITIALIZE_FORM = 'todos/INITIALIZE_FORM';

export const addTodo = createAction(ADD_TODO, TodoAPI.addTodo, meta => meta);
export const getTodos = createAction(GET_TODOS, TodoAPI.todos, meta => meta);
export const updateTodo = createAction(
  UPDATE_TODO,
  TodoAPI.updateTodo,
  meta => meta
);
export const bulkUpdateTodo = createAction(
  BULK_UPDATE_TODO,
  TodoAPI.bulkUpdateTodo,
  meta => meta
);
export const removeTodo = createAction(
  REMOVE_TODO,
  TodoAPI.removeTodo,
  meta => meta
);
export const changeInput = createAction(CHANGE_INPUT);
export const sortTodo = createAction(SORT_TODO);
export const initializeForm = createAction(INITIALIZE_FORM);

const initialState = {
  todo_item: {
    id: 0,
    pos: 0,
    title: '',
    content: '',
    due_date: '',
    completed: false
  },
  todos: []
};

export default handleActions(
  {
    ...pender({
      type: ADD_TODO,
      onSuccess: (state, action) =>
        produce(state, draft => {
          const added_todo = action.payload.data.addTodo;
          draft.todos = [...draft.todos, added_todo];
        })
    }),
    ...pender({
      type: GET_TODOS,
      onSuccess: (state, action) =>
        produce(state, draft => {
          const { todos } = action.payload.data;
          draft.todos = [...draft.todos, ...todos];
        })
    }),
    ...pender({
      type: UPDATE_TODO,
      onSuccess: (state, action) =>
        produce(state, draft => {
          const edited_todo = action.payload.data.updateTodo;
          draft.todos = draft.todos.map(todo =>
            todo.id === edited_todo.id ? edited_todo : todo
          );
        })
    }),
    ...pender({
      type: BULK_UPDATE_TODO,
      onSuccess: (state, action) =>
        produce(state, draft => {
          const edited_todos = action.payload.data.bulkUpdateTodo;
          edited_todos.forEach(edited_todo => {
            draft.todos = draft.todos.map(todo =>
              todo.id === edited_todo.id ? edited_todo : todo
            );
          });
        })
    }),
    ...pender({
      type: REMOVE_TODO,
      onSuccess: (state, action) =>
        produce(state, draft => {
          const remove_state = action.payload.data.removeTodo;
          if (remove_state === 1) {
            draft.todos = draft.todos.filter(
              todo => todo.id !== action.meta.id
            );
          }
        })
    }),
    [CHANGE_INPUT]: (state, action) =>
      produce(state, draft => {
        draft.todo_item = { ...draft.todo_item, ...action.payload };
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
