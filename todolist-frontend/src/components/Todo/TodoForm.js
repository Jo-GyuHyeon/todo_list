import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

const TodoForm = ({ todo_item, onChange, onDateChange, onSubmit }) => {
  return (
    <div>
      <form className="todo-form" onSubmit={onSubmit}>
        <div className="todo-form__label">
          <label>Title *</label>
        </div>
        <div className="todo-form__input">
          <input
            required
            name="title"
            placeholder="ex) Eating lunch"
            onChange={onChange}
            value={todo_item.title}
            ref={this}
          />
        </div>
        <div className="todo-form__label">
          <label>Content *</label>
        </div>
        <div className="todo-form__input">
          <textarea
            required
            name="content"
            placeholder="ex) I made a reservation at Brisbane restaurant at 1 o'clock."
            onChange={onChange}
            value={todo_item.content}
          />
        </div>
        <div className="todo-form__label">
          <label>Due date(optional)</label>
        </div>

        <DatePicker
          className="datepicker"
          selected={todo_item.due_date}
          onChange={onDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MM/dd/yyyy h:mm aa"
          timeCaption="time"
        />

        <button className="todo-form__submit" type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
