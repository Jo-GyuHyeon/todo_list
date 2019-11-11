import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'store/modules/todo';
import TodoForm from 'components/Todo/TodoForm';
import ErrorBoundary from '../components/ErrorBoundary';

const AddTodoContainer = ({ todo, TodoActions }) => {
  const { todo_item, todos } = todo;
  const pos = 65535;

  const onChange = (e) => {
    TodoActions.changeInput({
      [e.target.name]: e.target.value
    });
  };

  const onDateChange = (due_date) => {
    TodoActions.changeInput({ due_date });
  };

  const _sortByid = (prev, next) => {
    return prev.id < next.id ? -1 : prev.id > next.id ? 1 : 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const sorted_todos = [...todos].sort(_sortByid);
    const prev_last_todo = sorted_todos[sorted_todos.length - 1];

    const last_todo =
      todos.length > 0 ? todos[todos.length - 1] : prev_last_todo;

    const new_todo_pos = pos + (last_todo ? last_todo.pos : 0);
    TodoActions.addTodo({
      ...todo_item,
      pos: new_todo_pos
    });

    TodoActions.initializeForm();
  };

  return (
    <ErrorBoundary>
      <TodoForm
        todo_item={todo_item}
        onChange={onChange}
        onDateChange={onDateChange}
        onSubmit={onSubmit}
      />
    </ErrorBoundary>
  );
};

export default connect(
  (state) => ({
    todo: state.todo
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(AddTodoContainer);
