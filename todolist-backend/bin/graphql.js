import expressPlayground from 'graphql-playground-middleware-express';
import graphqlHTTP from 'express-graphql';
import schema from '../graphql/schema';
import db from '../models';

export const graphql_server = graphqlHTTP(req => ({
  schema: schema,
  context: {
    db,
    body: req.body
  },
  graphiql: process.env.NODE_ENV.trim() === 'development'
}));

export const express_playground = expressPlayground({
  endpoint: '/graphql'
});
