import React, { useState, memo } from 'react';

const TodoItem = memo(({ todo, onUpdate, onRemove, onToggle }) => {
  const { id, title, content, due_date, done } = todo;

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
        textDecoration: done ? 'line-through' : 'none',
        border: ' solid 1px'
      }}
    >
      {editing ? (
        <div>
          <input onChange={handleChange} name="title" value={edit_form.title} />
          <input
            onChange={handleChange}
            name="content"
            value={edit_form.content}
          />
          <input
            onChange={handleChange}
            name="due_date"
            value={edit_form.due_date}
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
});

export default TodoItem;
