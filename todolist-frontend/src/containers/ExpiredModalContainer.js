import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as todoActions from 'store/modules/todo';
import AlertModal from 'components/Common/Modal/Alert';
import ModalPortal from 'components/Common/Modal/ModalPortal';
import ToggleSwitch from '../components/Common/ToggleSwitch';
import ErrorBoundary from '../components/ErrorBoundary';

class ExpiredModalContainer extends Component {
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.milliseconds = 1000 * 60;
    this.timer = setInterval(() => {
      this.handleOpenExpiredModal();
    }, this.milliseconds);
  }

  handleOpenExpiredModal = () => {
    if (!this.props.alarm.state) {
      return;
    }
    const expred_todos = this.getExpiredTodos();
    if (expred_todos.length === 0) {
      return;
    }
    const message = `Check your expired (${expred_todos.length}) todo`;
    this.props.BaseActions.showModal({ message: message });
  };

  handleCloseModal = () => {
    this.props.BaseActions.closeModal();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.handleOpenExpiredModal();
    }, this.milliseconds);
  };

  turnOffAlarm = () => {
    const { TodoActions } = this.props;
    const expired_todos = this.getExpiredTodos().map(expired_todo => {
      return { ...expired_todo, alarm: false };
    });
    TodoActions.bulkUpdateTodo(expired_todos);
    this.handleCloseModal();
  };

  getExpiredTodos = () => {
    const { todos } = this.props;
    const now = new Date().getTime();
    const filterd_todos = todos.filter(
      todo =>
        !todo.completed &&
        todo.alarm &&
        todo.due_date &&
        now - new Date(todo.due_date).getTime() > 0
    );
    return filterd_todos;
  };

  handleToggleAlarm = () => {
    const { BaseActions } = this.props;
    BaseActions.toggleCheck();
  };

  render() {
    const { modal, alarm } = this.props;

    return (
      <ErrorBoundary>
        <ToggleSwitch onChange={this.handleToggleAlarm} checked={alarm.state} />
        {modal.state && (
          <ModalPortal>
            <AlertModal
              onClose={this.handleCloseModal}
              onSubmit={this.turnOffAlarm}
              message={modal.message}
            />
          </ModalPortal>
        )}
      </ErrorBoundary>
    );
  }
}

export default connect(
  state => ({
    todos: state.todo.todos,
    modal: state.base.modal,
    alarm: state.base.alarm
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(ExpiredModalContainer);
