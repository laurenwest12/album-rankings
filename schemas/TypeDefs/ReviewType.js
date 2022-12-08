const graphql = require('graphql');
const { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLList } = graphql;

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    uid: { type: GraphQLString },
    spreadsheetAlbum: { type: GraphQLString },
    spreadsheetArtist: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    favoriteSong: { type: GraphQLString },
  }),
});

module.exports = ReviewType;
