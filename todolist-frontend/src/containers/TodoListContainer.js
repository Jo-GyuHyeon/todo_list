import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../store/modules/todo';
import TodoList from '../components/Todo/TodoList';
import TodoForm from '../components/Todo/TodoForm';

const TodoListContainer = ({ todo, TodoActions }) => {
  const { todo_item, todos } = todo;

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

  const onUpdate = edited_todo => {
    TodoActions.updateTodo(edited_todo);
  };

  const onRemove = id => {
    TodoActions.removeTodo(id);
  };

  const onToggle = id => {
    TodoActions.toggleCheck(id);
  };

  return (
    <div>
      <TodoForm
        todo_item={todo_item}
        onChange={onChange}
        onDateChange={onDateChange}
        onSubmit={onSubmit}
      />
      <TodoList
        todos={todos}
        onUpdate={onUpdate}
        onRemove={onRemove}
        onToggle={onToggle}
      />
    </div>
  );
};

export default connect(
  state => ({
    todo: state.todo
  }),
  dispatch => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodoListContainer);
