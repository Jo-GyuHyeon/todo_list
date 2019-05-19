import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'store/modules/todo';
import TodoForm from 'components/Todo/TodoForm';

const AddTodoContainer = ({ todo, TodoActions }) => {
  const { todo_item, todos } = todo;
  const pos = 65535;

  const onChange = e => {
    TodoActions.changeInput({
      [e.target.name]: e.target.value
    });
  };

  const onDateChange = due_date => {
    TodoActions.changeInput({ due_date });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const prev_last_todo = todos[todos.length - 1];
    const { data } = await _getTodos(prev_last_todo ? prev_last_todo.id : 0);
    const last_todo =
      data.todos.length > 0
        ? data.todos[data.todos.length - 1]
        : prev_last_todo;

    const new_todo_pos = pos + (last_todo ? last_todo.pos : 0);
    TodoActions.addTodo({
      ...todo_item,
      pos: new_todo_pos
    });

    TodoActions.initializeForm();
  };

  const _getTodos = max_id => {
    const todos = TodoActions.getTodos({ max_id, limit: 0 });
    return todos;
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
