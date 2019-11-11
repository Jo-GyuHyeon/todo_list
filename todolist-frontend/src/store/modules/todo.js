import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';

const ADD_TODO = 'todos/ADD_TODO';
const UPDATE_TODO = 'todos/UPDATE_TODO';
const CHECK_TODO_NOTIFICATION = 'todos/CHECK_TODO_NOTIFICATION';
const REMOVE_TODO = 'todos/REMOVE_TODO';
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const SORT_TODO = 'todos/SORT_TODO';
const INITIALIZE_FORM = 'todos/INITIALIZE_FORM';

export const addTodo = createAction(ADD_TODO);
export const updateTodo = createAction(UPDATE_TODO);
export const checkTodosNotificaion = createAction(CHECK_TODO_NOTIFICATION);
export const removeTodo = createAction(REMOVE_TODO);
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
    completed: false,
    alarm: true
  },
  todos: [
    {
      id: 1,
      pos: 65535,
      title: '가나다라',
      content: '마바사',
      due_date: new Date().toISOString(),
      completed: false,
      alarm: true
    },
    {
      id: 2,
      pos: 131070,
      title: 'Todo',
      content: 'you can do drag and drop',
      due_date: '',
      completed: false,
      alarm: true
    },
    {
      id: 3,
      pos: 196605,
      title: '점심약속',
      content: '홍길동과 강남에서 점심약속',
      due_date: '2019-11-12T15:00:00.000Z',
      completed: false,
      alarm: true
    }
  ]
};

export default handleActions(
  {
    [ADD_TODO]: (state, action) =>
      produce(state, (draft) => {
        const added_todo = action.payload;
        const new_todo = { ...added_todo, id: state.todos.length + 1 };
        draft.todos = [...draft.todos, new_todo];
      }),
    [UPDATE_TODO]: (state, action) =>
      produce(state, (draft) => {
        const edited_todo = action.payload;
        draft.todos = draft.todos.map((todo) =>
          todo.id === edited_todo.id ? edited_todo : todo
        );
      }),

    [CHECK_TODO_NOTIFICATION]: (state, action) =>
      produce(state, (draft) => {
        draft.todos = state.todos.map((todo) => {
          return { ...todo, alarm: false };
        });
      }),
    [REMOVE_TODO]: (state, action) =>
      produce(state, (draft) => {
        const { id } = action.payload;
        draft.todos = state.todos.filter((todo) => todo.id !== id);
      }),
    [CHANGE_INPUT]: (state, action) =>
      produce(state, (draft) => {
        draft.todo_item = { ...draft.todo_item, ...action.payload };
      }),
    [SORT_TODO]: (state, action) =>
      produce(state, (draft) => {
        draft.todos = action.payload;
      }),
    [INITIALIZE_FORM]: (state) =>
      produce(state, (draft) => {
        const initialForm = initialState.todo_item;
        const keys = Object.keys(initialForm);
        keys.forEach((key) => {
          draft.todo_item[key] = initialForm[key];
        });
      })
  },
  initialState
);
