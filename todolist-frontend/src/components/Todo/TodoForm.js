import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoForm = ({ todo_item, onChange, onDateChange, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          required
          name="title"
          placeholder="title"
          onChange={onChange}
          value={todo_item.title}
          ref={this}
        />
        <input
          required
          name="content"
          placeholder="content"
          onChange={onChange}
          value={todo_item.content}
        />
        <DatePicker
          selected={todo_item.due_date}
          onChange={onDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="time"
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
