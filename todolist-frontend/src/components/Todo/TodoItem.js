import React, { useState, memo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

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
        onUpdate({ ...edit_form, completed });
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
        className={completed ? 'complete' : ''}
        style={{
          border: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.3)'
        }}
        draggable
        onDragStart={e => onDragStart(e, index)}
        onDragOver={() => onDragOver(index)}
        onDragEnd={e => onDragEnd(e, index)}
      >
        {editing ? (
          <div className="todo-form">
            <div className="todo-form__label">
              <label>Title *</label>
            </div>
            <div className="todo-form__input">
              <input
                onChange={handleChange}
                name="title"
                value={edit_form.title}
              />
            </div>
            <div className="todo-form__label">
              <label>Content *</label>
            </div>
            <div className="todo-form__input">
              <textarea
                onChange={handleChange}
                name="content"
                value={edit_form.content}
              />
            </div>
            <div className="todo-form__label">
              <label>Due date(optional)</label>
            </div>
            <DatePicker
              className="datepicker"
              selected={edit_form.due_date && new Date(edit_form.due_date)}
              onChange={onDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MM/dd/yyyy h:mm aa"
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
