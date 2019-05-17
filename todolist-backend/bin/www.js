import app from '../index';
import syncDb from './sync-db';

syncDb().then(_ => {
  const port = process.env.PORT;
  console.log('Sync databases!');

  app.listen(port, () =>
    console.log(`Now browse to http://localhost:${port}/graphql`)
  );
});
