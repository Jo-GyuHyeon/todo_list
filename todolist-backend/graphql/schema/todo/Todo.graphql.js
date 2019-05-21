export const Type = `
scalar Date

  type Todo {
    id: Int,
    pos: Float,
    title: String,
    content: String,
    due_date: Date,
    completed: Boolean,
    alarm: Boolean,
  }

  input new_todo {
    pos: Float!,
    title: String!,
    content: String!,
    due_date: Date,
  }

  input todo {
    id: Int!,
    pos: Float!,
    title: String!,
    content: String!,
    due_date: Date,
    completed: Boolean!
    alarm: Boolean!,
  }

  input Pageable{
    max_id: Int, 
    limit: Int
  }

  extend type Query {
    todos(input: Pageable): [Todo]
  }

  extend type Mutation {
    addTodo(input: new_todo): Todo
    updateTodo(input: todo): Todo
    bulkUpdateTodo(input: [todo]): [Todo]
    removeTodo(id: Int!): Int
  }

`;
