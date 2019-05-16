import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'store/modules/todo';
import * as VisibilityFilters from '../store/modules/visibilityFilter';
import TodoList from 'components/Todo/TodoList';

const TodoListContainer = ({ todo, TodoActions, filter }) => {
  const { todos } = todo;

  const onUpdate = edited_todo => {
    TodoActions.updateTodo(edited_todo);
  };

  const onRemove = id => {
    TodoActions.removeTodo(id);
  };

  const onToggle = id => {
    TodoActions.toggleCheck(id);
  };

  const onSort = todos => {
    TodoActions.sortTodo(todos);
  };

  const filtered_todos = () => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todos;
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.completed);
      case VisibilityFilters.SHOW_EXPIRED:
        const now = new Date();
        return todos.filter(todo => now - todo.due_date > 0);
      default:
        throw new Error('Unknown filter: ' + filter);
    }
  };

  return (
    <TodoList
      todos={filtered_todos()}
      onSort={onSort}
      onUpdate={onUpdate}
      onRemove={onRemove}
      onToggle={onToggle}
    />
  );
};

export default connect(
  state => ({
    todo: state.todo,
    filter: state.visibilityFilter.filter
  }),
  dispatch => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodoListContainer);
