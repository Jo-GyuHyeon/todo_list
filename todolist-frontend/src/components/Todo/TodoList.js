import React from 'react';
import TodoItem from './TodoItem';

const TodoItems = React.memo(({ todos, onUpdate, onRemove, onToggle }) =>
  todos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onUpdate={onUpdate}
      onRemove={onRemove}
      onToggle={onToggle}
    />
  ))
);

const TodoList = ({ todos, onUpdate, onRemove, onToggle }) => {
  return (
    <div>
      <ul>
        <TodoItems
          todos={todos}
          onUpdate={onUpdate}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      </ul>
    </div>
  );
};

export default TodoList;
