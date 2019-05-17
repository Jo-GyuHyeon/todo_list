import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'store/modules/todo';
import * as VisibilityFilters from '../store/modules/visibilityFilter';
import TodoList from 'components/Todo/TodoList';

class TodoListContainer extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this._infiniteScroll, true);
  }

  _infiniteScroll = () => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      //get api
    }
  };

  onUpdate = edited_todo => {
    this.props.TodoActions.updateTodo(edited_todo);
  };

  onRemove = id => {
    this.props.TodoActions.removeTodo(id);
  };

  onToggle = id => {
    this.props.TodoActions.toggleCheck(id);
  };

  onSort = todos => {
    this.props.TodoActions.sortTodo(todos);
  };

  filtered_todos = () => {
    const { filter, todo } = this.props;

    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todo.todos;
      case VisibilityFilters.SHOW_COMPLETED:
        return todo.todos.filter(todo => todo.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return todo.todos.filter(todo => !todo.completed);
      case VisibilityFilters.SHOW_EXPIRED:
        const now = new Date();
        return todo.todos.filter(todo => now - todo.due_date > 0);
      default:
        throw new Error('Unknown filter: ' + filter);
    }
  };

  render() {
    const { filtered_todos, onSort, onUpdate, onRemove, onToggle } = this;
    return (
      <TodoList
        todos={filtered_todos()}
        onSort={onSort}
        onUpdate={onUpdate}
        onRemove={onRemove}
        onToggle={onToggle}
      />
    );
  }
}

export default connect(
  state => ({
    todo: state.todo,
    filter: state.visibilityFilter.filter
  }),
  dispatch => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodoListContainer);
