import React, { useState, memo } from 'react';
import DatePicker from 'react-datepicker';
import CheckBox from '../Common/CheckBox/CheckBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faTrash,
  faEdit,
  faSave
} from '@fortawesome/free-solid-svg-icons';
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
    const replaced_content = content.split('\n').map((line, index) => {
      return (
        <span key={index}>
          {line}
          <br />
        </span>
      );
    });

    const [editing, toggleEdit] = useState(false);
    const [edit_form, setValues] = useState({ ...todo });

    const handleToggleEdit = () => {
      toggleEdit(!editing);

      if (editing) {
        onUpdate({ ...edit_form, completed, alarm: todo.alarm });
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

    const _isExpired = due_date => {
      const now = new Date().getTime();
      const isExpired = now - new Date(due_date).getTime() > 0;
      return isExpired;
    };

    const _moment = due_date => {
      if (!due_date) {
        return '';
      }
      const date = new Date(due_date);
      const year = date.getFullYear();
      const month = `${(date.getMonth() + 1).toString()}`.padStart(2, '0');
      const day = `${date.getDate()}`.padStart(2, '0');
      const hours_24 = `${date.getHours()}`.padStart(2, '0');
      const hours = `${hours_24 % 12 || 12}`.padStart(2, '0');
      const mini = `${date.getMinutes()}`.padStart(2, '0');

      const ampm = hours_24 >= 12 ? 'PM' : 'AM';
      const date_form = `${year}/${month}/${day} ${hours}:${mini} ${ampm}`;

      return date_form;
    };

    return (
      <li className="list">
        <div className="list-checkBox">
          <CheckBox id={id} onClick={onToggle} checked={completed} />
        </div>

        <div
          className={`todo ${completed ? 'complete' : ''}`}
          draggable
          onDragStart={e => onDragStart(e, index)}
          onDragOver={() => onDragOver(index)}
          onDragEnd={e => onDragEnd(e, index)}
        >
          <div>
            {editing ? (
              <div className="todo-item">
                <DatePicker
                  className="todo-item__due_date datepicker"
                  selected={edit_form.due_date && new Date(edit_form.due_date)}
                  onChange={onDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy/MM/dd h:mm aa"
                  timeCaption="time"
                  placeholderText="YYYY-MM-DD"
                />
                <input
                  className="todo-item__title"
                  onChange={handleChange}
                  name="title"
                  value={edit_form.title}
                />
                <textarea
                  className="todo-item__content"
                  onChange={handleChange}
                  name="content"
                  value={edit_form.content}
                />
              </div>
            ) : (
              <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="todo-item__due_date"> {_moment(due_date)}</div>
                <div className="todo-item__title">
                  {due_date && (
                    <FontAwesomeIcon
                      className="icon"
                      icon={faClock}
                      style={_isExpired(due_date) && { color: 'red' }}
                    />
                  )}
                  {title}
                </div>

                <div className="todo-item__content">{replaced_content}</div>
              </div>
            )}

            <div className="todo-button">
              <FontAwesomeIcon
                className="icon btn"
                onClick={() => handleToggleEdit()}
                icon={editing ? faSave : faEdit}
              />

              <FontAwesomeIcon
                className="icon btn red"
                onClick={() => onRemove(id)}
                icon={faTrash}
              />
            </div>
          </div>
        </div>
      </li>
    );
  }
);

export default TodoItem;
