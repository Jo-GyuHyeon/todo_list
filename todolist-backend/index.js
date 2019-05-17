import express from 'express';
import * as graphql from './bin/graphql';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';

const app = express();

app.use(express.json());

if (process.env.NODE_ENV.trim() === 'development') {
  app.use(morgan('dev'));
  app.use('/playground', graphql.express_playground);
} else {
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
}

app.use('/graphql', graphql.graphql_server);

module.exports = app;
