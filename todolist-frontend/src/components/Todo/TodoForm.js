import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';
import Button from '../Common/Button/Button';

const TodoForm = ({ todo_item, onChange, onDateChange, onSubmit }) => {
  return (
    <form className="todo" onSubmit={onSubmit}>
      <DatePicker
        className="todo-item__due_date datepicker"
        selected={todo_item.due_date}
        onChange={onDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="yyyy/MM/dd h:mm aa"
        timeCaption="time"
        placeholderText="Due date"
      />
      <input
        className="todo-item__title"
        required
        name="title"
        placeholder="Title"
        onChange={onChange}
        value={todo_item.title}
        ref={this}
      />
      <textarea
        className="todo-item__content"
        required
        name="content"
        placeholder="Content"
        onChange={onChange}
        value={todo_item.content}
      />
      <div className="todo-button">
        <Button className="todo-form__submit" type="submit" color={'blue'}>
          Add Todo
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
