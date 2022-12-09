const graphql = require('graphql');
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
    artist: {
      type: ArtistType,
      resolve: (parent) => {
        const artist = parent.artist.dataValues;
        const {
          uid,
          spotifyId,
          name,
          spreadsheetName,
          imageUrl,
          popularity,
          followers,
          genres,
        } = artist;
        return {
          uid,
          spotifyId,
          name,
          spreadsheetName,
          imageUrl,
          popularity,
          followers,
          genres,
        };
      },
    },
  }),
});

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

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    uid: { type: GraphQLString },
    spotifyId: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

module.exports = {
  AlbumType,
  ArtistType,
  ReviewType,
  UserType,
};
