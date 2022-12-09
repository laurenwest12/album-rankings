const graphql = require('graphql');
const AlbumType = require('./AlbumType');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;
const { Album } = require('../../db/models/index');

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
    genres: { type: new GraphQLList(GraphQLString) },
    albums: {
      type: new GraphQLList(AlbumType),
      resolve: (parent) => {
        const albums = parent.albums.map((album) => {
          const { dataValues } = album;
          const { uid, spotifyId, name, month, year, genre, tracks, imageUrl } =
            dataValues;
          return {
            uid,
            spotifyId,
            name,
            month,
            year,
            genre,
            tracks,
            imageUrl,
          };
        });
        return albums;
      },
    },
  }),
});

module.exports = ArtistType;
