const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  fields: () => ({
    uid: { type: GraphQLString },
    spotifyId: { type: GraphQLString },
    name: { type: GraphQLString },
    spreadsheetName: { type: GraphQLString },
    month: { type: GraphQLString },
    year: { type: GraphQLString },
    genre: { type: GraphQLString },
    tracks: { type: GraphQLInt },
    imageUrl: { type: GraphQLString },
  }),
});

module.exports = AlbumType;