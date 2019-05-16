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

  const onDragEnd = e => {
    setDraggedItem();
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
