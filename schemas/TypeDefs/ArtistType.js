const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  fields: () => ({
    uid: { type: GraphQLString },
    spotifyId: { type: GraphQLString },
    name: { type: GraphQLString },
    spreadsheetName: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    popularity: { type: GraphQLInt },
    followers: { type: GraphQLInt },
    month: { type: GraphQLString },
    year: { type: GraphQLString },
    genre: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = ArtistType;
