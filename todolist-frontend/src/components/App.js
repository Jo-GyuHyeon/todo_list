import React from 'react';
import TodoListContainer from 'containers/TodoListContainer';
import AddTodoContainer from 'containers/AddTodoContainer';
import PageTemplate from './PageTemplate/PageTemplate';
import Wrapper from './PageTemplate/Wrapper/Wrapper';

function App() {
  return (
    <PageTemplate>
      <Wrapper>
        <AddTodoContainer />
      </Wrapper>
      <Wrapper wrapStyle={'list'}>
        <TodoListContainer />
      </Wrapper>
    </PageTemplate>
  );
}

export default App;
