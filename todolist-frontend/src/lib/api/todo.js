import { SERVER_URL } from './config';
const URL = `${SERVER_URL}/graphql`;

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
          alarm
        }
      }`
    })
  });
  const data = await res.json();
  return data;
};

export const addTodo = async todo => {
  const replacedContent = todo.content.replace(/(\r\n|\n|\r)/gm, '\\n');
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
            title: "${todo.title}", 
            content: "${replacedContent}" ,
            due_date: "${todo.due_date}",
          }
        ) {
          id
          pos
          title
          content
          due_date
          completed
          alarm
        }
      }
      `
    })
  });
  const data = await res.json();
  return data;
};

export const updateTodo = async todo => {
  const replacedContent = todo.content.replace(/(\r\n|\n|\r)/gm, '\\n');
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
            content: "${replacedContent}", 
            due_date: "${todo.due_date}",
            completed: ${todo.completed},
            alarm: ${todo.alarm}
          }
        ) {
          id
          pos
          title
          content
          due_date
          completed
          alarm
        }
      }
      `
    })
  });
  const data = await res.json();
  return data;
};

export const bulkUpdateTodo = async todos => {
  const to_update_todos = todos.map(todo => {
    const replace_content = todo.content.replace(/(\r\n|\n|\r)/gm, '\\n');
    return { ...todo, content: replace_content };
  });

  const input = JSON.stringify(to_update_todos)
    .replace(/"([^(")"]+)":/g, '$1:')
    .replace(/\\\\n/gm, '\\n');

  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation {
        bulkUpdateTodo(
          input: ${input}
        ) {
          id
          pos
          title
          content
          due_date
          completed
          alarm
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
