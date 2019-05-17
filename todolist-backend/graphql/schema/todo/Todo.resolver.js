import * as ctrl from './Todo.ctrl';

export const Resolvers = {
  Query: {
    todos: ctrl.getTodos
  },
  Mutation: {
    addTodo: ctrl.addTodo,
    updateTodo: ctrl.updateTodo,
    removeTodo: ctrl.removeTodo
  }
};
