const graphql = require('graphql');
const { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    uid: { type: GraphQLString },
    spotifyId: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

module.exports = UserType;
