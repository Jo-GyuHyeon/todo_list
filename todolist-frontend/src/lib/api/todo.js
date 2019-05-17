const URL = 'graphql';

export const todos = async ({ max_id, limit = 30 }) => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `{
        todos(input: { max_id: ${max_id}, limit: ${limit} }) {
          id
          pos
          title
          content
          due_date
          completed
        }
      }`
    })
  });
  const data = await res.json();
  return data;
};

export const addTodo = async todo => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation {
        addTodo(
          input: { 
            pos: ${todo.pos}, 
            title: " ${todo.title}", 
            content: " ${todo.content}" 
          }
        ) {
          id
          pos
          title
          content
          due_date
          completed
        }
      }
      `
    })
  });
  const data = await res.json();
  return data;
};

export const updateTodo = async todo => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation {
        updateTodo(
          input: { 
            id: ${todo.id}, 
            pos: ${todo.pos}, 
            title: "${todo.title}", 
            content: "${todo.content}", 
            completed: ${todo.completed} 
          }
        ) {
          id
          pos
          title
          content
          due_date
          completed
        }
      }
      `
    })
  });
  const data = await res.json();
  return data;
};

export const removeTodo = async ({ id }) => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation {
        removeTodo(id: ${id})
      }
      `
    })
  });
  const data = await res.json();
  return data;
};
