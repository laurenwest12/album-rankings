//Import the required libraries
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

// const { users } = require('./config/config');

//Import the defined schema
const schema = require('./schemas/index');

const { getRows } = require('./sheet/rows');

//Initialzie the express server and configure it to use GraphQL
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Start the server
app.listen(3000, async () => {
  console.log('Serving is running...');
  await getRows();
});
