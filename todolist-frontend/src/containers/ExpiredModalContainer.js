import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import AlertModal from 'components/Modal/Alert';
import ModalPortal from 'components/Modal/ModalPortal';
import ToggleSwitch from '../components/ToggleSwitch';

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
    const message = `Check your expired (${expred_todos.length})todo`;
    this.props.BaseActions.showModal({ message: message });
  };

  handleCloseModal = () => {
    this.props.BaseActions.closeModal();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.handleOpenExpiredModal();
    }, this.milliseconds);
  };

  getExpiredTodos = () => {
    const { todos } = this.props;
    const now = new Date().getTime();
    const filterd_todos = todos.filter(
      todo =>
        !todo.completed &&
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
      <div>
        <ToggleSwitch onChange={this.handleToggleAlarm} checked={alarm.state} />
        {modal.state && (
          <ModalPortal>
            <AlertModal
              onClose={this.handleCloseModal}
              message={modal.message}
            />
          </ModalPortal>
        )}
      </div>
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
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(ExpiredModalContainer);
