import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoItems = React.memo(
  ({
    todos,
    onUpdate,
    onRemove,
    onToggle,
    onDragStart,
    onDragOver,
    onDragEnd
  }) =>
    todos.map((todo, index) => (
      <TodoItem
        key={todo.id}
        index={index}
        todo={todo}
        onUpdate={onUpdate}
        onRemove={onRemove}
        onToggle={onToggle}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      />
    ))
);

const TodoList = ({ todos, onSort, onUpdate, onRemove, onToggle }) => {
  const [draggedItem, setDraggedItem] = useState(false);

  const onDragStart = (e, index) => {
    setDraggedItem(todos[index]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
    e.dataTransfer.setDragImage(e.target, 20, 20);
  };

  const onDragOver = index => {
    const draggedOverItem = todos[index];

    if (draggedItem === draggedOverItem) {
      return;
    }

    let items = todos.filter(item => item !== draggedItem);

    items.splice(index, 0, draggedItem);

    onSort(items);
  };

  const onDragEnd = (e, index) => {
    setDraggedItem();
    const target_todo = getPositionChangedTodo(e, index);
    onUpdate(target_todo);
  };

  const getPositionChangedTodo = (e, index) => {
    const target_todo = todos[index];
    const prev_todo = index > 0 ? todos[index - 1] : null;
    const next_todo = index < todos.length - 1 ? todos[index + 1] : null;

    if (!prev_todo && next_todo) {
      target_todo.pos = next_todo.pos / 2;
    } else if (!next_todo && prev_todo) {
      target_todo.pos = prev_todo.pos * 2;
    } else if (next_todo && prev_todo) {
      target_todo.pos = (prev_todo.pos + next_todo.pos) / 2;
    }
    return target_todo;
  };

  return (
    <div>
      <ul>
        <TodoItems
          todos={todos}
          onUpdate={onUpdate}
          onRemove={onRemove}
          onToggle={onToggle}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        />
      </ul>
    </div>
  );
};

export default TodoList;
