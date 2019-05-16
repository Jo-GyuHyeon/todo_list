import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'store/modules/todo';
import TodoForm from 'components/Todo/TodoForm';

const AddTodoContainer = ({ todo, TodoActions }) => {
  const { todo_item } = todo;

  const onChange = e => {
    TodoActions.changeInput({
      [e.target.name]: e.target.value
    });
  };

  const onDateChange = due_date => {
    TodoActions.changeInput({ due_date });
  };

  const onSubmit = e => {
    e.preventDefault();
    TodoActions.addTodo(todo_item);
    TodoActions.initializeForm();
  };

  return (
    <TodoForm
      todo_item={todo_item}
      onChange={onChange}
      onDateChange={onDateChange}
      onSubmit={onSubmit}
    />
  );
};

export default connect(
  state => ({
    todo: state.todo
  }),
  dispatch => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(AddTodoContainer);
