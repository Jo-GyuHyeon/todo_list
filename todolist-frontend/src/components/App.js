import React from 'react';
import TodoListContainer from 'containers/TodoListContainer';
import AddTodoContainer from 'containers/AddTodoContainer';
import Footer from './PageTemplate/Footer';

function App() {
  return (
    <div>
      TodoList
      <AddTodoContainer />
      <TodoListContainer />
      <Footer />
    </div>
  );
}

export default App;
