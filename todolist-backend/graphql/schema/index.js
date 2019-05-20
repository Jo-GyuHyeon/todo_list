import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash.merge';

import { Type as Todo, Resolvers as todoResolvers } from './todo';

const Query = `
  type Query {
    hello: String,
  }
`;

const Mutation = `
  type Mutation  {
    hello: String,
  }
`;

const resolvers = {
  Query: {
    hello: (root, args, context, info) => 'Hello GraphQL Query (read)'
  },
  Mutation: {
    hello: (root, args, context, info) =>
      'Hello GraphQL Mutation (add, delete, update)! '
  }
};

const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, Todo],
  resolvers: merge(resolvers, todoResolvers)
});

module.exports = schema;
