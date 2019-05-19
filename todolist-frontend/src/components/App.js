import React from 'react';
import TodoListContainer from 'containers/TodoListContainer';
import AddTodoContainer from 'containers/AddTodoContainer';
import PageTemplate from './PageTemplate/PageTemplate';

function App() {
  return (
    <PageTemplate>
      <AddTodoContainer />
      <TodoListContainer />
    </PageTemplate>
  );
}

export default App;
