import React, { useState, memo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoItem = memo(
  ({
    index,
    todo,
    onUpdate,
    onRemove,
    onToggle,
    onDragStart,
    onDragOver,
    onDragEnd
  }) => {
    const { id, title, content, due_date, completed } = todo;

    const [editing, toggleEdit] = useState(false);
    const [edit_form, setValues] = useState({ ...todo });

    const handleToggleEdit = () => {
      toggleEdit(!editing);

      if (editing) {
        onUpdate(edit_form);
      }
    };

    const handleChange = e => {
      setValues({
        ...edit_form,
        [e.target.name]: e.target.value
      });
    };

    const onDateChange = due_date => {
      setValues({
        ...edit_form,
        due_date
      });
    };

    const moment = due_date => {
      if (!due_date) {
        return '';
      }
      const date = new Date(due_date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString();
      const day = date.getDate().toString();
      const date_form = `${year}-${month.length > 1 ? month : 0 + month}-${
        day.length > 1 ? day : 0 + day
      }`;
      return date_form;
    };

    return (
      <li
        style={{
          textDecoration: completed ? 'line-through' : 'none',
          border: ' solid 1px'
        }}
        draggable
        onDragStart={e => onDragStart(e, index)}
        onDragOver={() => onDragOver(index)}
        onDragEnd={e => onDragEnd(e, index)}
      >
        {editing ? (
          <div>
            <input
              onChange={handleChange}
              name="title"
              value={edit_form.title}
            />
            <input
              onChange={handleChange}
              name="content"
              value={edit_form.content}
            />
            <DatePicker
              selected={edit_form.due_date && new Date(edit_form.due_date)}
              onChange={onDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
          </div>
        ) : (
          <div onClick={() => onToggle(id)}>
            <div>{title}</div>
            <div>{content}</div>
            <div>{moment(due_date)}</div>
          </div>
        )}

        <button onClick={() => handleToggleEdit()}>
          {editing ? '저장' : '수정'}
        </button>
        <button onClick={() => onRemove(id)}>삭제</button>
      </li>
    );
  }
);

export default TodoItem;
