const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

const { Album, Artist, Review, User } = require('../db/models/index');
const { AlbumType, ArtistType, ReviewType, UserType } = require('./types');

const Sequelize = require('sequelize');
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
            console.log(user.dataValues);
            return user.dataValues;
          });
        });
      },
    },
    getAllArtists: {
      type: new GraphQLList(ArtistType),
      args: {
        name: { type: new GraphQLList(GraphQLString) },
        albums: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        let parameters = {
          where: {},
          include: [Album],
        };

        if (args.name) {
          parameters['where']['spreadsheetName'] = {
            [Op.in]: args.name,
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
      args: { name: { type: new GraphQLList(GraphQLString) } },
      resolve(parent, args) {
        let parameters = {
          where: {},
          include: Artist,
        };

        if (args.name) {
          parameters['where']['spreadsheetName'] = {
            [Op.in]: args.name,
          };
        }

        return Album.findAll(parameters).then((data) => {
          return data.map((album) => {
            return album.dataValues;
          });
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
