//Import the required libraries
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

//Import the defined schema
const schema = require('./schemas/index');

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

// Start the
app.listen(3000, async () => {
  console.log('Serving is running...');
});
