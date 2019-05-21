import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'store/modules/todo';
import * as VisibilityFilters from '../store/modules/visibilityFilter';
import TodoList from 'components/Todo/TodoList';
import ErrorBoundary from '../components/ErrorBoundary';

class TodoListContainer extends Component {
  componentDidMount() {
    this._getTodos();
    window.addEventListener('scroll', this._infiniteScroll, true);
  }

  _getTodos = () => {
    const { todos } = this.props.todo;
    const sorted_todos = [...todos].sort(this._sortByid);
    const max_id =
      sorted_todos.length > 0 ? sorted_todos[sorted_todos.length - 1].id : 0;
    this.props.TodoActions.getTodos({ max_id });
  };

  _sortByid = (prev, next) => {
    return prev.id < next.id ? -1 : prev.id > next.id ? 1 : 0;
  };

  timer;

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

    const isSuitable = scrollTop !== 0;
    if (isSuitable && scrollTop + clientHeight === scrollHeight) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.timer = null;
          this._getTodos();
        }, 200);
      }
    }
  };

  onUpdate = edited_todo => {
    const due_date = edited_todo.due_date ? edited_todo.due_date : '';
    this.props.TodoActions.updateTodo({ ...edited_todo, due_date });
  };

  onRemove = id => {
    this.props.TodoActions.removeTodo({ id });
  };

  onToggle = id => {
    const [edited_todo] = this.props.todo.todos.filter(todo => todo.id === id);
    this.onUpdate({ ...edited_todo, completed: !edited_todo.completed });
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
        const now = new Date().getTime();
        return todo.todos.filter(
          todo =>
            !todo.completed &&
            todo.due_date &&
            now - new Date(todo.due_date).getTime() > 0
        );
      default:
        throw new Error('Unknown filter: ' + filter);
    }
  };

  render() {
    const { filtered_todos, onSort, onUpdate, onRemove, onToggle } = this;
    return (
      <ErrorBoundary>
        <TodoList
          todos={filtered_todos()}
          onSort={onSort}
          onUpdate={onUpdate}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      </ErrorBoundary>
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
