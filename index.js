require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schemas/index');

app.use(cors());
app.use(express.json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3000, async () => {
  console.log('Serving is running...');
});
