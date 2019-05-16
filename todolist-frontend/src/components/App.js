import React from 'react';
import TodoListContainer from 'containers/TodoListContainer';
import AddTodoContainer from 'containers/AddTodoContainer';
import Footer from './PageTemplate/Footer';
import ExpiredModalContainer from '../containers/ExpiredModalContainer';

function App() {
  return (
    <div>
      TodoList
      <AddTodoContainer />
      <TodoListContainer />
      <ExpiredModalContainer />
      <Footer />
    </div>
  );
}

export default App;
