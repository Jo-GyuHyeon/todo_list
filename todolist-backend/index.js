import express from 'express';
import * as graphql from './bin/graphql';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV.trim() === 'development') {
  app.use(morgan('dev'));
  app.use('/playground', graphql.express_playground);
} else {
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
}
app.get('/health', function(req, res) {
  res.send('Hello World');
});
app.use('/graphql', graphql.graphql_server);

module.exports = app;
