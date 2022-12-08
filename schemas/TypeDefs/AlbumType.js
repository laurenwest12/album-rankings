const graphql = require('graphql');
const ArtistType = require('./ArtistType');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;

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
