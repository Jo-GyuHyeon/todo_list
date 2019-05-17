import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import AlertModal from 'components/Modal/Alert';
import ModalPortal from 'components/Modal/ModalPortal';

class ExpiredModalContainer extends Component {
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.milliseconds = 1000 * 60;
    this.timer = setInterval(() => {
      this.handleOpenModal();
    }, this.milliseconds);
  }

  handleOpenModal = () => {
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
      this.handleOpenModal();
    }, this.milliseconds);
  };

  getExpiredTodos = () => {
    const { todos } = this.props;
    const now = new Date();
    const filterd_todos = todos.filter(
      todo => !todo.completed && now - todo.due_date > 0
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
        {!alarm.state ? (
          <button onClick={this.handleToggleAlarm}>set alarm</button>
        ) : (
          <button onClick={this.handleToggleAlarm}>turn off the alarm</button>
        )}
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
