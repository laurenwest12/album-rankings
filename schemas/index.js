const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} = graphql;

const { Album, Artist, Review, User } = require('../db/models/index');
const { AlbumType, ArtistType, ReviewType, UserType } = require('./types');

const Sequelize = require('sequelize');
const { calculateTotalReview } = require('../functions/calculateTotalReview');
const Op = Sequelize.Op;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryTable',
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { uid: { type: GraphQLString } },
      resolve(parent, args) {
        let parameters = {
          where: {},
        };

        if (args.uid) {
          parameters['where']['uid'] = args.uid;
        }

        return User.findAll(parameters).then((data) => {
          return data.map((user) => {
            return user.dataValues;
          });
        });
      },
    },
    getAllArtists: {
      type: new GraphQLList(ArtistType),
      args: {
        names: { type: new GraphQLList(GraphQLString) },
        albums: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        let parameters = {
          where: {},
          include: [Album],
        };

        if (args.names) {
          parameters['where']['spreadsheetName'] = {
            [Op.in]: args.names,
          };
        }

        if (args.albums) {
          parameters['include'] = {
            model: Album,
            where: {
              spreadsheetName: {
                [Op.in]: args.albums,
              },
            },
          };
        }

        return Artist.findAll(parameters).then((data) => {
          return data.map((artist) => {
            return artist.dataValues;
          });
        });
      },
    },
    getAllAlbums: {
      type: new GraphQLList(AlbumType),
      args: {
        names: { type: new GraphQLList(GraphQLString) },
        artists: { type: new GraphQLList(GraphQLString) },
        genres: { type: new GraphQLList(GraphQLString) },
        years: { type: new GraphQLList(GraphQLString) },
        users: { type: new GraphQLList(GraphQLString) },
        minRating: { type: GraphQLFloat },
        maxRating: { type: GraphQLFloat },
      },
      resolve(parent, args) {
        let parameters = {
          where: {},
          include: [Artist, Review],
        };

        if (args.names) {
          parameters['where']['spreadsheetName'] = {
            [Op.in]: args.names,
          };
        }

        if (args.artists) {
          parameters['include'].push({
            model: Artist,
            where: {
              spreadsheetName: {
                [Op.in]: args.artists,
              },
            },
          });
        }

        if (args.users) {
          parameters['include'].push({
            model: Review,
            where: {
              userUid: {
                [Op.in]: args.users,
              },
            },
          });
        }

        if (args.genres) {
          parameters['where']['genre'] = {
            [Op.in]: args.genres,
          };
        }

        if (args.years) {
          parameters['where']['year'] = {
            [Op.in]: args.years,
          };
        }

        return Album.findAll(parameters).then((data) => {
          if (args.minRating && args.maxRating) {
            const filteredAlbums = data.filter((album) => {
              const totalReview = calculateTotalReview(
                album.dataValues.reviews,
                album.dataValues.uid,
                album.dataValues.artistUid
              );

              if (
                totalReview.rating <= args.maxRating &&
                totalReview.rating >= args.minRating
              ) {
                return album;
              }
            });
            return filteredAlbums;
          } else if (args.minRating) {
            const filteredAlbums = data.filter((album) => {
              const totalReview = calculateTotalReview(
                album.dataValues.reviews,
                album.dataValues.uid,
                album.dataValues.artistUid
              );

              if (totalReview.rating >= args.minRating) {
                return album;
              }
            });
            return filteredAlbums;
          } else if (args.maxRating) {
            const filteredAlbums = data.filter((album) => {
              const totalReview = calculateTotalReview(
                album.dataValues.reviews,
                album.dataValues.uid,
                album.dataValues.artistUid
              );

              if (totalReview.rating <= args.maxRating) {
                return album;
              }
            });
            return filteredAlbums;
          } else {
            return data.map((album) => {
              return album.dataValues;
            });
          }
        });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          name: args.name,
        });
        return args;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
